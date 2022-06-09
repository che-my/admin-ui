import { App, inject, reactive } from 'vue'
import keepAlive from './modules/keepAlive'
import settings from './modules/settings'
import route from './modules/route'
import menu from './modules/menu'
import user from './modules/user'
// import page from "./modules/page";

import { stateProp } from './type'

export const stateSymbol = Symbol('stateSymbol')

const state = reactive<stateProp>({
    settings, menu, keepAlive, route, user
})

const install = (app:App, options:stateProp|null = null) => {
    app.provide(stateSymbol, options ? { ...state, ...options } : state)
}

export function useStore() {
    return inject<stateProp>(stateSymbol, state)
}

export default {
    install
}