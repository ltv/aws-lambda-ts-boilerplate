const fs = require('fs')
const path = require('path')

const nodeExternals = (nmPath) => {
  if (!fs.existsSync(nmPath)) {
    return {}
  }
  const nodeModules = {}
  fs.readdirSync(nmPath)
    .filter(function (x) {
      return ['.bin'].indexOf(x) === -1
    })
    .forEach(function (mod) {
      nodeModules[mod] = 'commonjs ' + mod
    })

  return nodeModules
}

const useNohoist = (pkgPath) => {
  let packagePath = ''
  if (!pkgPath && fs.existsSync(pkgPath)) {
    packagePath = pkgPath
  } else {
    packagePath = path.resolve(__dirname, '..', 'package.json')
  }

  const pkg = require(packagePath)
  pkg.workspaces['nohoist'] = ['**']
  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2), { encoding: 'utf8' })
}

module.exports = { nodeExternals, useNohoist }
