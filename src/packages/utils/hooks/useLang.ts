import { computed } from 'vue'
import enLang from 'element-plus/es/locale/lang/en'
import zhCnLang from 'element-plus/es/locale/lang/zh-cn'
import { useStore } from "my-lib/utils/store";

export default function useLang() {
  const { settingsState } = useStore().settings
  return computed(() => {
    if (settingsState.language === 'en') {
      return enLang
    } else if (settingsState.language === 'zh-cn') {
      return zhCnLang
    } else {
      if (
        settingsState.languages &&
        settingsState.languages[settingsState.language]
      ) {
        return settingsState.languages[
          settingsState.language
        ]
      } else if (settingsState.languages) {
        return settingsState.languages
      } else {
        return zhCnLang
      }
    }
  })
}
