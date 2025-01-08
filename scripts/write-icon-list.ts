const { writeFileSync } = require('node:fs')
const { getDirFiles } = require('./utils')
const { svgExtensionRegExp, PATH_TO_ICONS, PATH_TO_ICONS_LIST } = require('./svg')

const paths = getDirFiles(PATH_TO_ICONS)

const iconNames = paths
  .filter((path) => svgExtensionRegExp.test(path))
  .map((path) => path.slice(PATH_TO_ICONS.length + 1, -4))

const script = `/* eslint-disable prettier/prettier */\nexport default ${JSON.stringify(
  iconNames,
  null,
  2
)}\n`
writeFileSync(PATH_TO_ICONS_LIST, script)
