import React from 'react';
import { AppBar, Toolbar, Box, Button, Typography, Grid, makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTwitter} from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes, faWallet } from '@fortawesome/free-solid-svg-icons';
import { SimpleConnectWalletButton, ConnectWalletButton} from '../moralis/ConnectWalletButton';
import { Path } from './Routes';
import { useEffect, useState } from "react";
import Spacer from './Spacer';

const useStyles = makeStyles({
    headerBar: {
        position: 'fixed',
        background: 'transparent',
        boxShadow: 'none',
        //color: 'white',
        // backdropFilter: "blur(12px)"
    },
    headerBarOpen: {
        height: "100vh",
        position: 'fixed',
        background: 'transparent',
        boxShadow: 'none',
        //color: 'white',
        // backdropFilter: "blur(12px)"
    },
    icon: {
        width: 30,
        height: 20,
        fontSize: 20,
    },
    logo: {
        marginLeft: '10px',
        maxWidth: '100px',
        maxHeight: 'auto',
        minWidth: '100px',
        minHeight: 'auto',
    },
    customButton: {
        height: 40,
        width: "7vw",
        fontSize: 16,
        "box-sizing": "border-box"
    },
    customIcon: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.5)',
        color: "black",
        fontSize: 16,
        maxWidth: 'auto',
        maxHeight: 'auto',
        minWidth: 'auto',
        minHeight: 'auto',
    },
    buttonMargin: {
        margin: "2% 1% 2% 1%",
        "box-sizing": "border-box"
    },
    iconMargin: {
        margin: "1% 0.5% 1% 0.5%",
        "box-sizing": "border-box"
    },
    hederItem: {
        height:"100px",
        alignItems:"center",
        justifyContent: 'space-between'
    },
    bottons: {
        justifyContent: "flex-end",
        width: "70%",
        height:"60px",
        alignItems:"center",
        flexWrap:'wrap',
        display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'start',
        flexDirection: 'row',
    },
    rowCenter: {
        alignItems:"center",
        display: 'flex',
        flexDirection: 'row',
    },
    menu: {
        maxWidth: 'auto',
        maxHeight: 'auto',
        minWidth: 'auto',
        minHeight: 'auto',
    },
    bars: {
        color: "white",
        width: 40,
        height: 40,
    },
    bar: {
        width: "100%",
        height:1,
        backgroundColor: "#25222e",
    },
    menuField: {
        backgroundColor: 'rgba(40, 35, 51,0.8)',
        position: "fixed",
        width: "200vw",
        height: "120vh",
        backdropFilter: "blur(12px)"
        // "-webkit-backdrop-filter":"blur(12px)",
        // WebkitBackdropFilter:"blur(12px)",
        // backdropFilter: "blur(12px)"
    },
    menuItem: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        height: 60,
        color: "white",
        alignItems:"center",
        justifyContent: 'space-between',
        fontFamily: "Black",
        fontSize: 24,

    },
    columnCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
    },
    columnStart: {
        margin:"5vw",
        width: "90vw",
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'start',
        flexDirection: 'column',
    },
    rowStart: {
        // backgroundColor:"#2F2C37",
        // color:"white",
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap:'wrap'
    },
});
const Menu = ({open}) => {
    const classes = useStyles();
    return <div className={classes.menuField} 
    style={{
    transition: '0.4s',
    opacity: open ? 1 : 0,
    }}>
        <Spacer height={"10vh"}/>
        <div className={classes.columnStart}>
            <Button 
                href={Path.home}
                className={classes.menuItem}
                >
                Home
            </Button>
            <div className={classes.bar}/>
            <Button 
                href={Path.mint}
                className={classes.menuItem}
                >
                Mint
            </Button>
            <div className={classes.bar}/>
            <Button 
                href={Path.app}
                className={classes.menuItem}
                >
                App
            </Button>
            <div className={classes.bar}/>
            <Button 
                href={Path.app}
                className={classes.menuItem}
                >
                OpenSea
            </Button>
            <div className={classes.bar}/>
            <Button 
                href={Path.app}
                className={classes.menuItem}
                >
                Discord
            </Button>
            <div className={classes.bar}/>
            <Button 
                href={Path.app}
                className={classes.menuItem}
                >
                Twitter
            </Button>
            <div className={classes.bar}/>
        </div>
    </div>;
}

const Header = ({color, subColor, sales}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState();

    const handleMenu = () => {
        setOpen(open?false:true);
    }

    const onResize = () => {
        // console.log(window.innerWidth, window.innerWidth < 500);
        window.innerWidth < 1000
            ? setIsMobile(true)
            : setIsMobile(false)
        // console.log(isMobile);
    }

    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])
    return <div>
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className={classes.headerBar}>
        {open?
        <div className={classes.menuField} 
        style={{
        transition: '0.4s',
        opacity: open ? 1 : 0,
        }}>
        <Spacer height={"10vh"}/>
        <div className={classes.columnStart}>
            <div className={classes.menuItem}>
                <SimpleConnectWalletButton width={"80vw"} height={60} fontSize={26} color={"#7547D7"}/>
                <FontAwesomeIcon className={classes.icon} color={"#7547D7"} icon={faWallet} />
                <Spacer width={10}/>
            </div>
            <div className={classes.bar}/>
            <Button 
                href={Path.home}
                className={classes.menuItem}
                >
                Home
            </Button>
            <div className={classes.bar}/>
            <Button 
                href={Path.mint}
                className={classes.menuItem}
                >
                Mint
            </Button>
            <div className={classes.bar}/>
            <Button 
                href={Path.app}
                className={classes.menuItem}
                >
                App
            </Button>
            <div className={classes.bar}/>
            <Button 
                href="https://opensea.io/collection/wagmimusic"
                target="_blank"
                className={classes.menuItem}
                >
                OpenSea
            </Button>
            <div className={classes.bar}/>
            <Button 
                href="https://discord.com/invite/yGwTRWNssq"
                target="_blank"
                className={classes.menuItem}
                >
                Discord
                <FontAwesomeIcon className={classes.icon} icon={faDiscord} />
            </Button>
            <div className={classes.bar}/>
            <Button 
                href="https://twitter.com/hibikilla30"
                target="_blank"
                className={classes.menuItem}
                >
                Twitter
                <FontAwesomeIcon className={classes.icon} icon={faTwitter} />
            </Button>
            <div className={classes.bar}/>
        </div>
        </div>:
        <div></div>}
        <Toolbar>
            <Grid container className={classes.hederItem}>
                <Grid item xs={3}>
                <Button
                    href={Path.home}
                    className={classes.logo}
                    >
                    <img
                        width={"100px"}
                        src="/image/wagmi_logo_noshadow_350_350.png" alt="wagmi"
                        style={{objectFit: 'cover'}}
                        />
                </Button>
                </Grid>
                {isMobile?
                <div>
                    <Button
                        className={classes.menu}
                        onClick={handleMenu}
                        >
                        {open?<FontAwesomeIcon className={classes.bars} icon={faTimes} />:<FontAwesomeIcon className={classes.bars} icon={faBars} />}
                    </Button>
                    </div>:
                    <div className={classes.bottons}>
                    <Grid item className={classes.buttonMargin}>
                        <Button 
                            href={Path.home}
                            className={classes.customButton}
                            style={{backgroundColor: color, color: subColor}}
                            >
                            Home
                        </Button>
                    </Grid>
                    {sales==="1"||sales==="2"
                        ?<Grid item className={classes.buttonMargin}>
                        <Button 
                            href={Path.mint}
                            className={classes.customButton}
                            style={{backgroundColor: color, color: subColor}}
                            >
                            Mint
                        </Button>
                        </Grid>
                        :<div></div>
                    }
                    <Grid item className={classes.buttonMargin}>
                        <Button 
                            href={Path.app}
                            className={classes.customButton}
                            style={{backgroundColor: color, color: subColor}}
                            >
                            App
                        </Button>
                    </Grid>
                    <div className={classes.rowCenter}>
                    <Grid item className={classes.iconMargin}>
                        <Button 
                            href="https://opensea.io/collection/wagmimusic"
                            target="_blank"
                            className={classes.customIcon}
                            style={{color: subColor}}
                            >
                            OpenSea
                        </Button>
                    </Grid>
                    <Grid item className={classes.iconMargin}>
                        <Button
                            href="https://twitter.com/hibikilla30"
                            target="_blank"
                            className={classes.customIcon}
                            style={{color: subColor}}
                            >
                            <FontAwesomeIcon className={classes.icon} icon={faTwitter} />
                        </Button>
                    </Grid>
                    <Grid item className={classes.iconMargin}>
                        <Button
                            href="https://discord.com/invite/yGwTRWNssq"
                            target="_blank"
                            className={classes.customIcon}
                            style={{color: subColor}}
                            >
                            <FontAwesomeIcon className={classes.icon} icon={faDiscord} />
                        </Button>
                    </Grid>
                    <Grid item>
                        <ConnectWalletButton color={subColor}/>
                    </Grid>
                    </div>
                </div>}
            </Grid>
        </Toolbar>
        </AppBar>
    </Box>
    </div>;
  
}
export default Header;