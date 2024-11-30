/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // 与您的 SCSS 变量保持一致
        secondary: '#64748b',
      },
    },
  },
  plugins: [],
  // 确保 antd 的样式不被 Tailwind 的样式覆盖
  corePlugins: {
    preflight: false,
  },
} 