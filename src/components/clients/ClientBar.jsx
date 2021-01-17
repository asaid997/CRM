import React from "react"
import {Grid,Input,InputLabel,makeStyles,MenuItem,Select,TablePagination,FormControl} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

export default function ClientsBar(props) {
  const classes = useStyles()
  const {
    filterHandler,
    handleChangePage,
    localClients,
    page,
    filterBy,
    filterByHandler,
  } = props
  const rows = 20

  const filterByItems = [
    "first",
    "last",
    "country",
    "email",
    "email_type",
    "sold",
    "owner",
  ]

  return (
    <Grid item container xs={10} spacing={3} alignItems="center">
      <Grid item xs={2}>
        <Input placeholder="Filter" onChange={filterHandler} />
      </Grid>
      <Grid item xs={4}>
        <FormControl className={classes.formControl}>
          <InputLabel>FilterBy</InputLabel>
          <Select value={filterBy} onChange={filterByHandler}>
            {filterByItems.map((i) => (
              <MenuItem key={i} value={i}>{i}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={3}>
        <TablePagination
          rowsPerPageOptions={[]}
          count={localClients.length}
          rowsPerPage={rows}
          page={page}
          onChangePage={handleChangePage}
        />
      </Grid>
    </Grid>
  )
}
