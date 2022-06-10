import { onMounted } from "vue";
import hotkeys from "hotkeys-js";
import { reload } from "my-lib/utils/hooks";
import { useStore } from "my-lib/utils/store";

export function refreshF5HotKeys(){
    const { settingsState } = useStore().settings
    onMounted(() => {
        hotkeys('f5', e => {
            if (settingsState.topbar.enablePageReload) {
                e.preventDefault()
                reload()
            }
        })
    })
}