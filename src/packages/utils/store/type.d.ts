import settings from './modules/settings'
import keepAlive from './modules/keepAlive'
import route from './modules/route'
import menu from './modules/menu'
import user from './modules/user'

import { Component } from 'vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'

export declare type assetsProp = {
    id: string
    content: string
    type: string
}

export declare type pageProp = {
    pageName:any
    pageType:string
    pageContent:string
    pageAssets: any
}

export declare type compProp = {
    [index:string]: Component
}

export declare type pages = Array<pageProp>

export declare type pageStateProp = {
    errorUrl: string
    components: compProp
    pages: pages
}

export declare type storeProp = {
    state: pageStateProp;
    setState(data:pageProp, name:any): Promise<void>
    setComponent(routeInfo:RouteLocationNormalizedLoaded, name:any): Promise<void>
    setErrorUrl(url:string): Promise<void>
}

export declare type settingType = {
    language:string
    languages: { [index: string]: any }
    app: {
        colorScheme: string
        elementSize: string
        enablePermission: boolean,
        enableProgress: boolean,
    },
    dashboard: {
        enable: boolean
        title: string
        path: string
    },
    menu: {
        menuMode: string,
        switchMainMenuAndPageJump: boolean
        subMenuUniqueOpened: boolean
        subMenuCollapse: boolean
    },
    topbar: {
        fixed: boolean
        enableSidebarCollapse: boolean
        enableBreadcrumb: boolean
        enableNavSearch: boolean
        enableFullscreen: boolean
        enablePageReload: boolean
        enableColorScheme: boolean
        enableAppSetting: boolean
    },
    copyright: {
        enable: boolean
        dates: string
        company: string
        website: string
    },
    subMenuCollapseLastStatus: boolean
    mode: string,
    title: string,
    [index:string]:any
};

export declare type stateProp = {
    settings: typeof settings
    menu: typeof menu
    keepAlive: typeof keepAlive,
    route: typeof route
    user: typeof user
}