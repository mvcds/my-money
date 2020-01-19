import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

function CreateEntryDialog ({ isInvalid, source, value, onChangeSource, onChangeValue, onClose, onCreate, onKeyPress }) {
  // only a visual concern, kept as state to avoid changes on every rerender
  const [example] = useState(`MY$ ${parseFloat((Math.random() * 100).toFixed(2))}`)

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
          value={source.input}
          onChange={onChangeSource}
          error={!!source.error}
          helperText={source.error}
          onKeyPress={onKeyPress}
        />
        <TextField
          margin="dense"
          id="value"
          label="How much?"
          type="number"
          fullWidth
          placeholder={example}
          value={value.input}
          onChange={onChangeValue}
          error={!!value.error}
          helperText={value.error || 'Always use the same currency and up to two decimal places'}
          onKeyPress={onKeyPress}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCreate} color="primary" disabled={isInvalid}>
          Create
        </Button>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default CreateEntryDialog
