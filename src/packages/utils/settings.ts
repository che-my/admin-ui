
const globalSettings = {
    language: 'zh-cn',
    languages: {},
    app: {
        // 颜色方案，可选值为 light、dark
        colorScheme: 'light',
        // Element 组件默认尺寸，支持：large、default、small
        elementSize: 'default',
        // 是否开启载入进度条
        enableProgress: true,
        enablePermission: false
    },
    // 控制台
    dashboard: {
        // 是否开启
        enable: true,
        // 控制台名称
        title: '控制台',
        path: '/'
    },
    // 导航栏
    menu: {
        /**
         * 导航栏模式
         * side 侧边栏模式（含主导航）
         * head 顶部模式
         * single 侧边栏模式（无主导航）
         */
        menuMode: 'head',
        // 切换主导航同时跳转页面
        switchMainMenuAndPageJump: true,
        // 次导航只保持一个子项的展开
        subMenuUniqueOpened: true,
        // 次导航是否收起
        subMenuCollapse: false
    },
    // 顶栏
    topbar: {
        // 是否固定
        fixed: true,
        // 是否开启侧边栏展开收起按钮
        enableSidebarCollapse: true,
        // 是否开启面包屑导航
        enableBreadcrumb: true,
        // 是否开启导航搜索
        enableNavSearch: true,
        // 是否开启全屏
        enableFullscreen: true,
        // 是否开启页面刷新
        enablePageReload: true,
        // 是否开启颜色主题
        enableColorScheme: true,
        // 是否开启应用配置（建议在生产环境关闭）
        enableAppSetting: true
    },
    // 底部版权
    copyright: {
        // 是否开启，同时在路由 meta 对象里可以单独设置某个路由是否显示底部版权信息
        enable: true,
        // 版权信息配置，格式为：Copyright © [dates] <company>, All Rights Reserved
        dates: '2020-2022',
        company: 'Fantastic-admin',
        website: 'https://fantastic-admin.netlify.app'
    },
    // 显示模式，支持：mobile、pc
    mode: 'pc',
    title: '后台管理系统'
}
export default globalSettings