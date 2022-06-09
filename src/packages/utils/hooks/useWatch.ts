
import { watch } from 'vue'
import { useStore } from "my-lib/utils/store";

export function watchTheme() {
    const { settingsState } = useStore().settings
    watch(() => settingsState.app.colorScheme, () => {
        if (settingsState.app.colorScheme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, {
        immediate: true
    })
}

export function watchMode() {
    const { settingsState } = useStore().settings
    watch(() => settingsState.mode, () => {
        if (settingsState.mode === 'pc') {
            settingsState.menu.subMenuCollapse = settingsState.subMenuCollapseLastStatus
        } else if (settingsState.mode === 'mobile') {
            settingsState.menu.subMenuCollapse = true
        }
        document.body.setAttribute('data-mode', settingsState.mode)
    }, {
        immediate: true
    })
}

export function watchMenuMode() {
    const { settingsState } = useStore().settings
    watch(() => settingsState.menu.menuMode, () => {
        document.body.setAttribute('data-menu-mode', settingsState.menu.menuMode)
    }, {
        immediate: true
    })
}

export function watchTitle() {
    const { settingsState } = useStore().settings
    watch(() => settingsState.title, () => {
        const subtitle = window.appConfig ? window.appConfig.title : ''
        if (settingsState.title) {
            const title = settingsState.title
            document.title = `${title} - ${subtitle}`
        } else {
            document.title = subtitle
        }
    }, {
        immediate: true
    })
}

export function watchSubMenuCollapse() {
    const { settingsState } = useStore().settings
    watch(() => settingsState.menu.subMenuCollapse, val => {
        if (settingsState.mode === 'mobile') {
            if (!val) {
                document.querySelector('body')?.classList.add('overflow-hidden')
            } else {
                document.querySelector('body')?.classList.remove('overflow-hidden')
            }
        }
    })
}



