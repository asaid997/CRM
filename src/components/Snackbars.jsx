import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { inject, observer } from 'mobx-react'



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

function CustomizedSnackbars(props) {
  const {snackBarStore} = props

  return (
    <Snackbar open={snackBarStore.toShow} autoHideDuration={3000} onClose={snackBarStore.closeAlert}>
      <Alert onClose={snackBarStore.closeAlert} severity={snackBarStore.type}>
        {snackBarStore.msg}
      </Alert>
    </Snackbar>
  )
}

export default inject("snackBarStore")(observer(CustomizedSnackbars))