import { Grid, makeStyles, Typography } from "@material-ui/core";
import AboutUs from "../components/AboutUs";
import Tokenomics from "../moralis/Tokenomics";
import CountDown from "../components/CountDown";
import Header from "../components/Header";
import Spacer from "../components/Spacer";

const useStyles = makeStyles({
    back: {
        backgroundColor: '#FFFAF3',
        minHeight: '100vh',
        minWidth: '100vw',
        // position: 'absolute',
        zIndex: -1
    }
})
const HomePage = () => {
    const classes = useStyles();
    return <>
        <div className={classes.back}>
        <Header color="#333"/>
        <Spacer height={100}/>
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <CountDown></CountDown>
            </Grid>
        </Grid>
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