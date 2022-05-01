import { Grid } from "@material-ui/core";

const Home = () => {
    return <>
        <Grid container>
            <Grid item xs={2}>
                a
            </Grid>
            <Grid item xs={8}>
                b
            </Grid>
            <Grid item xs={2}>
                c
            </Grid>
        </Grid>
    </>;
};

export default Home;