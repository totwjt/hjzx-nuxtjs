// server/utils/apiBase.ts
export function resolveApiBase() {
  const config = useRuntimeConfig()

  const { useMock, mockBase, apiBase } = config.public

  if (useMock) {
    if (!mockBase) {
      throw new Error('useMock=true but mockBase is empty')
    }
    return mockBase
  }

  if (!apiBase) {
    throw new Error('useMock=false but apiBase is empty')
  }

  return apiBase
}