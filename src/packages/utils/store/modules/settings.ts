import { reactive } from 'vue'

import appSettings from 'my-lib/utils/settings'
import { settingType } from 'my-lib/utils/store/type'

const settings = {
    settingsState: reactive<settingType>({
        ...appSettings,
        // 侧边栏是否收起（用于记录 pc 模式下最后的状态）
        subMenuCollapseLastStatus: appSettings.menu.subMenuCollapse
    }),
    // 设置访问模式
    setMode: (width:number) => {
        // 先判断 UA 是否为移动端设备（手机&平板）
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            settings.settingsState.mode = 'mobile'
        } else {
            // 如果为桌面设备，再根据页面宽度判断是否需要切换为移动端展示
            if (width < 992) {
                settings.settingsState.mode = 'mobile'
            } else {
                settings.settingsState.mode = 'pc'
            }
        }
    },
    // 设置网页标题
    setTitle(title:string) {
        settings.settingsState.title = title
    },
    setLogo(logo:string){
        settings.settingsState.logo = logo
    },
    // 切换侧边栏导航展开/收起
    toggleSidebarCollapse() {
        settings.settingsState.menu.subMenuCollapse = !settings.settingsState.menu.subMenuCollapse
        if (settings.settingsState.mode == 'pc') {
            settings.settingsState.subMenuCollapseLastStatus = !settings.settingsState.subMenuCollapseLastStatus
        }
    },
    // 设置主题颜色模式
    setColorScheme(color:string) {
        this.settingsState.app.colorScheme = color
    },
    // 更新主题配置
    updateThemeSetting(data:any) {
        Object.assign(this, data)
    },
    saveSettings(data:any) {
        localStorage.setItem('APP_SETTINGS', JSON.stringify(data))
    }
}

export default settings