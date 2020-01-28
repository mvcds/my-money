import React from 'react'
import { observer } from 'mobx-react'
import store from 'my-web/src/Store'

import Component from './create-entry-dialog.state'

const CreateEntryDialogData = observer(({ model, onClose }) => <Component onCreateEntry={model.handleEntryCreation} onClose={onClose} />)

export default ({ onClose }) => <CreateEntryDialogData model={store.financialScenario} onClose={onClose} />
