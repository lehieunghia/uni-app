import { weexGetSystemInfoSync } from './api/device/systemInfo'
import { normalizeStyles } from '@dcloudio/uni-shared'
import { parseWebviewStyle } from './framework/webview/style/index'
import { ON_THEME_CHANGE } from '@dcloudio/uni-shared'
import { setStatusBarStyle } from './statusBar'
import { getAllPages } from './framework/page/getCurrentPages'

type ThemeChangeCallBack = ({ theme }: { theme: UniApp.ThemeMode }) => void

function onThemeChange(callback: ThemeChangeCallBack) {
  UniServiceJSBridge.on(ON_THEME_CHANGE, callback)
}

function offThemeChange(callback: ThemeChangeCallBack) {
  UniServiceJSBridge.off(ON_THEME_CHANGE, callback)
}

function getNavigatorStyle() {
  return plus.navigator.getUIStyle() === 'dark' ? 'light' : 'dark'
}

export function changePagesNavigatorStyle() {
  if (__uniConfig.darkmode) {
    const theme = getNavigatorStyle()

    setStatusBarStyle(theme)

    const pages = getAllPages()
    pages.forEach((page) => {
      page.$page.statusBarStyle = theme
    })
  }
}

export function parseTheme<T extends Object>(pageStyle: T): T {
  if (__uniConfig.darkmode) {
    let parsedStyle = {} as T
    let theme = plus.navigator.getUIStyle()

    const systemInfo = weexGetSystemInfoSync()
    // 小程序 SDK
    if (systemInfo && systemInfo.hostTheme) {
      theme = systemInfo.hostTheme
    }

    parsedStyle = normalizeStyles(
      pageStyle,
      __uniConfig.themeConfig,
      theme as UniApp.ThemeMode
    )

    return parsedStyle
  }

  return pageStyle
}

export function useTabBarThemeChange(
  tabBar: any,
  options: UniApp.TabBarOptions
) {
  if (__uniConfig.darkmode) {
    const fn = () => {
      const {
        list = [],
        color,
        selectedColor,
        backgroundColor,
        borderStyle,
      } = parseTheme(options)
      tabBar &&
        tabBar.setTabBarStyle({
          color,
          selectedColor,
          backgroundColor,
          borderStyle,
        })
      tabBar &&
        tabBar.setTabBarItems({
          list: list.map((item) => ({
            iconPath: item.iconPath,
            selectedIconPath: item.selectedIconPath,
            visible: item.visible,
          })),
        })
    }

    // 由于应用首次启动获取不到手机 theme 应用首次启动设置下 tabBar
    fn()

    onThemeChange(fn)
  }
}

export function useWebviewThemeChange(
  webview: PlusWebviewWebviewObject,
  getWebviewStyle: () => ReturnType<typeof parseWebviewStyle>
) {
  if (__uniConfig.darkmode) {
    const fn = () => {
      const {
        animationAlphaBGColor,
        background,
        backgroundColorBottom,
        backgroundColorTop,
        titleNView: { backgroundColor, titleColor } = {},
      } = getWebviewStyle()
      webview?.setStyle({
        animationAlphaBGColor,
        background,
        backgroundColorBottom,
        backgroundColorTop,
        titleNView: {
          backgroundColor,
          titleColor,
        },
      })
    }

    onThemeChange(fn)

    webview.addEventListener('close', () => offThemeChange(fn))
  }
}
