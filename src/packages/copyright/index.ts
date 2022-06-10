import type { App } from 'vue'
import Copyright from './index.vue'

Copyright.install = (app: App) => {
  app.component(Copyright.name, Copyright)
}

export { Copyright }
export default Copyright
