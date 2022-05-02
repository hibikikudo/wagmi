import { Grid, Typography } from "@material-ui/core";
import  EventListener  from "../moralis/EventListener"
import  ConnectWalletButton  from "../moralis/ConnectWalletButton"

const MintPage = () => {
    return <>
        <Grid container justifyContent="center">
            <Grid item xs={8}>
                <Typography>
                This is Mint Page
                </Typography>
                <Grid item>
                    <EventListener/>
                </Grid>
                <Grid item>
                    <ConnectWalletButton />
                </Grid>
            </Grid>
        </Grid>
    </>;
};

export default MintPage;