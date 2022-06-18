import { div, makeStyles, Typography } from "@material-ui/core";
import Countdown from "react-countdown";

const Completionist = () => <span>You are good to go!</span>;
const useStyles = makeStyles({
    rowCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    columnCenter: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    countRow: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'
    },
    countCol: {
        width: 200,
        height: 200,
        margin: 20,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F2EBE4',
        boxShadow: 'inset 0px 2px 5px 0px rgba(0, 0, 0, 0.2)',
        borderRadius: "15%",
        fontSize: 30,
        color: '#F2EBE4',
    },
    colon: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 80,
        margin: 5,
        fontFamily: 'Lato',

    },
    number: {
        fontSize: 100,
        color: '#333',
        fontFamily: 'Lato',
        fontWeight: 700,
    },
    unit: {
        fontSize: 20,
        color: '#333',
        fontFamily: 'Lato',
        fontWeight: 'bold'
    }
});
const Time = ({days, hours, minutes, seconds}) => {
    const classes = useStyles();
    return <div style={{
        display: 'flex',
        aligns: 'center',
        flexDirection: 'column',
        minWidth: '100vw'}}>

        <div className={classes.columnCenter}>
            <div className={classes.columnCenter}>
                <Typography style={{fontSize: 40, marginBottom: 50}}>
                    New Single will be released soon . . .
                </Typography>
            </div>
            <div className={classes.rowCenter}>
                <div className={classes.countCol}>
                    <div  className={classes.number}>{days}</div>
                    <div  className={classes.unit}>days</div>
                </div>
                <div className={classes.colon}>:</div>
                <div className={classes.countCol}>
                    <div className={classes.number}>{hours}</div>
                    <div className={classes.unit}>hours</div>
                </div>
                <div className={classes.colon}>:</div>
                <div className={classes.countCol}>
                    <div className={classes.number}>{minutes}</div>
                    <div className={classes.unit}>minutes</div>
                </div>
                <div className={classes.colon}>:</div>
                <div className={classes.countCol}>
                    <div  className={classes.number}>{seconds}</div>
                    <div  className={classes.unit}>seconds</div>
                </div>
            </div>
        </div>
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