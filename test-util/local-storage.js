export const getLocalStorage = (id) => {
    window.localStorage.getItem(id)
}

export const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data))
}