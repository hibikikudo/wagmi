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
    columnLeft: {
        width: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    countRow: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'
    },
    countCol: {
        width: 120,
        height: 140,
        margin: 5,
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
        fontSize: 60,
        margin: 5,
        fontFamily: 'Lato',

    },
    number: {
        fontSize: 80,
        color: '#030303',
        fontFamily: 'Lato',
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
    return <div>
            <div className={classes.rowCenter}>
                <div className={classes.countCol}>
                    <div  className={classes.number}>{days}</div>
                    <div  className={classes.unit}>days</div>
                </div>
                {/* <div className={classes.colon}>:</div> */}
                <div className={classes.countCol}>
                    <div className={classes.number}>{hours}</div>
                    <div className={classes.unit}>hours</div>
                </div>
                {/* <div className={classes.colon}>:</div> */}
                <div className={classes.countCol}>
                    <div className={classes.number}>{minutes}</div>
                    <div className={classes.unit}>minutes</div>
                </div>
                {/* <div className={classes.colon}>:</div> */}
                <div className={classes.countCol}>
                    <div  className={classes.number}>{seconds}</div>
                    <div  className={classes.unit}>seconds</div>
                </div>
            </div>
        </div>
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