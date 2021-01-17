import { observer } from "mobx-react"
import React from "react"
import DoneIcon from "@material-ui/icons/Done"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import { withStyles } from "@material-ui/core"

const StyledTableCell = withStyles((theme) => ({
  body: {
    fontSize: 14,
  },
}))(TableCell)

function Client(props) {
  const {id,first,last,country,email,sold,date,email_type,owner,handleClickOpen,setUser} = props

  const cells = [first,last,email,sold ? <DoneIcon /> : null,date,email_type,owner,country]

  const handleClick = () => {
    setUser({ id, first, last, country })
    handleClickOpen()
  }

  let co = 109
  return (
    <TableRow className="trow" onClick={handleClick}>
      {cells.map(c => <StyledTableCell key={c || co++} align="center">{c}</StyledTableCell>)}
    </TableRow>
  )
}

export default observer(Client)
