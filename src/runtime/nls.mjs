import localeData from '__LOCALE_DATA_PATH__'

export function _format (message, args) {
  let result
  if (args.length === 0) {
    result = message
  } else {
    result = String(message).replace(/\{(\d+)\}/g, function (match, rest) {
      const index = rest[0]
      return typeof args[index] !== 'undefined' ? args[index] : match
    })
  }
  return result
}

export function localize (path, _data, defaultMessage) {
  const key = typeof _data === 'object' ? _data.key : _data
  const data = localeData?.contents || {}
  let message = (data[path] || {})[key]
  if (!message) {
    message = defaultMessage
  }
  const args = []
  for (let _i = 3; _i < arguments.length; _i++) {
    args[_i - 3] = arguments[_i]
  }
  return _format(message, args)
}

export const localize2 = (data, message, ...args) => {
  const original = _format(message, args)
  return {
    value: original,
    original
  }
}

export function getNLSMessages () {
  return []
}
export function getNLSLanguage () {
  return '__LOCALE__'
}

export function loadMessageBundle (file) {
  return localize
}

export function config (opt) {
  return loadMessageBundle
}

export function getConfiguredDefaultLocale () {
  return undefined
}
