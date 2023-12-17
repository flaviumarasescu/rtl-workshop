import 'whatwg-fetch'

global.setImmediate =
  global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args))


const localStorageMock = () => {
    let store = {}

    return {
        getItem(key) {
            return store[key] || null
        },
        setItem(key, value) {
            store[key] = value.toString()
        }
    }
}

Object.defineProperties(window, {localStorage: {value: localStorageMock}})