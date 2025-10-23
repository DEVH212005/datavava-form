import { create } from 'zustand'
import { ThemeMode } from '../enum'

interface FormState {
  themeMode: ThemeMode
  setThemeMode: (themeMode: ThemeMode) => void
}

const useTheme = create<FormState>()((set) => ({
  themeMode: ThemeMode.LIGHT,
  setThemeMode: (themeMode) => set({ themeMode }),
}));

export { useTheme }
