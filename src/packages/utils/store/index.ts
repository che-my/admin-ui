import { App, inject, reactive } from 'vue'
import settings from './modules/settings'
import route from './modules/route'
import menu from './modules/menu'
import user from './modules/user'

import { stateProp } from './type'

export const stateSymbol = Symbol('stateSymbol')

const state = reactive<stateProp>({
    settings, menu, route, user
})

const install = (app:App) => {
    app.provide(stateSymbol,state)
}

export function useStore() {
    return inject<stateProp>(stateSymbol, state)
}

export default {
    install
}