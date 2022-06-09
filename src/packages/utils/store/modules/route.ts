import { deepClone, isExternalLink } from 'my-lib/utils/utils'
import { reactive } from 'vue'
// @ts-ignore
import path from 'path-browserify'
// 将多层嵌套路由处理成平级
function flatAsyncRoutes(routes:any, breadcrumb:any, baseUrl = '') {
    const res:any = []
    routes.forEach((route:any) => {
        if (route.children) {
            let childrenBaseUrl = ''
            if (baseUrl == '') {
                childrenBaseUrl = route.path
            } else if (route.path != '') {
                childrenBaseUrl = `${baseUrl}/${route.path}`
            }
            const childrenBreadcrumb = deepClone(breadcrumb)
            if (route.meta.breadcrumb !== false) {
                childrenBreadcrumb.push({
                    path: childrenBaseUrl,
                    title: route.meta.title
                })
            }
            const tmpRoute = deepClone(route)
            tmpRoute.path = childrenBaseUrl
            tmpRoute.meta.breadcrumbNeste = childrenBreadcrumb
            delete tmpRoute.children
            res.push(tmpRoute)
            const childrenRoutes = flatAsyncRoutes(route.children, childrenBreadcrumb, childrenBaseUrl)
            childrenRoutes.map((item:any) => {
                // 如果 path 一样则覆盖，因为子路由的 path 可能设置为空，导致和父路由一样，直接注册会提示路由重复
                if (res.some((v:any) => v.path == item.path)) {
                    res.forEach((v:any, i:any) => {
                        if (v.path == item.path) {
                            res[i] = item
                        }
                    })
                } else {
                    res.push(item)
                }
            })
        } else {
            const tmpRoute = deepClone(route)
            if (baseUrl != '' && !isExternalLink(tmpRoute.path)) {
                if (tmpRoute.path != '') {
                    tmpRoute.path = `${baseUrl}/${tmpRoute.path}`
                } else {
                    tmpRoute.path = baseUrl
                }
            }
            // 处理面包屑导航
            const tmpBreadcrumb = deepClone(breadcrumb)
            if (tmpRoute.meta.breadcrumb !== false) {
                tmpBreadcrumb.push({
                    path: tmpRoute.path,
                    title: tmpRoute.meta.title
                })
            }
            tmpRoute.meta.breadcrumbNeste = tmpBreadcrumb
            res.push(tmpRoute)
        }
    })
    return res
}

const route = {
    routeState: reactive({
        isGenerate: false,
        routes: [],
        currentRemoveRoutes: []
    }),
    setRoutes(routes:any) {
        route.routeState.isGenerate =  true
        route.routeState.routes =  routes
    },
    // 扁平化路由（将三级及以上路由数据拍平成二级）
    flatRoutes() {
        const routes:any = []
        if (route.routeState.routes) {
            this.routeState.routes.map((item:any) => {
                routes.push(...deepClone(item.children))
            })
            routes.map((item:any) => {
                if (item.children) {
                    item.children = flatAsyncRoutes(item.children, [{
                        path: item.path,
                        title: item.meta.title
                    }], item.path)
                }
            })
        }
        return routes
    },
    // 记录 accessRoutes 路由，用于登出时删除路由
    setCurrentRemoveRoutes(routes:any) {
        route.routeState.currentRemoveRoutes = routes
    },
    // 清空路由
    removeRoutes() {
        route.routeState.isGenerate = false
        route.routeState.routes = []
        // @ts-ignore
        route.routeState.currentRemoveRoutes.forEach(removeRoute => removeRoute())
        route.routeState.currentRemoveRoutes = []
    },
    defaultOpenedPaths() {
        const defaultOpenedPaths:any = []
        route.routeState.routes.map((item:any) => {
            item.meta.defaultOpened && defaultOpenedPaths.push(item.path)
            item.children && item.children.map((child:any) => {
                child.meta.defaultOpened && defaultOpenedPaths.push(path.resolve(item.path, child.path))
            })
        })
        return defaultOpenedPaths
    }
}

export default route
