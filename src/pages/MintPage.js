import { Grid, Typography } from "@material-ui/core";
import  EventListener  from "../moralis/EventListener"
import MintButton from "../moralis/MintButton";
import Player from "../components/Player";

const MintPage = () => {
    return <div>
        <div style={{position: "absolute", left: 10, bottom: 10}}> 
            <Player />
        </div>
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
    </div>;
};

export default MintPage;