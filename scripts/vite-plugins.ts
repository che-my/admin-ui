import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// @ts-ignore
import ElementPlus from 'unplugin-element-plus/vite'
import { resolve } from 'path'

const plugins:any[] = [
  createSvgIconsPlugin({
    iconDirs: [
      resolve(process.cwd(), 'src/assets/icons/'),
    ],
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: true,
  }),
  ElementPlus()
]

export default plugins
