import { Grid, makeStyles, Typography } from "@material-ui/core";
import Countdown from "react-countdown";

const Completionist = () => <span>You are good to go!</span>;
const useStyles = makeStyles({
    center: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    countRow: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'
    },
    countCol: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 30
    },
    number: {
        fontSize: 30
    },
    unit: {
        fontSize: 15
    }
});
const Time = ({days, hours, minutes, seconds}) => {
    const classes = useStyles();
    return <div>

        <Grid container >
            <Grid container item xs={11} className={classes.center}>
                <Typography style={{margin: 10}}>
                    New Single will be released soon
                </Typography>
            </Grid>
            <Grid container item xs={2} className={classes.countCol}>
                <Grid item className={classes.number}>{days}</Grid>
                <Grid item className={classes.unit}>days</Grid>
            </Grid>
            <Grid item xs={1} className={classes.countCol}>:</Grid>
            <Grid container item xs={2} className={classes.countCol}>
                <Grid item className={classes.number}>{hours}</Grid>
                <Grid  className={classes.unit}>hours</Grid>
            </Grid>
            <Grid item xs={1}  className={classes.countCol}>:</Grid>
            <Grid container item xs={2} className={classes.countCol}>
                <Grid item className={classes.number}>{minutes}</Grid>
                <Grid  className={classes.unit}>minutes</Grid>
            </Grid>
            <Grid item xs={1} className={classes.countCol}>:</Grid>
            <Grid container item xs={2} className={classes.countCol}>
                <Grid item className={classes.number}>{seconds}</Grid>
                <Grid  className={classes.unit}>seconds</Grid>
            </Grid>
        </Grid>
    </div>;
}
const renderer = ({ days, hours, minutes, seconds, completed }) => {

    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return <Time days={days} hours={hours} minutes={minutes} seconds={seconds} />;
    }
};

const CountDown = () => {
    return <div>
        <Countdown
            date={new Date('June 25, 2022 00:00:00')}
            renderer={renderer}
        >
        </Countdown>
    </div>
};

export default CountDown;