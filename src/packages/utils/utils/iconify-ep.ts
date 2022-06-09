import { addCollection } from '@iconify/vue'
import icons from '../../../assets/icons.json'

export async function downloadAndInstall() {
  const data = Object.freeze(icons)
  addCollection(data)
}