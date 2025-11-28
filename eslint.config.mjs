import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  // 1. 显式忽略不需要检查的文件夹 (这能解决很多奇怪的报错)
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
  // 2. 引入 Next.js 核心配置
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
]

export default eslintConfig
