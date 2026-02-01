import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#070707',
          cream: '#F1EEE8',
          'cream-10': 'rgba(241, 238, 232, 0.10)',
          'cream-08': 'rgba(241, 238, 232, 0.08)',
          'cream-05': 'rgba(241, 238, 232, 0.05)',
          'cream-50': 'rgba(241, 238, 232, 0.50)',
          'cream-70': 'rgba(241, 238, 232, 0.70)',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'heading': ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
      },
      maxWidth: {
        'content': '1240px',
      },
      spacing: {
        'section-y': '6rem',
        'section-y-lg': '6.875rem',
        'section-y-mobile': '4.5rem',
      },
      borderColor: {
        DEFAULT: 'rgba(241, 238, 232, 0.08)',
      },
    },
  },
  plugins: [],
}

export default config
