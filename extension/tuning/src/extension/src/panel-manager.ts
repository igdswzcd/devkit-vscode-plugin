import * as vscode from 'vscode';
import * as constant from './constant';
import { Utils } from './utils';
import { I18nService } from './I18nService';
import { messageHandler } from './webview-msg-handler';

const i18n = I18nService.I18n();
class ToolPanel {
  private panelId: string;
  private panel: vscode.WebviewPanel;
  private disposables: vscode.Disposable[] = [];
  private module: string;
  // 是否需要接受通知消息，同步刷新页面数据
  private needAsycnUpdate = false;
  /**
   * 面板创建时间
   */
  private createTime: Date;

  constructor(
    panelOption: any,
    private disposeHandle: any,
    context: vscode.ExtensionContext
  ) {
    this.panelId = panelOption.panelId;
    this.module = panelOption.module;
    this.needAsycnUpdate = panelOption.needAsycnUpdate || false;
    this.createTime = panelOption.createTime || new Date();

    // 调用vscode 接口创建一个存放webview的panel
    const panel = vscode.window.createWebviewPanel(
      panelOption.viewType,
      panelOption.viewTitle,
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
      }
    );

    this.panel = panel;
    // 转换资源路径
    if (panel !== undefined) {
      Utils.initPage(context, panel.webview, 'out/sysperfanalysis/index.html');
    }
    // 设置panel中的webview的HTML,将需要跳转的信息写入Html中，解决vscode 发送消息有延迟导致的页面需要点击两次才能打开的问题，优化加载时间
    this.setWebViewHtml(context);
    const content =
      'self.navigatorPage = ' + JSON.stringify(panelOption.message);
    this.panel.webview.html = this.panel.webview.html.replace(
      'self.navigatorPage',
      content
    );

    // 相应panel的关闭事件
    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);

    // 侦听来自webview的消息
    const global = { context, toolPanel: this };
    this.panel.webview.onDidReceiveMessage(
      (message) => {
        if (messageHandler[message.cmd]) {
          messageHandler[message.cmd](global, message);
        }
      },
      undefined,
      this.disposables
    );

    // 侦听面板的状态改变事件
    this.panel.onDidChangeViewState((e) => {}, null, this.disposables);
  }

  /**
   * 设置perfadvisor的html
   *
   * @param context 插件上下文
   */
  private setWebViewHtml(context: vscode.ExtensionContext) {
    this.panel.webview.html = Utils.getWebViewContent(
      context,
      'out/sysperfanalysis/index.html'
    );
  }

  /**
   * 获取panelId
   */
  public getPanelId(): string {
    return this.panelId;
  }

  /**
   * 设置panelId
   * @param panelId panelId
   */
  public setPanelId(panelId: string) {
    this.panelId = panelId;
  }

  /**
   * 获取panel
   */
  public getPanel(): vscode.WebviewPanel {
    return this.panel;
  }

  /**
   * 获取模块标识
   * @param panelId panelId
   */
  public getModule() {
    return this.module;
  }

  /**
   * 获取接收通知标识
   */
  public getNeedAsycnUpdate() {
    return this.needAsycnUpdate;
  }

  /**
   * 获取面板创建时间
   */
  public getCreateTime() {
    return this.createTime;
  }

  /**
   * 关闭panel时的处理
   */
  public dispose() {
    this.disposeHandle(this);

    this.panel.dispose();

    // 首次登录异常操作校验
    // LoginManager.firstLoginNoModefyPasswd();

    while (this.disposables.length) {
      const disPanel = this.disposables.pop();
      if (disPanel) {
        disPanel.dispose();
      }
    }
  }
}
export class ToolPanelManager {
  // 存储sysPerf的面板
  public static sysPerfToolPanels: Array<ToolPanel> = [];
  public static loginPanels: Array<any> = [];

  /**
   * perfadvisor响应不同的命令来打开panel
   *
   * @param context 插件上下文
   */
  public static createOrShowPanelForPerfCommand(
    context: vscode.ExtensionContext
  ) {
    // 打开服务器配置panel
    context.subscriptions.push(
      vscode.commands.registerCommand(
        'extension.view.perfadvisorserverconfig',
        () => {
          const sysPerfSession = {
            language: vscode.env.language,
          };
          const message = Utils.generateMessage('navigate', {
            page: '/' + constant.NAVIGATE_PAGE.config,
            webSession: sysPerfSession,
          });
          const panelOption = {
            panelId: constant.PANEL_ID.tuningNonServerConfig,
            viewType: constant.VIEW_TYPE.serverConfig,
            viewTitle: i18n.plugins_common_configure_remoteServer,
            module: 'tuning',
            message,
          };
          ToolPanelManager.createOrShowPanel(panelOption, context);
        }
      )
    );

    // 打开免费试用远程服务器panel
    context.subscriptions.push(
      vscode.commands.registerCommand(
        'extension.view.perfadvfreetrialremoteenvironment',
        () => {
          const tuningPerfSession = {
            language: vscode.env.language,
          };
          const message = Utils.generateMessage('navigate', {
            page: '/' + constant.NAVIGATE_PAGE.freeTrialProcessEnvironment,
            webSession: tuningPerfSession,
          });
          const panelOption = {
            panelId: constant.PANEL_ID.tuningFreeTrialRemoteEnvironment,
            viewType: constant.VIEW_TYPE.freeTrialRemoteEnvironment,
            viewTitle: i18n.plugins_perfadvisor_free_trial_remote_environment,
            module: 'tuning',
            message,
          };
          ToolPanelManager.createOrShowPanel(panelOption, context);
        }
      )
    );

    // 打开登录panel
    context.subscriptions.push(
      vscode.commands.registerCommand('extension.view.perfadvisorlogin', () => {
        ToolPanelManager.openPerfLoginPanel(context, 'login');
      })
    );

    // 升级性能分析工具
    context.subscriptions.push(
      vscode.commands.registerCommand('extension.view.perfUpgrade', () => {
        const sysPerfSession = {
          language: vscode.env.language,
        };
        const message = Utils.generateMessage('navigate', {
          page: '/upgrade',
          webSession: sysPerfSession,
        });
        const panelOption = {
          panelId: constant.PANEL_ID.tuningUpgrade,
          viewType: constant.VIEW_TYPE.upgrade,
          viewTitle: i18n.plugins_common_upgrade_remoteServer,
          module: 'tuning',
          message,
        };
        ToolPanelManager.createOrShowPanel(panelOption, context);
      })
    );

    // 卸载性能分析工具
    context.subscriptions.push(
      vscode.commands.registerCommand('extension.view.perfUninstall', () => {
        const sysPerfSession = {
          language: vscode.env.language,
        };
        const message = Utils.generateMessage('navigate', {
          page: '/uninstall',
          webSession: sysPerfSession,
        });
        const panelOption = {
          panelId: constant.PANEL_ID.tuningUninstall,
          viewType: constant.VIEW_TYPE.uninstall,
          viewTitle: i18n.plugins_common_uninstall_remoteServer,
          module: 'tuning',
          message,
        };
        ToolPanelManager.createOrShowPanel(panelOption, context);
      })
    );
    // 建议反馈
    context.subscriptions.push(
      vscode.commands.registerCommand('extension.view.feedback', () => {
        Utils.openAdviceLink(context, 'tuning');
      })
    );
  }
  /**
   * 打开选择的webview
   * param panelOption webview信息
   * param context vscode上下文信息
   */
  public static createOrShowPanel(
    panelOption: any,
    context: vscode.ExtensionContext
  ) {
    for (const toolPanel of ToolPanelManager.sysPerfToolPanels) {
      if (toolPanel.getPanelId() === panelOption.panelId) {
        // 临时解决创建工程页面图片丢失的情况
        if (panelOption.panelId !== 'createProject') {
          toolPanel.getPanel().webview.postMessage(panelOption.message);
        }
        toolPanel.getPanel().reveal();
        return toolPanel;
      }
    }
    const newToolPanel: ToolPanel = new ToolPanel(
      panelOption,
      ToolPanelManager.closeToolPanel,
      context
    );
    const newPanelId = newToolPanel.getPanelId().split('-');

    // FIX alreadyExistPanelId 的为真判断会使有的窗口不能被重复打开，只用通过简单的过滤来
    if (
      !newPanelId.includes('tuninghelperInfoLog') &&
      !newPanelId.includes('TuninghelperProcessPidDetail') &&
      !newPanelId.some((item) => item.includes('TASKCONTRAST'))
    ) {
      const alreadyExistPanelId = ToolPanelManager.sysPerfToolPanels.find(
        (item) => {
          const oldPanelId = item.getPanelId();
          return newToolPanel.getPanelId() === oldPanelId;
        }
      );
      if (alreadyExistPanelId) {
        ToolPanelManager.closePanel(
          [alreadyExistPanelId.getPanelId()],
          'tuning'
        );
      }
    }
    ToolPanelManager.sysPerfToolPanels.push(newToolPanel);
    return newToolPanel;
  }

  /**
   * 打开perfadvisor登录页面
   *
   * @param context 插件上下文
   */
  public static openPerfLoginPanel(
    context: vscode.ExtensionContext,
    loginType: string
  ) {
    let sysPerfSession: any = context.globalState.get('tuningSession');

    // 如果是首次登录只需要将语言传递给webview
    if (null === sysPerfSession) {
      sysPerfSession = {
        language: vscode.env.language,
      };
    }

    const panelOption = {
      panelId: constant.PANEL_ID.tuningNonLogin,
      viewType: constant.VIEW_TYPE.login,
      viewTitle: i18n.perfadvisor_login,
      module: 'tuning',
    };
    const panel = new ToolPanel(
      panelOption,
      ToolPanelManager.closeToolPanel,
      context
    );
    ToolPanelManager.sysPerfToolPanels.push(panel);
    const global = { context, ToolPanel, panel };
    vscode.commands.executeCommand('setContext', 'webviewOpening', true);
    messageHandler.openLoginByButton(global);
  }
  /**
   * 关闭对应工具的panel
   *
   * @param panleIds 待关闭的panelid列表
   * @param module 工具
   */
  static closePanel(panleIds: string[], module: string) {
    const deletePanels: Array<ToolPanel> =
      ToolPanelManager.sysPerfToolPanels.filter(
        (item) => panleIds.indexOf(item.getPanelId()) !== -1
      );
    for (const delPanel of deletePanels) {
      delPanel.getPanel().dispose();
    }
  }
  /**
   * 关闭webview所在的panel
   * @param toolPanel panel
   */
  static closeToolPanel(toolPanel: ToolPanel): void {
    ToolPanelManager.sysPerfToolPanels =
      ToolPanelManager.sysPerfToolPanels.filter(
        (item) => item.getPanelId() !== toolPanel.getPanelId()
      );
  }

  /**
   * 关闭除remainPanelIds以外的panel
   *
   * @param module 模块
   * @param remainPanelIds 需要保留的panel的id,如传空则关闭所有的panel
   */
  static closePanelsByRemained(module: string, remainPanelIds: Array<string>) {
    const deletePanleIds: Array<string> = [];
    // 获取需要关闭的panelid列表
    ToolPanelManager.sysPerfToolPanels.forEach((element) => {
      if (
        null === remainPanelIds ||
        0 === remainPanelIds.length ||
        remainPanelIds.indexOf(element.getPanelId()) === -1
      ) {
        deletePanleIds.push(element.getPanelId());
      }
    });
    // 关闭panels
    if (deletePanleIds.length !== 0) {
      ToolPanelManager.closePanel(deletePanleIds, module);
    }
  }

  /**
   * 关闭登录的panel
   */
  static closeLoginPanel() {
    if (ToolPanelManager.loginPanels.length > 0) {
      const panelAndProxy = ToolPanelManager.loginPanels.pop();
      if (panelAndProxy.panel) {
        panelAndProxy.panel.dispose();
        panelAndProxy.proxy.close();
      }
      ToolPanelManager.loginPanels = [];
    }
  }
}
