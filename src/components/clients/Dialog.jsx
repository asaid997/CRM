import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Input, TextField, makeStyles } from "@material-ui/core";
import AC from "../AC";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
}));

function AlertDialog(props) {
  const classes = useStyles();

  const {
    open,
    handleClose,
    userToUpdate,
    clientsStore,
    snackBarStore,
    countrieStore,
  } = props;

  const [vals, setVals] = useState({});
  const [country, setCountry] = useState("");

  useEffect(() => {
    setVals({ first: userToUpdate.first, last: userToUpdate.last });
    setCountry(userToUpdate.country);
  }, [userToUpdate]);

  const save = async () => {
    const result = await clientsStore.cl_updateClient(
      userToUpdate.id,
      vals.first,
      vals.last,
      country
    );
    result
      ? snackBarStore.alertSuccess("Changed")
      : snackBarStore.alertFailure("Value wasnt changed due to an issue");
    handleClose();
  };

  const inputHandler = (event) => {
    const { value, name } = event.target;
    setVals({ ...vals, [name]: value });
  };
  const countryHandler = (_, val) => setCountry(val);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Update</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {Object.keys(vals).map((k) => (
              <div key={k}>
                <TextField
                  className={classes.root}
                  label={k}
                  margin="normal"
                  variant="outlined"
                  value={vals[k]}
                  name={k}
                  onChange={inputHandler}
                />
              </div>
            ))}
            <AC
              options={countrieStore.countries.map((c) => c.country)}
              label="country"
              holder={country}
              handler={countryHandler}
              clss={classes.root}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={save} color="primary" autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default inject(
  "clientsStore",
  "snackBarStore",
  "countrieStore"
)(observer(AlertDialog));
