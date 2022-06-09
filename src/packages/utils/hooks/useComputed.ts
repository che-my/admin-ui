import { computed } from "vue";
import { useStore } from "my-lib/utils/store";
import { deepClone } from "my-lib/utils/utils";
import {useInjectRoute} from "my-lib/utils/hooks/useRoute";

export function sidebarComputed() {
    const { settingsState } = useStore().settings
    // 侧边栏主导航当前实际宽度
    const mainSidebarActualWidth = computed(() => {
        const width = getComputedStyle(document.documentElement).getPropertyValue('--g-main-sidebar-width')
        let actualWidth = parseInt(width)
        if (['head', 'single'].includes(settingsState.menu.menuMode)) {
            actualWidth = 0
        }
        return `${actualWidth}px`
    })
    // 侧边栏次导航当前实际宽度
    const subSidebarActualWidth = computed(() => {
        const width = getComputedStyle(document.documentElement).getPropertyValue('--g-sub-sidebar-width')
        let actualWidth = parseInt(width)
        if (settingsState.menu.subMenuCollapse) {
            actualWidth = 64
        }
        return `${actualWidth}px`
    })
    return  {
        mainSidebarActualWidth,
        subSidebarActualWidth
    }
}

export function topBarComputed(){
    const { settings } = useStore()
    const route = useInjectRoute()
    const { settingsState } = settings
    const enableSidebarCollapse = computed(() => {
        return settingsState.mode === 'mobile' || (
            ['side', 'head', 'single'].includes(settingsState.menu.menuMode) &&
            settingsState.topbar.enableSidebarCollapse
        )
    })
    const breadcrumbList = computed(() => {
        let breadcrumbList = []
        if (settingsState.dashboard.enable) {
            breadcrumbList.push({
                path: '/dashboard',
                title: settingsState.dashboard.title
            })
        }
        if (route?.meta.breadcrumbNeste) {
            breadcrumbList.push(...deepClone(route.meta.breadcrumbNeste))
        }
        return breadcrumbList
    })
    return {
        enableSidebarCollapse, breadcrumbList
    }
}