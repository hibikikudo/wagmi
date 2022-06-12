import { Grid, Typography } from "@material-ui/core";
import CountDown from "../components/CountDown";

const HomePage = () => {
    return <>
        <Grid container justifyContent="center">
            <Grid item xs={8}>
                <CountDown></CountDown>
            </Grid>
        </Grid>
    </>;
};

export default HomePage;