import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { capitalizeFirstLetter } from "../../common/helper/string";
import { IFunction } from "../../common/interfaces/TableMuiModel";

interface SnackbarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  functionSB: IFunction;
}

export const SnackbarMUI: React.FC<SnackbarProps> = ({
  open,
  setOpen,
  functionSB,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ marginTop: "4rem", marginRight: "2rem" }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {`${capitalizeFirstLetter(functionSB)} user successfully`}
      </Alert>
    </Snackbar>
  );
};
