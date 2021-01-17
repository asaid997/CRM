import React, { useEffect, useState } from "react"
import { Button, TextField } from "@material-ui/core"
import { observer, inject } from "mobx-react"
import AC from "../AC"

function AddClient(props) {
  const { snackBarStore, ownerStore, clientsStore, clss, countrieStore,validateInput } = props

  const fields = ["first", "last", "email"]
  const [vals, setVals] = useState({
    first: "",
    last: "",
    email: "",
    country: "",
    owner: "",
  })

  const changeHandler = (event) => {
    const { name, value } = event.target
    setVals({ ...vals, [name]: value })
  }
  const countryHandler = (_, val) => setVals({ ...vals, country: val })
  const ownerHandler = (_, val) => setVals({ ...vals, owner: val })


  const addClient = async () => {
    if(Object.keys(vals).every(k => validateInput(vals[k],`${k} is empty`))){
      const result = await clientsStore.ac_addClient({
        first: vals.first,
        last: vals.last,
        country: vals.country,
        ownerId: ownerStore.byName(vals.owner),
        email: vals.email,
      })

      console.log(result)
      result
        ? snackBarStore.alertSuccess("Added")
        : snackBarStore.alertSuccess("Added")
    }
  }

  return (
    <div>
      <h2>ADD CLIENT</h2>
      {fields.map((f) => (
        <div key={f}>
          <TextField
            key={f}
            label={f}
            margin="normal"
            variant="outlined"
            name={f}
            onChange={changeHandler}
            className={clss.root}
          ></TextField>
        </div>
      ))}
      <div>
        <AC
          options={countrieStore.countries.map((c) => c.country)}
          label="country"
          handler={countryHandler}
          clss={clss.root}
        />
      </div>
      <div>
        <AC
          options={ownerStore.owners.map((o) => o.owner)}
          label="owner"
          handler={ownerHandler}
          clss={clss.root}
        />
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={addClient}>
          Add Client
        </Button>{" "}
      </div>
    </div>
  )
}

export default inject("snackBarStore","ownerStore","clientsStore","countrieStore")(observer(AddClient))
