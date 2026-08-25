export const isTypeOfWindowUndefined = () => {
    return typeof window === "undefined"
}
export const setItemToLocalStorage = (key: string, value: unknown) => {
    if (isTypeOfWindowUndefined()) return null
    return localStorage.setItem(key, JSON.stringify(value))
}

export const getItemFromLocalStorage = <T = unknown>(key: string): T | null => {
    if (isTypeOfWindowUndefined()) return null
    const value = localStorage.getItem(key) || null
    return value ? (JSON.parse(value) as T) : null
}
