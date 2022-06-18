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
        //color: 'white',
        // "align-items":"center",
    },
    icon: {
        //color: 'white',
        width: 30,
        height: "auto",
        fontSize: 20,
    },
    logo: {
        marginTop: 20,
        fontSize: 20,
    },
    customButton: {
        //color: 'white'
        fontSize: 20,
        fontFamily: 'Lato',
        fontWeight: 'bold',
        "box-sizing": "border-box"
    },
    wallet: {
        margin: 100,
    },
    buttonMargin: {
        marginTop: 30,
        marginRight: 30,
        "box-sizing": "border-box"
    },
    iconMargin: {
        marginTop: 35,
        padding: 20,
        "box-sizing": "border-box"
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
                        height={60}
                        width={200}
                        src="/image/wagmi_logo_noshadow_350_350.png" alt="wagmi"
                        style={{objectFit: 'cover'}}
                        />
                </Button>
                </Grid>
                <Grid item xs={10} container spacing={1} justifyContent="flex-end">
                    <Grid item className={classes.buttonMargin}>
                        <Button 
                            href={Path.home}
                            className={classes.customButton}
                            style={{color: color}}
                            >
                          Home
                        </Button>
                    </Grid>
                    <Grid item className={classes.buttonMargin}>
                        <Button 
                            href={Path.mint}
                            className={classes.customButton}
                            style={{color: color}}
                            >
                          Mint
                        </Button>
                    </Grid>
                    <Grid item className={classes.iconMargin}>
                        <Button
                            href="https://twitter.com/hibikilla30"
                            target="_blank"
                            style={{color: color}}
                            >
                            <FontAwesomeIcon className={classes.icon} icon={faTwitter} />
                        </Button>
                    </Grid>
                    <Grid item className={classes.iconMargin}>
                        <Button
                            href="https://discord.gg/GP3hd48s"
                            target="_blank"
                            style={{color: color}}
                            >
                            <FontAwesomeIcon className={classes.icon} icon={faDiscord} />
                        </Button>
                    </Grid>
                    <Grid item>
                        <ConnectWalletButton color={color} className={classes.wallet}/>
                    </Grid>
                </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
    </Box>
    </div>;
}
export default Header;