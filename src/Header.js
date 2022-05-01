import React from 'react';
import { AppBar, Toolbar, Box, Button, Typography, Grid, makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons';

const pages = ['Products', 'Pricing', 'Blog'];


const useStyles = makeStyles({
    icon: {
        fontSize: 25
    },
    logo: {
        fontSize: 40
    },
    customButton: {

    }
})
const Header = () => {
    const classes = useStyles();
    return <div style={{fontFamily: "Press Start 2P"}}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
            <Grid container>
                <Grid item xs={2}>
                <Button className={classes.logo}><Typography>wagmi</Typography></Button>
                </Grid>
                <Grid item xs={10} container spacing={1} justifyContent="flex-end">
                <Grid item><Button className={classes.customButton}><Typography>Home</Typography></Button></Grid>
                    <Grid item><Button className={classes.customButton}><Typography>Mint</Typography></Button></Grid>
                    <Grid item><Button color="inherit"><FontAwesomeIcon className={classes.icon} icon={faTwitter} /></Button></Grid>
                    <Grid item><Button color="inherit"><FontAwesomeIcon className={classes.icon} icon={faDiscord} /></Button></Grid>
                    <Grid item><Button className={classes.customButton}><Typography>ConnectWallet</Typography></Button></Grid>
                </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
    </Box>
    </div>;
}
export default Header;