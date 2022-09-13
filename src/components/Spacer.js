import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  spacer: {
    width: "auto"
  }
});

const Spacer = ({height, width}) => {
  const classes = useStyles();
  return <div className={classes.spacer} style={{height: height, width:width}}></div>
}

export default Spacer;