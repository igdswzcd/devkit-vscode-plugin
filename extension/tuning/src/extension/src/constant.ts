/**
 * 颜色主题
 */
export const enum COLOR_THEME {
  Dark = 'dark',
  Light = 'light',
}

/**
 * http 状态枚举
 */
export const enum HTTP_STATUS {
  HTTP_200_OK = 200,
  HTTP_401_UNAUTHORIZED = 401,
  HTTP_404_NOTFOUND = 404,
  HTTP_408_REQUEST_TIMEOUT = 408,
  HTTP_500_SERVERERROR = 500,
  HTTP_502_SERVERERROR = 502,
  HTTP_503_SERVERERROR = 503,
  HTTP_400_BAD_REQUEST = 400,
  HTTP_409_CONFLICT = 409,
  HTTP_407_SERVERERROR = 407,
  HTTP_507_SERVERERROR = 507,
}
/**
 * 弹框类型枚举
 */
export const enum NAVIGATE_PAGE {
  config = 'config',
  freeTrialProcessEnvironment = 'freeTrialProcessEnvironment',
}

/**
 * webview panel ID
 */
export enum PANEL_ID {
  tuningNonServerConfig = 'tuningNonServerConfig',
  tuningFreeTrialRemoteEnvironment = 'tuningFreeTrialRemoteEnvironment',
  tuningUninstall = 'tuningUninstall',
  tuningInstall = 'tuningInstall',
  tuningUpgrade = 'tuningUpgrade',
  tuningNonLogin = 'tuningNonLogin',
  tuningErrorInstruction = 'tuningErrorInstruction',
}

/**
 * webview 类型
 */
export enum VIEW_TYPE {
  serverConfig = 'serverConfig',
  freeTrialRemoteEnvironment = 'freeTrialRemoteEnvironment',
  uninstall = 'uninstall',
  install = 'install',
  upgrade = 'upgrade',
  serverError = 'serverError',
  login = 'login',
}
