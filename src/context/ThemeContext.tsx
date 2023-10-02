"use client"

import { createContext, useState } from "react"

export const ThemeContext = createContext<ThemeContextType | null>(null);

type ThemeContextProviderProps = {
  children: React.ReactNode
}

type ThemeContextType = {
  toggle: () => void,
  mode: Theme
}

type Theme = "light" | "dark"

export const ThemeProvider = ({ children }: ThemeContextProviderProps) => {
  const [mode, setMode] = useState<Theme>("dark");

  const toggle = () => {
    setMode(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}