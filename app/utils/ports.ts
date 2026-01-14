// utils/ports.ts
export function getImageDefaultPorts(image: IImage | null): string[] {
  if (!image) return []

  const ports = image.defaultPorts

  if (Array.isArray(ports)) return ports

  try {
    const parsed = JSON.parse(ports)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
