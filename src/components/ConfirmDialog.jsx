import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material'
import './ConfirmDialog.css'

function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  return (
    <Dialog open={open} onClose={onCancel} className="confirm-dialog">
      <DialogTitle className="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Typography className="confirm-dialog-message">{message}</Typography>
      </DialogContent>
      <DialogActions className="confirm-dialog-actions">
        <Button onClick={onCancel} className="confirm-dialog-cancel">
          Cancelar
        </Button>
        <Button onClick={onConfirm} className="confirm-dialog-confirm">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
