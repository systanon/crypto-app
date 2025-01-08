import { getFilePathsInDir } from './utils'
import { readFile } from 'node:fs/promises'

const svgToSymbol = (svg: string, id: string): string =>
  svg.replace('<svg', `<symbol id="${id}"`).replace('</svg>', '</symbol>')

const svgExtensionRegExp = new RegExp('.svg$')
export const getSVGSymbolsString = async (pathToIconsDir: string): Promise<string> => {
  const paths = await getFilePathsInDir(pathToIconsDir)
  const promises = paths
    .filter((path) => svgExtensionRegExp.test(path))
    .map(async (path) => {
      const content = (await readFile(path, { encoding: 'utf8' })).toString()
      const name = path.slice(pathToIconsDir.length + 1, -4)
      return svgToSymbol(content, name)
    })
  const symbols = await Promise.all(promises)
  return symbols.join('\n')
}
