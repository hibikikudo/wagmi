import { Grid, Typography } from "@material-ui/core";

const HomePage = () => {
    return <>
        <Grid container justifyContent="center">
            <Grid item xs={8}>
                <Typography>
                New Single will be released soon ...
                </Typography>
                <Typography>
                30:12:03:35
                </Typography>
            </Grid>
        </Grid>
    </>;
};

export default HomePage;