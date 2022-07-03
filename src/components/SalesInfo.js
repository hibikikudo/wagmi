import { div, makeStyles, Typography, Button, Grid } from "@material-ui/core";
import Countdown from "react-countdown";
import { Path } from './Routes';

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
        margin: 10,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#030303',
        boxShadow: '0px 2px 5px 0px rgba(0, 0, 0, 0.8)',
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
        fontSize: 60,
        fontFamily: 'Lato',
    },
    unit: {
        fontSize: 20,
        fontFamily: 'Lato',
        fontWeight: 'bold'
    },
    description: {
        fontWeight:'bold',
        marginLeft:20,
    },
    buttonMargin: {
        margin: 10,
        "box-sizing": "border-box"
    },
    customButton: {
        height: 60,
        width: 200,
        fontSize: 24,
        fontFamily: 'Lato',
        fontWeight: 'bold',
        backgroundColor: '#4911BF',
        color: 'white',
        "box-sizing": "border-box",
        "&:hover": {
            background: "#4911BF"
          },
    },
    incite: {
        fontSize: 26,
        fontWeight:'bold',
        marginBottom:10,
    },
    columnCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      },
});
const Time = ({days, hours, minutes, seconds}) => {
    const classes = useStyles();
    return <div>
            <div className={classes.rowCenter}>
                <div className={classes.countCol}>
                    <div  className={classes.number}>{days}</div>
                    <div  className={classes.unit}>days</div>
                </div>
                <div className={classes.countCol}>
                    <div className={classes.number}>{hours}</div>
                    <div className={classes.unit}>hours</div>
                </div>
                <div className={classes.countCol}>
                    <div className={classes.number}>{minutes}</div>
                    <div className={classes.unit}>minutes</div>
                </div>
                <div className={classes.countCol}>
                    <div  className={classes.number}>{seconds}</div>
                    <div  className={classes.unit}>seconds</div>
                </div>
            </div>
        </div>
}
const renderer = ({ days, hours, minutes, seconds, completed }) => {
    return <Time days={days} hours={hours} minutes={minutes} seconds={seconds} />;
};

/*
*  sales == 0 => Presale
*  sales == 1 => PublicSale
*  sales == 2 => Suspended
*/
const SalesInfo = ({sales, supply}) => {
    const classes = useStyles();
    if(sales == null){
        return <div>
        <div className={classes.description}>
            New Single will be released soon . . . !!
        </div>
        <Countdown
            date={new Date('July 15, 2022 00:00:00')}
            renderer={renderer}
        >
        </Countdown>
        </div>;
    } else if(supply === true){
        return <div className={classes.columnCenter}>
        <div className={classes.incite}>
        Mint is now available !!
        </div>
        <Grid item className={classes.buttonMargin}>
            <Button 
                href={Path.mint}
                className={classes.customButton}
                >
                Go Mint Page
            </Button>
        </Grid>
        </div>;
    } else {
        return <div className={classes.columnCenter}>
        <div className={classes.incite}>
        Mint sale is finished !!
        </div>
        <Grid item className={classes.buttonMargin}>
            <Button 
                href="https://opensea.io/collection/wagmimusic"
                target="_blank"
                className={classes.customButton}
                >
                Go Opensea
            </Button>
        </Grid>
        </div>;
    };
};

export default SalesInfo;