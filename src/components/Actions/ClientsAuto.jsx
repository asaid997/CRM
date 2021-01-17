import React from "react"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { inject,observer } from "mobx-react"


function ClientsAuto(props) {
  const { clientsStore,client,clss,handler } = props
  const [value, setValue] = React.useState(client)
  const [inputValue, setInputValue] = React.useState("")
  

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
          handler(event,newInputValue)
        }}
        options={clientsStore.clients.map(c => `${c.first} ${c.last}`)}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} className={clss} label="client" name="client" variant="outlined" />
        )}
      />
    </div>
  )
}

export default inject("clientsStore")(observer(ClientsAuto))
