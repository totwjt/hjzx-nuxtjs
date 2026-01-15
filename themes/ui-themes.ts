export type ThemeName = 'green' | 'blue'

export const themes: Record<
  ThemeName, {
    colors: {
      primary: string
      secondary: string
      neutral: string
    }
  }
> = {
  green: {
    colors: {
      primary: 'green',
      secondary: 'lime',
      neutral: 'zinc'
    }
  },

  blue: {
    colors: {
      primary: 'blue',
      secondary: 'sky',
      neutral: 'zinc'
    }
  }
}