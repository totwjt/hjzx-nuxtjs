export default defineNitroPlugin(() => {
    const config = useRuntimeConfig()
    console.log('[API MODE]', {
        useMock: config.public.useMock,
        base: config.public.useMock
            ? config.public.mockBase
            : config.public.apiBase
    })
})