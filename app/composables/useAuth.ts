export const useAuth = () => {
    const loading = useState('auth:loading', () => false)

    const login = async (phone: string, password: string) => {
        try {

            loading.value = true

            const {code, message} = await $fetch('/api/auth/login', {
                method: 'POST',
                body: {
                    phone, password
                }
            })

            return code === 200
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    }

    return {
        loading: readonly(loading),
        login,
    }
}