
export function isString<T>(data:T):boolean {
    return typeof data === 'string'
}
export const isObject = (data:any) => typeof data === 'object'
export const isFunction = (data:any) => typeof data === 'function'
export const isNumber = (data:any) => typeof data === 'number'
export const isBool = (data:any) => typeof data === 'boolean'
export const isArray = (data:any) => Array.isArray(data)

/** url链接正则 */
export function isUrl<T>(value: T): boolean {
    const reg =
        // eslint-disable-next-line no-useless-escape
        /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
    // @ts-expect-error
    return reg.test(value)
}

/** 手机号码正则 */
export function isPhone<T>(value: T): boolean {
    const reg =
        /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/
    // @ts-expect-error
    return reg.test(value)
}

/** 邮箱正则 */
export function isEmail<T>(value: T): boolean {
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    // @ts-expect-error
    return reg.test(value)
}

export default {
    isString, isObject, isFunction, isNumber, isBool, isUrl, isPhone, isEmail
}
