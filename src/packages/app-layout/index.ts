import type { App } from 'vue'
import AppLayout from './index.vue'

AppLayout.install = (app: App) => {
  app.component(AppLayout.name, AppLayout)
}

export { AppLayout }
export default AppLayout
