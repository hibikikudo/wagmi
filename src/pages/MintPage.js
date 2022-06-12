import { Grid, makeStyles, Typography } from "@material-ui/core";
import  EventListener  from "../moralis/EventListener"
import MintButton from "../moralis/MintButton";
import Player from "../components/Player";
import Header from "../components/Header";

const useStyles = makeStyles({
    pageClass: {
        color: 'white'
    },
    columnCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    back: {
        backgroundSize: "600px 600px",
        backgroundImage: 'url("/image/38.gif")',//`url("https://storage.googleapis.com/studio-design-asset-files/projects/xmaZZplJaR/s-178x157_webp_e1ceac5a-b338-4a18-8f2c-fbf9490beb35.png")`,
        minHeight:'100vh',
        minWidth: '100vw',
        position: 'absolute',
        zIndex: -1
    }
})
const MintPage = () => {
    const classes = useStyles();
    return <div>
        <div className={classes.back}/>
        <Header color="white"/>
        <div className={classes.columnCenter}>
            <div style={{position: "absolute", left: 10, bottom: 10}}> 
                <Player />
            </div>
            <div className={classes.pageClass}>
                <Typography>
                This is Mint Page
                </Typography>
                <Grid item>
                    <EventListener/>
                </Grid>
            </div>
        </div>
    </div>;
};

export default MintPage;