import "./window"
import path from 'path-browserify'
import { assetsProp } from '../store/type'
import { markRaw, defineAsyncComponent, h, compile, Component } from 'vue'
import { useStore } from '../store'

function hasPermission(permission: any) {
    const { settings, user } = useStore()
    const { settingsState } = settings
    const { userState } = user
    if (settingsState.app.enablePermission) {
        return userState.permissions.some(v => {
            return v === permission
        })
    } else {
        return true
    }
}

export function auth(value:any) {
    let auth
    if (typeof value === 'string') {
        auth = hasPermission(value)
    } else {
        auth = value.some((item:any) => {
            return hasPermission(item)
        })
    }
    return auth
}

export function authAll(value:any) {
    return value.every((item:any) => {
        return hasPermission(item)
    })
}

export function isExternalLink(path:any) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

export function resolveRoutePath(basePath:string, routePath:string) {
    if (isExternalLink(routePath)) {
        return routePath
    }
    if (isExternalLink(basePath)) {
        return basePath
    }
    return basePath ? path.resolve(basePath, routePath) : routePath
}

// export function registerComponent(domName:string, template:string){
//     const compName = toHump(domName);
//     const name = domName+"Component";
//     window.$admin.component(compName,getComponent('component',template,name))
// }

export function deepClone(target:any) {
    // 定义一个变量
    let result:any
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
        // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = [] // 将result赋值为一个数组，并且执行遍历
            for (const i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
            // 判断如果当前的值是null的话；直接赋值为null
        } else if (target === null) {
            result = null
            // 判断如果当前的值是一个RegExp对象的话，直接赋值
        } else if (target.constructor === RegExp) {
            result = target
        } else {
            // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {}
            for (const i in target) {
                result[i] = deepClone(target[i])
            }
        }
        // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target
    }
    // 返回最终结果
    return result
}

export function loadSfcComponent(content:string, name:any) {
    const { loadModule } = window['vue3-sfc-loader']
    return loadModule(`${name}AsyncComponent.vue`, {
        moduleCache: { vue: window.Vue, 'vue-router': window.VueRouter },
        getFile: async() => content,
        addStyle: async(textContent:string) => {
            const rootStyle = document.createElement('style')
            rootStyle.setAttribute('type', 'text/css')
            const style = Object.assign(rootStyle, { textContent })
            const ref = document.head.getElementsByTagName('style')[0] || null
            document.head.insertBefore(style, ref)
        }
    })
}

export function getComponent(type:string, content:any, name:any) {
    let comp: Promise<Component>
    switch (type) {
        case 'component':
            comp = loadSfcComponent(content, name)
            break
        case 'html':
            comp = Promise.resolve({
                name: `${name}Html`,
                render: () => compile(content)
            })
            break
        case 'dialog':
            comp = Promise.resolve({
                name: `${name}Html`,
                render: () => compile(content)
            })
            break
        case 'json':
            // comp = Promise.resolve({
            //     name:`${name}Json`,
            //     render:()=>h(NodeCreate,content)
            // })
            break
    }
    return markRaw(defineAsyncComponent({
        loader: () => comp,
        suspensible: false
    }))
}

export const transFromEntries = function(keys:string[], ctx:any = {}) {
    if (ctx instanceof Function) {
        return Object.fromEntries(keys.map(ctx))
    } else {
        return Object.fromEntries(keys.map((key:string) => [key, ctx[key]]))
    }
}

/**
 * 中划线字符驼峰
 * @param {*} str 要转换的字符串
 * @returns 返回值
 */
export function toHump(str: string): string {
    if (!str) return str
    return str
        .replace(/\-(\w)/g, function(all, letter) {
            return letter.toUpperCase()
        })
        .replace(/(\s|^)[a-z]/g, function(char) {
            return char.toUpperCase()
        })
}

/**
 * 随机字符串
 * @param len
 * @param radix
 */
export function uuid(len = 8, radix = 8) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    let uuid = [], i
    radix = radix || chars.length
    if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
    } else {
        let r
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
            }
        }
    }
    return uuid.join('')
}

export function loadAssets(item:assetsProp) {
    return new Promise((resolve, reject) => {
        item.id = item.id ? item.id : uuid()
        const dom = document.getElementById(item.id)
        if (!dom) {
            const type = item.type
            let html:any = null
            let isLink = false
            switch (type) {
                case 'js':
                    html = document.createElement('script')
                    if (item.content.indexOf('.js') !== -1) {
                        html.src = item.content
                        isLink = true
                    } else {
                        html.innerHTML = item.content
                    }
                    break
                case 'css':
                    if (item.content.indexOf('.css') !== -1) {
                        html = document.createElement('link')
                        html.href = item.content
                        isLink = true
                    } else {
                        html = document.createElement('style')
                        html.innerHTML = item.content
                    }
                    break
            }
            if (html) {
                html.id = item.id
                html.onload = () => resolve(item)
                html.onerror = () => reject(new Error(`Load assets from ${type}: ${item.content} failed`))
                const head = document.head || document.getElementsByTagName('head')[0]
                head.appendChild(html)
                if (!isLink) {
                    resolve(item)
                }
            }
        } else {
            resolve(item)
        }
    })
}

export function setAssets(resources:assetsProp[] = []) {
    return new Promise(async(resolve, reject) => {
        if (resources && resources.length > 0) {
            // @ts-ignore
            await resources.reduce((res, item:assetsProp) => {
                return res.then(() => loadAssets(item))
                // @ts-ignore
            }, Promise.resolve()).then(() => resolve(true)).catch((error:any) => {
                console.error('页面资源加载失败:', error.name, error.message)
                reject(error)
            })
        } else {
            resolve(true)
        }
    })
}

