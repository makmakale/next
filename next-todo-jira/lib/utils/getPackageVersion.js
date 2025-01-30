import fs from 'fs'
import path from 'path'

const getPackageVersion = () => {
  const packagePath = path.resolve(process.cwd(), 'package.json')
  const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
  return packageData.version
}

export default getPackageVersion