import { Box, Button, Modal, Paper, Typography } from '@mui/material';

function ConfirmModal({
  open,
  onClose,
  message,
  onConfirm,
  onCancel,
  confirmButtonName,
}) {

  return (
    <Modal open={open} onClose={onClose} id='modal-confirm'>
      <Paper sx={{
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '40%',
        left: '50%',
        padding: 3
      }}>
        <Typography id='confirm-action-message'>{message}</Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'end',
          marginTop: 5
        }}>
          <Button
            sx={{ marginRight: 2 }}
            id='confirm-action'
            variant='contained'
            color='error'
            onClick={onConfirm}
          >
            {confirmButtonName}
          </Button>
          <Button
            id='cancel-action'
            variant='contained'
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}

export default ConfirmModal;