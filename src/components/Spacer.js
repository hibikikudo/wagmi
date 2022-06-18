import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  spacer: {
    width: "auto"
  }
});

const Spacer = ({height}) => {
  const classes = useStyles();
  return <div className={classes.spacer} style={{height: height}}></div>
}

export default Spacer;