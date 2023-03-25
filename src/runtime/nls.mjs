import localeData from '__LOCALE_DATA_PATH__'

export function _format (message, args) {
  if (args.length === 0) {
    return message
  } else {
    return String(message).replace(/\{(\d+)\}/g, function (match, rest) {
      const index = rest[0]
      return args[index] ?? match
    })
  }
}

export function localize (path, _data, defaultMessage) {
  const key = typeof _data === 'object' ? _data.key : _data
  const data = localeData || {}
  let message = data?.[path]?.[key]
  if (!message) {
    message = defaultMessage
  }
  const args = []
  for (let _i = 3; _i < arguments.length; _i++) {
    args[_i - 3] = arguments[_i]
  }
  return _format(message, args)
}

export function loadMessageBundle (file) {
  return localize
}

export function config (opt) {
  return loadMessageBundle
}

export function getConfiguredDefaultLocale () {}
