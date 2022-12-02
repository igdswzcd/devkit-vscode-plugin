import * as vscode from 'vscode';
import * as constant from './constant';
import { COLOR_THEME } from './constant';
import { I18nService } from './I18nService';
import { ErrorHelper } from './error-helper';
import { ToolPanelManager } from './panel-manager';
import axios, { AxiosRequestConfig } from 'axios';
import { iframeHtmlStr } from './template';
import { ProxyManager } from './proxy-manager';
import Download from './download';
import { getPwd, saveData } from '.';
import { resolve } from 'path';
const os = require('os');
const fs = require('fs');
const path = require('path');
const i18n = I18nService.I18n();

interface HtmlDatas {
  ideAddress: string;
  serverAddr: string;
  serverPort: string;
  defaultPort: number;
  ideType: string;
  pageLoadingText: string;
  token?: string;
  username?: string;
  role?: string;
  id?: number;
  theme: string;
}

export class Utils {
  private static axiosInstance = axios.create({
    timeout: 10 * 1000,
  });
  /**
   * 初始化插件上下文
   * @param context 插件上下文
   * @param isInitDefaultPort 是否需要初始化端口
   */
  public static initVscodeCache(
    context: vscode.ExtensionContext,
    isInitDefaultPort: boolean = false
  ) {
    context.globalState.update('tuningIp', null);
    context.globalState.update('tuningPort', null);
    context.globalState.update('tuningToken', null);
    context.globalState.update('tuningSession', null);
    context.globalState.update('autoSystemFlag', null);
    context.globalState.update('closeShowErrorMessage', false);
    if (isInitDefaultPort) {
      context.globalState.update('defaultPort', 3661);
    }
    const json = Utils.getConfigJson(context);
    if (json.tuningConfig.length > 0) {
      context.globalState.update('tuningIp', json.tuningConfig[0].ip);
      context.globalState.update('tuningPort', json.tuningConfig[0].port);
    }
    if (os.type() === 'Windows_NT') {
      context.globalState.update('autoSystemFlag', true);
    }
    // saveData('tunadmin', 'admin100', '10.208.211.194');
  }
  /**
   * 获取配置信息
   * @param context 插件上下文
   */
  public static getConfigJson(context: vscode.ExtensionContext): any {
    const resourcePath = Utils.getExtensionFileAbsolutePath(
      context,
      'out/assets/config.json'
    );
    const data = fs.readFileSync(resourcePath);
    const buf = Buffer.from(JSON.parse(JSON.stringify(data)));
    return JSON.parse(buf.toString());
  }
  /**
   * 获取URL配置信息
   * @param context 插件上下文
   */
  public static getURLConfigJson(context: vscode.ExtensionContext): any {
    const resourcePath = Utils.getExtensionFileAbsolutePath(
      context,
      'out/assets/urlConfig.json'
    );
    const data = fs.readFileSync(resourcePath);
    const buf = Buffer.from(JSON.parse(JSON.stringify(data)));
    return JSON.parse(buf.toString());
  }

  public static checkVersion(
    context: vscode.ExtensionContext,
    serverVersion: any
  ) {
    if (!serverVersion) {
      return false;
    }
    const configVersion = Utils.getConfigJson(context).configVersion;
    return configVersion.includes(serverVersion);
  }

  /**
   * 获取某个扩展文件绝对路径
   * @param context 上下文
   * @param relativePath 扩展中某个文件相对于根目录的路径，如 images/test.jpg
   */
  public static getExtensionFileAbsolutePath(
    context: vscode.ExtensionContext,
    relativePath: string
  ) {
    return path.join(context.extensionPath, relativePath);
  }

  /**
   * 生成发送给webview的消息
   * @param cmd 发送给webview的消息命令字
   * @param data 消息内容
   */
  static generateMessage(cmd: string, data: any): any {
    const cbid =
      new Date().getTime() * 10000 + require('crypto').randomBytes(1)[0];
    const message = {
      cmd,
      data,
      cbid,
    };
    return message;
  }

  /**
   * 从某个HTML文件读取能被Webview加载的HTML内容
   * @param context 上下文
   * @param templatePath 相对于插件根目录的html文件相对路径
   */
  public static getWebViewContent(
    context: vscode.ExtensionContext,
    templatePath: string
  ) {
    const resourcePath = this.getExtensionFileAbsolutePath(
      context,
      templatePath
    );
    const dirPath = path.dirname(resourcePath);
    let html = fs.readFileSync(resourcePath, 'utf-8');
    // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
    html = html.replace(
      /(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g,
      (m: any, $1: any, $2: any) => {
        return (
          $1 +
          vscode.Uri.file(path.resolve(dirPath, $2))
            .with({ scheme: 'vscode-resource' })
            .toString() +
          '"'
        );
      }
    );
    return html;
  }

  /**
   * 将资源文件转换为vscode专用路径
   *
   * @param context 插件上下文
   * @param templatePath 临时路径
   */
  public static initPage(
    context: vscode.ExtensionContext,
    webview: vscode.Webview,
    templatePath: string
  ) {
    const resourcePath = this.getExtensionFileAbsolutePath(
      context,
      templatePath
    );
    const dirPath = path.dirname(resourcePath);
    try {
      fs.readdirSync(dirPath).forEach((file: any) => {
        // 拼接获取绝对路径
        const fPath = path.join(dirPath, file);
        if (
          file.search(/main/) !== -1 &&
          file.search(/.map/) === -1 &&
          file.search(/_bak/) === -1
        ) {
          if (fs.existsSync(fPath + '_bak')) {
            let js = fs.readFileSync(fPath + '_bak', 'utf-8');
            js = js.replace(
              /\.\/assets\S+?\.(png|jpg|svg|gif|js)/g,
              (m: any) => {
                return webview
                  .asWebviewUri(vscode.Uri.file(path.resolve(dirPath, m)))
                  .toString();
              }
            );
            fs.writeFileSync(fPath, js);
          } else {
            let js = fs.readFileSync(fPath, 'utf-8');
            fs.writeFileSync(fPath + '_bak', js);
            js = js.replace(
              /\.\/assets\S+?\.(png|jpg|svg|gif|js)/g,
              (m: any) => {
                return webview
                  .asWebviewUri(vscode.Uri.file(path.resolve(dirPath, m)))
                  .toString();
              }
            );
            fs.writeFileSync(fPath, js);
          }
        }
      });
    } catch (error) {}
  }

  /**
   * 执行回调函数
   * @param panel 左侧菜单面板
   * @param message 消息
   * @param resp 响应
   */
  public static invokeCallback(panel: any, message: any, resp: any) {
    if (panel) {
      panel.webview.postMessage({
        cmd: message.cmd,
        data: resp,
        cbid: message.cbid,
      });
    }
  }

  /**
   * 调用接口获取数据,并更新token
   * @param context 插件上下文
   * @param option 请求信息
   * @param module    模块 ex: 'sysPerf','javaPerf'
   */
  public static async requestData(
    context: vscode.ExtensionContext,
    option: any,
    module: string
  ) {
    // 设置请求头
    const headers = {
      'content-type': 'application/json',
      'Accept-Language': I18nService.getLang().language,
      connection: 'keep-alive',
    };
    const req: AxiosRequestConfig = {
      headers,
      method: 'GET',
    };
    req.url = option.url;
    if (option.token) {
      if (req.headers) {
        req.headers.Authorization = option.token;
      }
    }
    // 调用接口逻辑
    return new Promise((resolve, reject) => {
      const resp = { status: constant.HTTP_STATUS.HTTP_200_OK, data: {} };
      this.axiosInstance
        .request(req)
        .then((response: any) => {
          resp.data = response.data;
          resolve(resp);
        })
        .catch((error: any) => {
          const respStatus = ((error || {}).response || {}).status;
          if (
            error?.response?.data &&
            error?.response?.data instanceof Buffer
          ) {
            const errorRespDataStr = Buffer.from(
              error?.response?.data
            ).toString();
            try {
              const errorRespData = JSON.parse(errorRespDataStr || '{}');
              error.response.data = errorRespData;
            } catch (err) {
              error.response.data = errorRespDataStr;
            }
          }
          //  证书验证失败，请重新选择
          if (
            error.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' &&
            resp.status === constant.HTTP_STATUS.HTTP_200_OK
          ) {
            vscode.window.showErrorMessage(
              i18n.plugins_common_certificate_verification_failed
            );
            resp.status = constant.HTTP_STATUS.HTTP_404_NOTFOUND;
            if (respStatus === constant.HTTP_STATUS.HTTP_502_SERVERERROR) {
              resp.status = constant.HTTP_STATUS.HTTP_502_SERVERERROR;
            }
            resp.data = error;
            return resolve(resp);
          }
          if (
            !respStatus ||
            respStatus === constant.HTTP_STATUS.HTTP_404_NOTFOUND ||
            error.code === 'ECONNREFUSED' ||
            error.code === 'ETIMEDOUT' ||
            error.code === 'ECONNABORTED'
          ) {
            resp.status = constant.HTTP_STATUS.HTTP_404_NOTFOUND;
            resp.data = error;
            // 清除当前会话信息，显示登录操作和错误提示信息
            ErrorHelper.errorHandler(
              context,
              module,
              error?.response?.statusText
            );
            return resolve(resp);
          }
          resolve(resp);
        });
    });
  }

  /**
   * 跳转打开登录页面
   * @param global 上下文
   * @param defaultPort 代理服务的端口
   * @param proxy 代理后的对象
   */
  static async codeServerAutoLogin(params: any, url: string, pwd: any) {
    const headers = {
      'content-type': 'application/json',
      'Accept-Language': I18nService.getLang().language,
      connection: 'keep-alive',
    };
    const data = {
      username: params.username,
      password: pwd,
    };
    const req = {
      headers,
      data,
      method: 'POST',
      url,
    };
    return this.axiosInstance.request(req);
  }
  /**
   * 跳转打开登录页面
   * @param global 上下文
   * @param defaultPort 代理服务的端口
   * @param proxy 代理后的对象
   */
  static async navToIFrame(global: any, defaultPort: number, proxy: any) {
    const panel = vscode.window.createWebviewPanel(
      'login',
      i18n.common_login,
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      }
    );
    panel.webview.onDidReceiveMessage((message) => {
      const msg = {
        data: {
          url: `http://127.0.0.1:${defaultPort}/user-management/api/v2.2/certificates/download-ca/`,
          subModule: 'userManagement',
          token: ProxyManager.authValue,
        },
        module: 'tuning',
      };
      if (message.messageType === 'downloadFile') {
        Download.getData(global, msg, 'tuning');
      }
    });
    ToolPanelManager.loginPanels = [{ panel, proxy }];
    // 相应panel的关闭事件
    panel.onDidDispose(() => {
      ToolPanelManager.closeLoginPanel();
    }, null);
    // 装载页面
    new Promise<HtmlDatas>(() => {
      this.generateIframeMsgData(global, defaultPort, (datas) => {
        console.log(datas);
        panel.webview.html = this.getHtml(datas);
      });
    });
  }

  static async generateIframeMsgData(
    global: any,
    defaultPort: number,
    callback: (data: HtmlDatas) => void
  ) {
    let colorTheme = constant.COLOR_THEME.Dark;
    const colorThemeStr: any = vscode.workspace
      .getConfiguration()
      .get('workbench.colorTheme');
    if (colorThemeStr.indexOf('Light') !== -1) {
      colorTheme = constant.COLOR_THEME.Light;
    }
    let htmlDatas: HtmlDatas = {
      ideAddress: `http://127.0.0.1:${defaultPort}`,
      serverAddr: global.context.globalState.get('tuningIp'),
      serverPort: global.context.globalState.get('tuningPort'),
      defaultPort,
      ideType: 'isVscode',
      pageLoadingText: i18n.page_loading,
      theme: colorTheme,
    };
    if (vscode.env.appName === 'code-server' && vscode.env.uiKind === 2) {
      htmlDatas.ideAddress = `https://${htmlDatas.serverAddr}:${htmlDatas.serverPort}`;
      const codeServerCfg = this.getConfigJson(global.context).codeServerConfig;
      if (vscode.env.remoteName === codeServerCfg[0].remoteName) {
        new Promise<string>(() => {
          getPwd('tunadmin', '10.208.211.194', (pwd) => {
            console.log('pwd', pwd);
            const requestParams: any = codeServerCfg[1];
            const userSessionUrl = `http://127.0.0.1:${defaultPort}/user-management/api/v2.2/users/session/`;
            htmlDatas.ideAddress = `https://${codeServerCfg[0].remoteName}${codeServerCfg[0].loginPath}`;
            htmlDatas.ideType = 'isCodeServer';
            this.codeServerAutoLogin(requestParams, userSessionUrl, pwd)
              .then((response) => {
                htmlDatas = {
                  ...htmlDatas,
                  token: response.headers.token,
                  username: response.data.data.username,
                  id: response.data.data.id,
                  role: response.data.data.role,
                };
                console.log('token', htmlDatas.token);
                callback(htmlDatas);
              })
              .catch((err) => {
                console.log(err);
                callback(htmlDatas);
              });
          });
        });
      } else {
        callback(htmlDatas);
      }
    } else {
      callback(htmlDatas);
    }
  }
  /**
   * 判断生成指纹的是否在配置文件中
   *
   * @param context 上下文
   */
  public static async fingerCheck(
    global: any,
    tempip: any,
    hashedKey: any,
    figer: any
  ) {
    let figerexist: any;
    // 查询配置文件中是否有指纹匹配当前连接服务器的指纹
    for (const element of figer) {
      if (element.localfiger === hashedKey) {
        figerexist = true;
      }
    }
    // 指纹不存在前端提示添加该指纹到配置文件中
    const message = I18nService.I18nReplace(
      i18n.plugins_common_message_figerLose,
      {
        0: tempip,
        1: hashedKey,
      }
    );
    if (figerexist === undefined) {
      await vscode.window
        .showInformationMessage(
          message,
          i18n.pligins_common_message_confirm,
          i18n.pligins_common_message_cancel
        )
        .then((select) => {
          if (select === i18n.pligins_common_message_confirm) {
            const data = this.getConfigJson(global.context);
            data.hostVerifier.push({ ip: tempip, localfiger: hashedKey });
            const configPath = 'out/assets/config.json';
            const resourcePath = Utils.getExtensionFileAbsolutePath(
              global.context,
              configPath
            );
            fs.writeFileSync(resourcePath, JSON.stringify(data));
            figerexist = true;
          } else {
            figerexist = false;
          }
        });
    }
    return figerexist;
  }
  /**
   * 判断配置文件中的指纹存储是否大于100
   *
   * @param context 上下文
   */
  public static fingerLengthCheck(global: any) {
    const finger = Utils.getConfigJson(global.context).hostVerifier;
    if (finger.length > 100) {
      vscode.window.showWarningMessage(i18n.plugins_common_message_figerWarn);
    }
  }

  /**
   * 弹出错误信息：根据后端接口返回信息支持多语言
   * @param messageType 多语言信息
   * @param data 多语言信息
   * @param directDisplay 是否直接显示data.info，否则会取i18n[data.infoKey]
   */
  public static showMessageByType(
    messageType: string,
    data: any,
    directDisplay: boolean
  ) {
    switch (messageType) {
      case 'info':
        Utils.showInfoByLangType(data, directDisplay);
        break;
      case 'warn':
        Utils.showWarningByLangType(data, directDisplay);
        break;
      case 'error':
        Utils.showErrorInfoByLangType(data, directDisplay);
        break;
      default:
        break;
    }
  }
  /**
   * 弹出提示信息：根据后端接口返回信息支持多语言
   * @param data 多语言信息
   * @param directDisplay 是否直接显示data.info，否则会取i18n[data.infoKey]
   */
  private static showInfoByLangType(data: any, directDisplay: boolean) {
    if (directDisplay) {
      Utils.showInfo(data.info);
    } else {
      Utils.showInfo(i18n[data.infoKey]);
    }
  }
  /**
   * 弹出告警信息：根据后端接口返回信息支持多语言
   * @param data 多语言信息
   * @param directDisplay 是否直接显示data.info，否则会取i18n[data.infoKey]
   */
  private static showWarningByLangType(data: any, directDisplay: boolean) {
    if (directDisplay) {
      Utils.showWarning(data.info);
    } else {
      Utils.showWarning(i18n[data.infoKey]);
    }
  }
  /**
   * 弹出错误信息：根据后端接口返回信息支持多语言
   * @param data 多语言信息
   * @param directDisplay 是否直接显示data.info，否则会取i18n[data.infoKey]
   */
  private static showErrorInfoByLangType(data: any, directDisplay: boolean) {
    const language: any = vscode.env.language;
    if (directDisplay) {
      Utils.showError(data.info);
    } else {
      Utils.showError(i18n[data.infoKey]);
    }
  }

  /**
   * 弹出提示信息
   */
  private static showInfo(info: any) {
    vscode.window.showInformationMessage(info);
  }
  /**
   * 弹出告警信息
   */
  private static showWarning(info: any) {
    vscode.window.showWarningMessage(info);
  }
  /**
   * 弹出错误信息
   */
  private static showError(info: any) {
    vscode.window.showErrorMessage(info);
  }

  /**
   * 格式化时间
   *
   * @param datetime 时间
   * @param formatter 格式化字符串
   */
  public static formatDatetime(datetime: Date | string, formatter: string) {
    if (typeof datetime === 'string') {
      datetime = new Date(datetime);
    }
    formatter = formatter.replace(/yyyy/gi, datetime.getFullYear().toString());
    formatter = formatter.replace(
      /yy/gi,
      datetime.getFullYear().toString().substring(2)
    );
    formatter = formatter.replace(
      /MM/g,
      (datetime.getMonth() + 1).toString().padStart(2, '0')
    );
    formatter = formatter.replace(/M/g, (datetime.getMonth() + 1).toString());
    formatter = formatter.replace(
      /dd/gi,
      datetime.getDate().toString().padStart(2, '0')
    );
    formatter = formatter.replace(/d/gi, datetime.getDate().toString());

    formatter = formatter.replace(
      /hh/gi,
      datetime.getHours().toString().padStart(2, '0')
    );
    formatter = formatter.replace(/h/gi, datetime.getHours().toString());
    formatter = formatter.replace(
      /mm/g,
      datetime.getMinutes().toString().padStart(2, '0')
    );
    formatter = formatter.replace(/m/g, datetime.getMinutes().toString());
    formatter = formatter.replace(
      /ss/g,
      datetime.getSeconds().toString().padStart(2, '0')
    );
    formatter = formatter.replace(/s/g, datetime.getSeconds().toString());
    formatter = formatter.replace(
      /SSS/g,
      datetime.getMilliseconds().toString()
    );
    return formatter;
  }

  /**
   * 设置项打开建议反馈外链
   * @param context 插件上下文
   * @param module 模块标识
   */
  public static openAdviceLink(
    context: vscode.ExtensionContext,
    module: string
  ) {
    const pluginUrlCfg = Utils.getURLConfigJson(context);
    const faq = vscode.Uri.parse(pluginUrlCfg.hikunpengUrl);
    vscode.commands.executeCommand('vscode.open', faq);
  }

  /**
   * 注册VSCode插件事件侦听--配置修改
   *
   * @param context 上下文
   */
  public static addConfigListening() {
    vscode.workspace.onDidChangeConfiguration(() => {
      let colorTheme = constant.COLOR_THEME.Dark;
      const colorThemeStr: any = vscode.workspace
        .getConfiguration()
        .get('workbench.colorTheme');
      if (colorThemeStr.indexOf('Light') !== -1) {
        colorTheme = constant.COLOR_THEME.Light;
      }
      if (ToolPanelManager.loginPanels.length) {
        const changeThemeObj: any = {
          theme: colorTheme,
          messageType: 'changeTheme',
        };
        ToolPanelManager.loginPanels[0].panel.webview.postMessage(
          changeThemeObj
        );
      }
      Utils.postMsg2Webviews(colorTheme);
    });
  }
  private static postMsg2Webviews(colorTheme: COLOR_THEME) {
    ToolPanelManager.sysPerfToolPanels.forEach((panel) => {
      panel.getPanel().webview.postMessage({
        cmd: 'handleVscodeMsg',
        type: 'colorTheme',
        data: { colorTheme },
      });
    });
  }

  private static getHtml(data: any) {
    const { pageLoadingText, ideAddress } = data;
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style type="text/css">
                    html,body {margin: 0;padding: 0;width: 100%;height: 100%;}
                    #myFrame {opacity: 0;}
                    @-webkit-keyframes ball-spin-fade-loader {
                        50% {opacity: 0.3;-webkit-transform: scale(0.4);transform: scale(0.4);}
                        100% {opacity: 1;-webkit-transform: scale(1);transform: scale(1);}
                    }
                    @keyframes ball-spin-fade-loader {
                        50% {opacity: 0.3;-webkit-transform: scale(0.4);transform: scale(0.4);}
                        100% {opacity: 1;-webkit-transform: scale(1);transform: scale(1);}
                    }
                    .maskBox {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        background: var(--vscode-editor-background);
                    }
                    .maskBox  .circleBox {position: relative;width: 100px;height: 100px;}
                    .maskBox .circleItem {position: absolute;top: 37.5px;left: 37.5px;width: 25px;height: 25px;}
                    .maskBox .circleItem:nth-child(1) {transform: rotate(0deg) translate(37.5px);}
                    .maskBox .circleItem:nth-child(2) {transform: rotate(45deg) translate(37.5px);}
                    .maskBox .circleItem:nth-child(3) {transform: rotate(90deg) translate(37.5px);}
                    .maskBox .circleItem:nth-child(4) {transform: rotate(135deg) translate(37.5px);}
                    .maskBox .circleItem:nth-child(5) {transform: rotate(180deg) translate(37.5px);}
                    .maskBox .circleItem:nth-child(6) {transform: rotate(225deg) translate(37.5px);}
                    .maskBox .circleItem:nth-child(7) {transform: rotate(270deg) translate(37.5px);}
                    .maskBox .circleItem:nth-child(8) {transform: rotate(315deg) translate(37.5px);}
                    .maskBox .circle {
                        width: 100%;
                        height: 100%;
                        animation-fill-mode: both;
                        background-color: #0067ff;
                        border-radius: 50%;
                        -webkit-animation: ball-spin-fade-loader 1s -1s infinite linear;
                        animation: ball-spin-fade-loader 1s -1s infinite linear;
                    }
                    .maskBox .circle1 {animation-delay: -1s;-webkit-animation-delay: -1s;}
                    .maskBox .circle2 {animation-delay: -0.875s;-webkit-animation-delay: -0.875s;}
                    .maskBox .circle3 {animation-delay: -0.75s;-webkit-animation-delay: -0.75s;}
                    .maskBox .circle4 {animation-delay: -0.625s;-webkit-animation-delay: -0.625s;}
                    .maskBox .circle5 {animation-delay: -0.5s;-webkit-animation-delay: -0.5s;}
                    .maskBox .circle6 {animation-delay: -0.375s;-webkit-animation-delay: -0.375s;}
                    .maskBox .circle7 {animation-delay: -0.25s;-webkit-animation-delay: -0.25s;}
                    .maskBox .circle8 {animation-delay: -0.125s;-webkit-animation-delay: -0.125s;}
                    .maskBox .text { margin-top: 20px;font-size: 15px;color: #999;letter-spacing: 2px;}
                </style>
            </head>
            <body>
                <div class="maskBox" id="maskBox">
                    <div class="circleBox">
                        <div class="circleItem">
                            <div class="circle circle1"></div>
                        </div>
                        <div class="circleItem">
                            <div class="circle circle2"></div>
                        </div>
                        <div class="circleItem">
                            <div class="circle circle3"></div>
                        </div>
                        <div class="circleItem">
                            <div class="circle circle4"></div>
                        </div>
                        <div class="circleItem">
                            <div class="circle circle5"></div>
                        </div>
                        <div class="circleItem">
                            <div class="circle circle6"></div>
                        </div>
                        <div class="circleItem">
                            <div class="circle circle7"></div>
                        </div>
                        <div class="circleItem">
                            <div class="circle circle8"></div>
                        </div>
                    </div>
                    <div class="text">${pageLoadingText}</div>
                </div>
                <iframe id="myFrame" style="width:100vw;height:100vh;" onload="loadFinish()" frameborder="no" border="0"
                src="${ideAddress}">
                </iframe>
                <script>
                let time
                let myFrame = document.getElementById('myFrame');
                let vscode = acquireVsCodeApi()
                window.addEventListener('message', (e) => {
                    vscode.postMessage(e.data)
                    if(e.data.messageType) {
                        let type = e.data.messageType;
                        if (type === 'openUrl') {
                            let a = document.createElement('a');
                            a.setAttribute('href', e.data.ideUrl);
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                        } else if (type === 'receivedSuccess') {
                            clearInterval(time)
                        } else if (type === 'login') {
                            myFrame.contentWindow.postMessage('${JSON.stringify(
                              data
                            )}', '${ideAddress}');
                        } else if (type === 'complete'){
                            ;
                        }
                        else if (type === 'changeTheme') {
                            myFrame.contentWindow.postMessage(JSON.stringify(e.data), '${ideAddress}');
                        }
                    }
                })
                function sendMsgToWeb() {
                    time = setInterval(() => {
                        myFrame.contentWindow.postMessage('${JSON.stringify(
                          data
                        )}', '${ideAddress}')
                    }, 500)
                }
                function loadFinish() {
                    let mask = document.getElementById('maskBox');
                    mask.style.display = 'none';
                    myFrame.style.opacity = 1;
                }
                sendMsgToWeb()
                </script>
            </body>
        </html>`;
  }
}
