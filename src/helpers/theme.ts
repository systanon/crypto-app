export const THEMES = ['dark', 'light']

export const setGlobalTheme = (theme: string) => {
  localStorage.setItem('theme', theme)
  const root = document.querySelector(':root') as HTMLElement
  if (root) {
    root.dataset.theme = theme
  }
}

export const getGlobalTheme = () => {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEMES[0]
    : THEMES[1]
  const theme = localStorage.getItem('theme') || systemTheme
  return THEMES.includes(theme) ? theme : systemTheme
}
