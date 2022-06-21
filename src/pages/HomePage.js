import { Grid, makeStyles, Typography } from "@material-ui/core";
import AboutUs from "../components/AboutUs";
import Tokenomics from "../moralis/Tokenomics";
import CountDown from "../components/CountDown";
import Header from "../components/Header";
import Spacer from "../components/Spacer";

const useStyles = makeStyles({
    back: {
        backgroundColor: '#FFFAF3',
        minHeight: '200vh',
        minWidth: '100vw',
        position: 'absolute',
        zIndex: -1
    },
    image: {
        margin: 10
    },
    img: {
        width: 340,
        height: 340,
        borderRadius: "8%",
    },
    columnCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    rowCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    margin: {
        margin: 50
    },
    icon: {
        width:30,
        height:30,
        borderRadius:"50%",
        marginRight:10
    },
    artist: {
        fontSize: 20,
        fontFamily:'Lato',
        fontWeight:'bold',
    },
    title: {
        fontSize: 50,
        // fontFamily:'Lato',
        fontWeight:'bold',
        marginLeft:20,
        // height:80,
    },
    row: {
        height:'auto',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    }
})
const HomePage = () => {
    const classes = useStyles();
    return <>
        <div className={classes.back}>
        <Header color="#030303" subColor="white"/>
        <Spacer height={180}/>
        <div className={classes.columnCenter}>
            <Typography style={{fontSize: 40, marginBottom: 10}}>
                New Single will be released soon . . . !!
            </Typography>
            <div container className={classes.rowCenter}>
                <div className={classes.margin}>
                    <img className={classes.img}
                    src="/image/bad_mind.png"/>
                </div>
                <div>
                    <div className={classes.row}>
                        <img className={classes.icon}
                        src="/image/hibikilla_icon.png"/>
                        <div className={classes.artist}>
                            hibikilla
                        </div>
                    </div>
                    <div className={classes.title}>
                            bad mind
                    </div>
                    <Grid item xs={12}>
                        <CountDown></CountDown>
                    </Grid>
                </div>
            </div>
        </div>
        <Spacer height={100}/>
        <Tokenomics></Tokenomics>
        <Spacer height={20}/>
        <Grid container justifyContent="center">
            <AboutUs />
        </Grid>
        <Spacer height={100}/>
        </div>
    </>;
};

export default HomePage;