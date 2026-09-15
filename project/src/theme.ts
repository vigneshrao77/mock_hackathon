import { createTheme } from '@mantine/core'

export const theme = createTheme({
  primaryColor: 'navy',
  defaultRadius: 'md',
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    fontWeight: '700',
  },
  colors: {
    navy: [
      '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1',
      '#4f46e5', '#4338ca', '#3730a3', '#312e81', '#1e1b4b',
    ],
    brand: [
      '#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8',
      '#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e',
    ],
  },
  shadows: {
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.05)',
  },
})
