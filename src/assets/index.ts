import fs from 'fs'

const resourcesPath = 'src/assets/styles/resources'
const spritesPath = 'src/assets/sprites'

export default function getScssResources() {
  const resources: any = []
  fs.readdirSync(resourcesPath).map((dirname: string) => {
    if (
      fs.statSync(`${resourcesPath}/${dirname}`).isFile()
    ) {
      resources.push(
        `@import "${resourcesPath}/${dirname}";`
      )
    }
  })
  // css 精灵图相关
  fs.readdirSync(spritesPath).map((dirname: string) => {
    if (
      fs.statSync(`${spritesPath}/${dirname}`).isDirectory()
    ) {
      // css 精灵图生成的 scss 文件也需要放入全局 scss 资源
      resources.push(
        `@import "${spritesPath}/_${dirname}.scss";`
      )
    }
  })
  return resources
}
