export const isTypeOfWindowUndefined = () => {
    return typeof window === "undefined"
}
export const setItemToLocalStorage = (key: string, value: any) => {
    if (isTypeOfWindowUndefined()) return null
    return localStorage.setItem(key, JSON.stringify(value))
}

export const getItemFromLocalStorage = (key: string) => {
    if (isTypeOfWindowUndefined()) return null
    const value = localStorage.getItem(key) || null
    return value ? JSON.parse(value) : null
}