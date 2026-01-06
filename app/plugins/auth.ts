import { useUserStore } from "@/stores/user";

export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    onResponseError({ response }) {
      if (response.status === 401) {
        const userStore = useUserStore()
        userStore.logout()
      }
    }
  })

  return {
    provide: { api }
  }
})