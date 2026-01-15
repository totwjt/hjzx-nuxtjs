import { themes, type ThemeName } from '~/themes/ui-themes'

export const useUiTheme = () => {
  const appConfig = useAppConfig()

  const theme = useCookie<ThemeName>('ui-theme', {
    default: () => 'blue'
  })

  const applyTheme = (name: ThemeName) => {
    appConfig.ui.colors ||= {}

    const c = themes[name].colors

    appConfig.ui.colors.primary = c.primary
    appConfig.ui.colors.secondary = c.secondary
    appConfig.ui.colors.neutral = c.neutral
  }

  watch(theme, applyTheme, { immediate: true })

  return {
    theme,
    setTheme: (name: ThemeName) => (theme.value = name)
  }
}