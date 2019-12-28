async function CreateEntry(projection, entry, presenter) {
  presenter.onStart();

  try {
    projection.addEntry(entry)
  } catch(e) {
    presenter.onError(e)
  }

  presenter.onEnd();
}

module.exports = CreateEntry
