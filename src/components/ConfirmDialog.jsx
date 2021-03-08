import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { UNSET_DIALOG } from '../constants';

const ConfirmDialog = () => {
  const dispatch = useDispatch();
  const { title, body, onConfirm, onCancel } = useSelector(
    (state) => state.notification.dialog
  );

  const handleClose = () => {
    dispatch({ type: UNSET_DIALOG });
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color='primary'>
            Cancel
          </Button>
          <Button onClick={onConfirm} color='primary' autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
