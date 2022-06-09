import type { App } from 'vue'
import SvgIcon from './index.vue'

SvgIcon.install = (app: App) => {
  app.component(SvgIcon.name, SvgIcon)
}

export { SvgIcon }
export default SvgIcon
