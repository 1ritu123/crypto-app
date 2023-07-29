import { makeStyles } from "@material-ui/core";

export const useStyles=makeStyles((theme)=>({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      paper: {
        width: 400,
        backgroundColor: theme.palette.background.paper,
        color: "white",
        borderRadius: 10,
      },
      google: {
        padding: 24,
        paddingTop: 0,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        gap: 20,
        fontSize: 20,
      },

}))