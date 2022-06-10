import { onMounted, onUnmounted, provide } from 'vue'
import { watchTheme, watchMode, watchTitle, watchMenuMode, watchSubMenuCollapse } from './useWatch'
import { sidebarComputed } from './useComputed'
import { useStore } from "my-lib/utils/store";
import { refreshF5HotKeys, reload } from "my-lib/utils/hooks";
import useLang from './useLang'

export function useLayout() {
    const { menu } = useStore()
    provide('reload', reload)
    provide('switchMenu', menu.switchMenu)

    const { settingsState, setMode } = useStore().settings
    const { mainSidebarActualWidth, subSidebarActualWidth } = sidebarComputed()

    watchTitle()
    watchTheme()
    watchMode()
    watchMenuMode()
    watchSubMenuCollapse()
    refreshF5HotKeys()

    const lang = useLang()
    const resize = () => {
        setMode(document.documentElement.clientWidth)
    }

    onMounted(() => {
        window.onresize = resize
    })

    onUnmounted(() => {
        window.onresize = null
    })

    const elementSize = settingsState.app.elementSize

    return {
        lang,
        elementSize,
        mainSidebarActualWidth,
        subSidebarActualWidth
    }
}