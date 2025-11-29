'use client'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange // ✅ 关键：禁用切换主题时的过渡动画，防止闪烁
    >
      {children}
    </ThemeProvider>
  )
}
