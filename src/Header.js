import React from 'react';
import { AppBar, Toolbar, Box, Button, Typography, Grid } from '@material-ui/core';
const pages = ['Products', 'Pricing', 'Blog'];
const Header = () => {
    return <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <Grid container>
                <Grid item xs={2}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        wagmi
                    </Typography>
                </Grid>
                <Grid item xs={10} container justifyContent="flex-end">
                    <Grid item><Button color="inherit">Home</Button></Grid>
                    <Grid item><Button color="inherit">Mint</Button></Grid>
                    <Grid item><Button color="inherit">Twitter</Button></Grid>
                    <Grid item><Button color="inherit">Discord</Button></Grid>
                    <Grid item><Button color="inherit">Connect Wallet</Button></Grid>
                </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
    </Box>
    </>;
}
export default Header;