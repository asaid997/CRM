import { Button, Grid, TextField } from "@material-ui/core"
import { inject, observer } from "mobx-react"
import React, { useState } from "react"
import apiManager from "../../api"
import AC from "../AC"

function Update(props) {
  const { clss, clientsStore, ownerStore, emailTypeStore,snackBarStore,validateInput } = props
  const [owner, setOwner] = useState("")
  const [client, setClient] = useState("")
  const [emailType, setEmailType] = useState("")
  const clientHandler = (_, val) => setClient(val)
  const ownerHandler = (_, val) => setOwner(val)
  const emailHandler = (_, val) => setEmailType(val)

    const handleResults = (flag,success,failure) => flag ? snackBarStore.alertSuccess(success) : snackBarStore.alertFailure(failure)

  const failureOutput = field => `Choose a ${field} from the list`

  const transferHandler = async () => {
    if(validateInput(client,failureOutput("client")) && validateInput(emailType,failureOutput("email type")))
        handleResults(await clientsStore.ac_transfer(client,emailType),"Sent","Failed")
  }
  const changeOwnerHandler = async () => {
    if(validateInput(client,failureOutput("client")) && validateInput(owner,failureOutput("owner")))
        handleResults(await clientsStore.ac_changeOwner(client,owner),"Changed owner","Owner was not changed")
  }
  const declareHandler = async () => {
    if(validateInput(client,failureOutput("client")))
        handleResults(await clientsStore.ac_declareSale(client),"Sold","Failed")
  }

  return (
    <div>
      <h2>UPDATE</h2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AC
            options={clientsStore.clients.map((c) => `${c.first} ${c.last}`)}
            label="Choose client to update"
            handler={clientHandler}
            clss={clss.root}
          />
        </Grid>
        <Grid item xs={12}>
          <AC
            options={ownerStore.owners.map(c => c.owner)}
            label="owner"
            handler={ownerHandler}
            clss={clss.root}
          />
          <Button color="primary" onClick={changeOwnerHandler}>Transfer</Button>
        </Grid>
        <Grid item xs={12}>
          <AC 
            options={emailTypeStore.types.map(e => e.email_type)}
            label="email type"
            handler={emailHandler}
            clss={clss.root}
          />
            <Button color="primary" onClick={transferHandler}>Send email</Button>
        </Grid>
        <Grid item xs={12}>
          <Button color="primary" onClick={declareHandler}>Declare sale</Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default inject("clientsStore","ownerStore","emailTypeStore","snackBarStore")(observer(Update))
