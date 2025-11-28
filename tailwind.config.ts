import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // 👈 开启深色模式
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-overpass)', 'sans-serif'], // 👈 修复字体回退
      },
      colors: {
        'night-blue': '#111729',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config