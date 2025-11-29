'use client'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange // ✅ 新增：这是防闪烁的神器
    >
      {children}
    </ThemeProvider>
  )
}
