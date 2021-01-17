import { Grid, withStyles } from "@material-ui/core"
import { inject, observer } from "mobx-react"
import React, { useEffect, useState } from "react"
import Client from "./Client"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import ClientBar from "./ClientBar"
import AlertDialog from "./Dialog"

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#FF8C61",
    color: theme.palette.common.white,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

function Clients(props) {
  const { clientsStore } = props
  const [openD, setOpenD] = useState(false)
  const [userToUpdate, setUser] = useState({id: -1,first: "",last: "",country: ""})
  const [localClients, setLocalClients] = useState([])
  const [page, setPage] = useState(0)
  const [filter, setFilter] = useState("")
  const [filterBy, setFilterBy] = useState("")
  const rows = 20

  const handleClickOpen = () => setOpenD(true)
  const handleClose = () => setOpenD(false)
  const handleChangePage = (_, newPage) => setPage(newPage)
  const filterByHandler = (event) => setFilterBy(event.target.value)
  const filterHandler = (event) => {
    setPage(0)
    const { value } = event.target
    setFilter(value)
  }

  useEffect(() => {
    if (filterBy !== "")
      setLocalClients(
        clientsStore.clients.filter(
          c =>
            c[filterBy] &&
            c[filterBy]
              .toString()
              .toLocaleLowerCase()
              .match(filter.toLocaleLowerCase())
        )
      )
  }, [filter, filterBy])
  useEffect(() => setLocalClients(clientsStore.clients), [clientsStore.clients])

  const header = [
    "First",
    "Last",
    "Email",
    "Sold",
    "Date",
    "Email type",
    "Owner",
    "Country",
  ]

  const barProps = {
    filterHandler,
    handleChangePage,
    filterByHandler,
    localClients,
    page,
    filterBy,
  }
  const alertDialogProps = {
    open: openD,
    handleClose,
    userToUpdate,
  }
  const clientProps = {
    setUser,
    handleClickOpen,
  }

  return (
    <Grid container direction="row" justify="center">
      <ClientBar {...barProps} />
      <Grid item xs={10}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <StyledTableRow>
                {header.map((h) => (
                  <StyledTableCell key={h} align="center">
                    {h}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {localClients.slice(page * rows, (page + 1) * rows).map((c) => (
                <Client key={c.id} {...c} {...clientProps} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <AlertDialog {...alertDialogProps} />
    </Grid>
  )
}

export default inject("clientsStore")(observer(Clients))
