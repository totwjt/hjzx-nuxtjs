export function useAuthToken() {
    const token = useCookie<string | null>('auth_token')

    const set = (val: string) => (token.value = val)
    const clear = () => (token.value = null)

    return { token, set, clear }
}
