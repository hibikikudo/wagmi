import React from 'react';
import { AppBar, Toolbar, Box, Button, Typography, Grid, makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons';
import ConnectWalletButton from '../moralis/ConnectWalletButton';
import { Path } from './Routes';

const useStyles = makeStyles({
    headerBar: {
        background: 'transparent',
        boxShadow: 'none',
        //color: 'white'
    },
    icon: {
        //color: 'white',
        fontSize: 25
    },
    logo: {
        fontSize: 40
    },
    customButton: {
        //color: 'white'
        fontFamily: 'Lato',
        fontWeight: 'bold'
    },
    header: {
        //position: 'absolute'
    }
});
const Header = ({color = '#333'}) => {
    const classes = useStyles();
    return <div className={classes.header}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={classes.headerBar}>
        <Toolbar>
            <Grid container>
                <Grid item xs={2}>
                <Button
                    href={Path.home}
                    className={classes.logo}
                    >
                    <img
                        height={30}
                        width={100}
                        src="/image/wagmi_logo_noshadow_350_350.png" alt="wagmi"
                        style={{objectFit: 'cover'}}
                        />
                </Button>
                </Grid>
                <Grid item xs={10} container spacing={1} justifyContent="flex-end">
                    <Grid item>
                        <Button 
                            href={Path.home}
                            className={classes.customButton}
                            style={{color: color}}
                            >
                          Home
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            href={Path.mint}
                            className={classes.customButton}
                            style={{color: color}}
                            >
                          Mint
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            href="https://twitter.com/hibikilla30"
                            target="_blank"
                            style={{color: color}}
                            >
                            <FontAwesomeIcon className={classes.icon} icon={faTwitter} />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            href="https://discord.gg/GP3hd48s"
                            target="_blank"
                            style={{color: color}}
                            >
                            <FontAwesomeIcon className={classes.icon} icon={faDiscord} />
                        </Button>
                    </Grid>
                    <Grid item>
                        <ConnectWalletButton color={color}/>
                    </Grid>
                </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
    </Box>
    </div>;
}
export default Header;