import { computed, onMounted, onUnmounted } from 'vue'
import { watchTheme, watchMode, watchTitle, watchMenuMode } from './useWatch'
import useLang from './useLang'
import { sidebarComputed } from './useComputed'
import { useStore } from "my-lib/utils/store";

export default function useLayout() {
    const { settingsState, setMode } = useStore().settings

    const { mainSidebarActualWidth, subSidebarActualWidth } = sidebarComputed()

    watchTitle()
    watchTheme()
    watchMode()
    watchMenuMode()

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