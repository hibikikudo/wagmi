import { Grid, makeStyles, Typography } from "@material-ui/core";
import AboutUs from "../components/AboutUs";
import Tokenomics from "../moralis/Tokenomics";
import CountDown from "../components/CountDown";
import Header from "../components/Header";

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
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <CountDown></CountDown>
            </Grid>
        </Grid>
        <Grid container justifyContent="center">
            <AboutUs />
        </Grid>
        <Tokenomics></Tokenomics>
        </div>
    </>;
};

export default HomePage;