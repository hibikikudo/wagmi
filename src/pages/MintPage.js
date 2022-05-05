import { Grid, Typography } from "@material-ui/core";
import  EventListener  from "../moralis/EventListener"
import MintButton from "../moralis/MintButton";

const MintPage = () => {
    if(window.etherum){
        return <>
        <Grid container justifyContent="center">
            <Grid item xs={8}>
                <Typography>
                This is Mint Page
                </Typography>
                <Grid item>
                    <EventListener/>
                </Grid>
            </Grid>
        </Grid>
    </>;
    }else{
        return <>
        <Grid container justifyContent="center">
            <Grid item xs={8}>
                <Typography>
                This is Mint Page
                </Typography>
                <Grid item>
                </Grid>
            </Grid>
        </Grid>
    </>;
    }
};

export default MintPage;