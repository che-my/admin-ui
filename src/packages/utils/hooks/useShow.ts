import { computed } from 'vue'
import { useStore } from "my-lib/utils/store";

export function useShow() {
    const { settingsState } = useStore().settings
    const showHeader = computed(() => settingsState.mode === 'pc' && settingsState.menu.menuMode === 'head')
    const showSidebar = computed(() => settingsState.mode === 'mobile' && !settingsState.menu.subMenuCollapse)
    const showCopyright = computed(() => settingsState.copyright.enable)
    const showTopbar = computed(() => !(settingsState.menu.menuMode === 'head' && !settingsState.topbar.enableSidebarCollapse && !settingsState.topbar.enableBreadcrumb))
    return {
        showHeader, showSidebar, showCopyright, showTopbar
    }
}

