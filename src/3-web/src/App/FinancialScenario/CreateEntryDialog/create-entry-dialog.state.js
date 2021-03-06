import React, { useState } from 'react'

import Component from './create-entry-dialog.visual'

const INPUT = {
  input: '',
  error: null
}

function getSourceError (source) {
  if (source.length < 3) {
    return 'Use at least 3 characters to describe the source'
  }

  if (source.length > 20) {
    return 'Use at most 20 characters to describe the source'
  }

  return null
}

function getValueError (value) {
  const quantity = parseFloat(value)

  if (!Number.isFinite(quantity) || quantity === 0) {
    return 'Use a non-neutral number'
  }

  return null
}

function CreateEntryDialog ({ onClose, onCreateEntry }) {
  const [source, setSource] = useState(INPUT)
  const [value, setValue] = useState(INPUT)

  const handleSource = ({ target }) => {
    const { value } = target

    const error = getSourceError(value)

    setSource({
      input: value,
      error,
      target
    })
  }

  const handleValue = ({ target: { value } }) => {
    const error = getValueError(value)

    setValue({
      input: value,
      error
    })
  }

  const isInvalid = !!(getSourceError(source.input) || getValueError(value.input))

  const handleCreation = async () => {
    if (isInvalid) return

    const entry = { source: source.input, value: value.input }

    source.target.focus()

    setSource(INPUT)
    setValue(INPUT)

    await onCreateEntry(entry)
  }

  const handleKeyPress = ({ key }) => {
    if (key === 'Enter') {
      handleCreation()
    }
  }

  return (
    <Component
      isInvalid={isInvalid}
      source={source}
      value={value}
      onChangeSource={handleSource}
      onChangeValue={handleValue}
      onKeyPress={handleKeyPress}
      onClose={onClose}
      onCreate={handleCreation}
    />
  )
}
export default CreateEntryDialog
