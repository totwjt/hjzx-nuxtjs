export function useClipboard() {
  /**
   * 复制文本到剪贴板（兼容 http + ip + https + localhost）
   */
  const copy = async (text: string) => {
    // 现代安全上下文
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }

    // 兜底方案（兼容 http + 局域网 IP + 老浏览器）
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    textarea.style.top = '-9999px'
    textarea.style.opacity = '0'

    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()

    let success = false
    try {
      success = document.execCommand('copy')
    } catch {
      success = false
    }

    document.body.removeChild(textarea)
    return success
  }

  return { copy }
}
export const useUseClipboard = () => {
  return ref()
}
