import { Grid, makeStyles } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import AddClient from "./AddClient";
import Update from "./Update";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "30vw",
      height: "8vh",
    },
  },
}));

function Actions(props) {
  const classes = useStyles();

  const { snackBarStore } = props;

  const validateInput = (i, output) => {
    if (i === "") {
      snackBarStore.alertFailure(output);
      return false;
    }
    return true;
  };

  return (
    <Grid container item xs={10}>
      <Grid item xs={6}>
        <AddClient clss={classes} validateInput={validateInput} />
      </Grid>
      <Grid item xs={6}>
        <Update clss={classes} validateInput={validateInput} />
      </Grid>
    </Grid>
  );
}

export default inject("snackBarStore")(observer(Actions));
