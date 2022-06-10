import { onMounted, getCurrentInstance } from 'vue'
import { eventMitt } from 'my-lib/utils'

export const prefix = 'global-'

export const mitts = {
    searchToggle: prefix + 'search-toggle',
    toolsCommand: prefix + 'tools-command',
    saveSettings: prefix + 'save-settings',
    reload: prefix + 'reload',
    switchMenu: prefix + 'switch-menu'
}

export const emitList = ['tools-command', 'save-settings', 'reload', 'switch-menu']

export function useGlobalMitt() {
    // @ts-ignore
    const { proxy } = getCurrentInstance()
    onMounted(() => {
        emitList.forEach(item => {
            eventMitt.on(prefix + item, (...p) => proxy.$emit(item, p))
        })
    })
}