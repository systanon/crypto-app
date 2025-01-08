import { join } from 'node:path'
import { readdir } from 'node:fs/promises'

export const getFilePathsInDir = async (dirPath: string) => {
  const promises = await readdir(dirPath, { withFileTypes: true }).then((entries: any) =>
    entries.map((entry: any) => {
      const childPath = join(dirPath, entry.name)
      return entry.isDirectory() ? getFilePathsInDir(childPath) : childPath
    })
  )
  const paths = await Promise.all(promises)
  return paths.flat()
}
