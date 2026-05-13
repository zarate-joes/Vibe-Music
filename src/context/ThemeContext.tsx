import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface ThemeContextType {
  dark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Check local storage first so the theme persists if they refresh the page
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('vibe-theme') === 'dark'
    }
    return false
  })

  // Whenever the theme changes, save it to local storage
  useEffect(() => {
    localStorage.setItem('vibe-theme', dark ? 'dark' : 'light')
    
    // Optional: Add a class to the body if you want Tailwind's built-in "dark:" variants to work later
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

  const toggleTheme = () => setDark(!dark)

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook so your team can easily grab the theme anywhere
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}