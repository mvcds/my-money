import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function CreateEntryDialog({ isOpen, source, value, onClose, onCreateEntry }) {
  const example = `MY$ ${parseFloat((Math.random() * 100).toFixed(2))}`

  return (
    <Dialog open onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle>Create Entry</DialogTitle>
      <DialogContent>
        <DialogContentText>
          An entry is either an incoming or expense you have periodically.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="source"
          label="Where is the money coming from / going to?"
          type="input"
          fullWidth
          placeholder="salary, rent, etc"
          value={source}
        />
        <TextField
          margin="dense"
          id="value"
          label="How much?"
          type="number"
          fullWidth
          placeholder={example}
          helperText="Always use the same currency"
          value={value}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onCreateEntry} color="primary" disabled>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default CreateEntryDialog
