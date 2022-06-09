import { onMounted, getCurrentInstance } from 'vue'

export const prefix = 'app-'

export const mitts = {
    toolsCommand: prefix + 'tools-command',
    saveSettings: prefix + 'save-settings',
    reload: prefix + 'reload',
    switchMenu: prefix + 'switch-menu'
}

export const emitList = ['tools-command', 'save-settings', 'reload', 'switch-menu']

export default function useGlobalMitt() {
    // @ts-ignore
    const { proxy } = getCurrentInstance()
    onMounted(() => {
        emitList.forEach(item => {
            window.$mitt.on(prefix + item, (...p) => proxy.$emit(item, p))
        })
    })
}