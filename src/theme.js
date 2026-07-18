import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E2E',
    },
    primary: {
      main: '#8B5CF6',
    },
    secondary: {
      main: '#6366F1',
    },
    text: {
      primary: '#F5F5F7',
      secondary: '#A1A1AA',
    },
    error: {
      main: '#F87171',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
  h1: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, letterSpacing: '-0.5px' },
  h2: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, letterSpacing: '-0.5px' },
  h3: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
  h4: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
  h5: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
  h6: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
  button: { fontWeight: 600, textTransform: 'none' },
},
})

export default theme