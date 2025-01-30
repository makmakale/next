export const toJSON = (data) => JSON.parse(JSON.stringify(data))

export const get = (obj, path, defaultValue) => {
  const keys = path.split('.')
  let result = obj

  for (const key of keys) {
    if (result === undefined || result === null) {
      return defaultValue
    }
    result = result[key]
  }

  return result
}