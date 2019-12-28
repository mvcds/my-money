class CreateEntry {
  constructor(presenter) {
    this.presenter = presenter
  }

  async execute(projection, entry) {
    this.presenter.onStart();

    try {
      projection.addEntry(entry)
    } catch(e) {
      this.presenter.onError(e)
    }

    this.presenter.onEnd();
  }
}

module.exports = CreateEntry
