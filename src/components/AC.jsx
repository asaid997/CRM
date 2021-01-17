import React from "react"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { observer } from "mobx-react"


function AC(props) {
  const { options,label,holder,clss,handler } = props
  const [value, setValue] = React.useState(holder)
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
        options={options}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} className={clss} label={label} variant="outlined" />
        )}
      />
    </div>
  )
}

export default observer(AC)
