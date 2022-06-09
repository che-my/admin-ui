import { deepClone, resolveRoutePath } from 'my-lib/utils/utils'
import { reactive } from 'vue'
import { useStore } from 'my-lib/utils/store'

// @ts-ignore
function getDeepestPath(routes, rootPath = '') {
    let retnPath
    if (routes.children) {
        if (
            routes.children.some((item:any) => {
                return item.meta.sidebar != false
            })
        ) {
            for (let i = 0; i < routes.children.length; i++) {
                if (routes.children[i].meta.sidebar != false) {
                    retnPath = getDeepestPath(routes.children[i], resolveRoutePath(rootPath, routes.path))
                    break
                }
            }
        } else {
            retnPath = getDeepestPath(routes.children[0], resolveRoutePath(rootPath, routes.path))
        }
    } else {
        retnPath = resolveRoutePath(rootPath, routes.path)
    }
    return retnPath
}

// @ts-ignore
function hasPermission(permissions, route) {
    let isAuth = false
    if (route.meta && route.meta.auth) {
        isAuth = permissions.some((auth:any) => {
            if (typeof route.meta.auth == 'string') {
                return route.meta.auth === auth
            } else {
                return route.meta.auth.some((routeAuth:any) => {
                    return routeAuth === auth
                })
            }
        })
    } else {
        isAuth = true
    }
    return isAuth
}

function filterAsyncMenus(menus:any, permissions:any) {
    const res:any[] = []
    menus.forEach((menu:any) => {
        const tmpMenu = deepClone(menu)
        if (hasPermission(permissions, tmpMenu)) {
            if (tmpMenu.children) {
                tmpMenu.children = filterAsyncMenus(tmpMenu.children, permissions)
                tmpMenu.children.length && res.push(tmpMenu)
            } else {
                res.push(tmpMenu)
            }
        }
    })
    return res
}

const menu = {
    menuState: reactive({
        menus: [],
        actived: 0
    }),
    // 完整导航数据
    allMenus():any[] {
        const { settings, route } = useStore()
        const { settingsState } = settings
        const { routeState } = route
        let menus:any[] = []
        if (settingsState.menu.menuMode === 'single') {
            menus = [{ children: [] }]
            routeState.routes.map((item:any) => {
                menus[0].children.push(...item.children)
            })
        } else {
            menus = routeState.routes
        }
        return menus
    },
    // 次导航数据
    sidebarMenus() {
        const menus = this.allMenus()
        return menus.length > 0 ? menus[this.menuState.actived].children : []
    },
    // 次导航里第一个导航的路径
    sidebarMenusFirstDeepestPath() {
        return this.allMenus().length > 0 ? getDeepestPath(this.sidebarMenus()[0]) : '/'
    },
    defaultOpenedPaths() {
        const { route } = useStore()
        return route.defaultOpenedPaths()
    },
    // 切换主导航
    setActived(data:number|string)  {
        if (typeof data === 'number') {
            // 如果是 number 类型，则认为是主导航的索引
            menu.menuState.actived = data
        } else {
            // 如果是 string 类型，则认为是路由，需要查找对应的主导航索引
            this.allMenus().map((item, index) => {
                if (
                    item.children.some((r:any) => {
                        return data.indexOf(r.path + '/') === 0 || data == r.path
                    })
                ) {
                    menu.menuState.actived = index
                }
            })
        }
    }
}

export default menu
