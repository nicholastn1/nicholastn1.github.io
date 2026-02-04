import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary gradient colors
        primary: {
          DEFAULT: '#00198d',
          light: '#4f6dff',
        },
        // Accent colors
        accent: {
          green: '#00e59b',
        },
        // Background colors
        background: {
          dark: '#141414',
          black: '#000000',
        },
        // Text colors
        text: {
          primary: '#141414',
          secondary: '#525252',
          muted: '#a3a3a3',
        },
      },
      fontFamily: {
        sans: ['Titillium Web', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      backgroundImage: {
        'gradient-primary':
          'linear-gradient(137.94deg, #00198d 15.4%, #4f6dff 88.72%)',
      },
      screens: {
        // Custom breakpoints matching original design
        xs: '500px',
        sm: '640px',
        md: '800px',
        lg: '900px',
        xl: '1000px',
        '2xl': '1200px',
      },
    },
  },
  plugins: [],
} satisfies Config
