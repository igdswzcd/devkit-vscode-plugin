import * as path from 'path';

const fs = require('fs');

import { delFolder, readFileData } from './util';

const ONE_ROOT_FILE = 'e96ee3778b64e3e4d27497d206821d08';
const TWO_ROOT_FILE = 'af723f561d1d7f1c1e2964cc4a0c3528';

/**
 * 判断是否存在用户目录
 * @param userPath
 * @param ipAndUsernameHash
 * @returns
 */
function hasUserFile(userPath: string, ipAndUsernameHash: string) {
  try {
    const realIpAndUsername = path.basename(fs.realpathSync.native(userPath));
    if (
      ipAndUsernameHash !== undefined &&
      realIpAndUsername === ipAndUsernameHash
    ) {
      return fs.readdirSync(`${userPath}`);
    }
    return false;
  } catch (error) {
    return false;
  }
}

/**
 * 判断用户路径 /.e 下文件数是否为3个 文件名是否正确
 * @param userPath
 * @returns
 */
function hasELength(userPath: string) {
  try {
    const data = fs.readdirSync(path.join(userPath, '.e'));
    // 如果文件数不是3个 说明已损坏
    if (data.length !== 3) {
      return 'err';
    }

    if (data[0] !== '.f' || data[1] !== '.p' || data[2] !== '.s') {
      return 'err';
    }
    return true;
  } catch (error) {
    return 'err';
  }
}

/**
 * 判断用户路径 /.f 下的文件数是否为1 文件名是否正确
 * @param userPath
 * @returns
 */
function hasFData(userPath: string) {
  try {
    const data = fs.readdirSync(path.join(userPath, '.e', '.f'));
    // 如果文件数不是1个 说明已修改
    if (data.length !== 1) {
      return 'err';
    }
    // 判断文件名是否正确
    if (data[0] !== ONE_ROOT_FILE) {
      return 'err';
    }
    return true;
  } catch (error) {
    return 'err';
  }
}

function hasSData(userPath: string) {
  try {
    const data = fs.readdirSync(path.join(userPath, '.e', '.s'));
    if (data.length !== 1) {
      return 'err';
    }
    if (data[0] !== TWO_ROOT_FILE) {
      return 'err';
    }
    return true;
  } catch (error) {
    return 'err';
  }
}

/**
 * 判断 用户路径 /.f/ONE_ROOT_FILE 中的内容是否为128字节
 * @param userPath
 * @returns
 */
function isOneDataTrue(userPath: string) {
  try {
    const data = fs.readFileSync(
      path.join(userPath, '.e', '.f', ONE_ROOT_FILE),
      'utf-8'
    );
    if (data.length !== 128) {
      return 'err';
    }
    return true;
  } catch (error) {
    return 'err';
  }
}
/**
 * 判断 用户路径/.s/TWO_ROOT_FILE 中的内容是否为128字节
 * @param userPath
 * @returns
 */
function isTwoDataTrue(userPath: string) {
  try {
    const data = fs.readFileSync(
      path.join(userPath, '.e', '.s', TWO_ROOT_FILE),
      'utf-8'
    );
    if (data.length !== 128) {
      return 'err';
    }
    return true;
  } catch (error) {
    return 'err';
  }
}

/**
 * 判断 用户路径/.p 中的部分内容是否正确
 * @param userPath
 * @returns
 */
function isTrueP(userPath: string) {
  const json = readFileData(userPath);
  // 判断存储 数据是否为 obj 类型
  if (typeof json !== 'object') {
    return 'err';
  }
  const jsonResult = JSON.stringify([
    'ASE_iv',
    'Hostname',
    'Password_key',
    'Salt_key',
    'Working_key',
  ]);
  // 判断 键值 是否正确
  if (JSON.stringify(Object.keys(json).sort()) !== jsonResult) {
    return 'err';
  }
  // 判断部分 键值所对应的值长度 是否正确
  if (json.Salt_key.length !== 32 || json.ASE_iv.length !== 16) {
    return 'err';
  }
  return true;
}

/**
 * 处理各类异常场景
 * @param userPath 用户路径
 * @param ipAndUsernameHash ip & username hash值
 * @Returns
 */
function handleErrScene(userPath: string, ipAndUsernameHash: string) {
  // 是否存在用户目录
  if (hasUserFile(userPath, ipAndUsernameHash)) {
    // 判断 .e 目录是否异常
    const resultE = hasELength(userPath);
    // 判断第一个根秘钥组件是否异常
    const resultF = hasFData(userPath);
    const oneDataTrue = isOneDataTrue(userPath);
    // 判断第二个根秘钥组件是否异常
    const resultS = hasSData(userPath);
    const twoDataTrue = isTwoDataTrue(userPath);
    // 判断 .p 内容是否正确
    const resultP = isTrueP(userPath);
    if (
      resultE === 'err' ||
      resultF === 'err' ||
      resultS === 'err' ||
      oneDataTrue === 'err' ||
      twoDataTrue === 'err' ||
      resultP === 'err'
    ) {
      delFolder(userPath);
      return false;
    }
    return true;
  } else {
    return false;
  }
}

export { handleErrScene };
