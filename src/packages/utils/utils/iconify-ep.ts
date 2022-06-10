import { addCollection } from '@iconify/vue'
import icons from '../icons.json'

export async function downloadAndInstall() {
  const data = Object.freeze(icons)
  addCollection(data)
}