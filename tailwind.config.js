/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
            zIndex: {
        '200': '200',
      }
    },
        screens: {
      sm: '640px', // ここを変更
      md: '768px', // ここは追加
      lg: '1024px',　// ここは追加
      xl: '1280px'　// ここは追加
    },
  },
  plugins: [],
}
