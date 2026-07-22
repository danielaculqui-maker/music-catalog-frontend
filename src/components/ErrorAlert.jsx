import { Alert } from '@mui/material'
import './ErrorAlert.css'

function ErrorAlert({ message }) {
  if (!message) return null

  return (
    <Alert severity="error" className="error-alert">
      {message}
    </Alert>
  )
}

export default ErrorAlert