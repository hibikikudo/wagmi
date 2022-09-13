import useSound from "use-sound";
import { Button, Card, Grid, Hidden, makeStyles } from "@material-ui/core";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { getEllipsisTxt } from "../helpers/formatters";
import { MusicContext } from "../provider/MusicProvider";
import zIndex from "@material-ui/core/styles/zIndex";
import Spacer from "./Spacer";

const useStyles = makeStyles({
    card: {
        height: 60,
        width: "auto",
        borderRadius: 30,
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        zIndex:100,
    },
    circle: {
        maxWidth: 50,
        maxHeight: 60,
        minWidth: 50,
        minHeight: 60,
        borderRadius: 30,
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        zIndex:100,
    },
    playRecord: {
        width: 100,
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        transform: 'translateY(-10%)'
    },
    stopRecord: {
        width: 100,
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    transparentBlock: {
        width: '30%',
        height: 'auto',
        //backgroundColor: 'red'
    },
    icon: {
        fontSize: 20,
        color: 'white'
    },
    animationText: {
        marginRight:20,
        fontFamily:'Lato',
        fontWeight:'bold',
        overflow: 'hidden'
    },
    playingMusicDisc: {
        display: 'inline-block',
        whiteSpace: 'nowrap',
        animation: `$text_scroll 8s linear infinite`
    },
    notPlayingMusicDisc: {
        display: 'inline-block',
        whiteSpace: 'nowrap',
    },
    '@keyframes text_scroll': {
        '0%': { transform: 'translateX(100%)'},
        '100%': { transform: 'translateX(-100%)'}
    }
});

const MusicTitle = () => {
    const { musicPlaying, handleTitle } = useContext(MusicContext);
    const classes = useStyles();

    if(musicPlaying){
        return <div className={classes.playingMusicDisc}>
            {handleTitle(musicPlaying)}
        </div>
    }else{
        return <div className={classes.notPlayingMusicDisc}>
            {getEllipsisTxt(handleTitle(musicPlaying), 30, 0)}
        </div>
    }
}
const Player = ({sales}) => {
    const classes = useStyles();
    const { musicPlaying, onPlay, onStop } = useContext(MusicContext);
    if(sales==="0"||!sales){
        return<div></div>
    }
    if(musicPlaying){
        return <div>
        <Card raised className={classes.circle}>
            {/* <div className={classes.animationText}>
                <MusicTitle musicPlaying={musicPlaying}></MusicTitle>
            </div> */}
            <Button className={classes.circle} onClick={() => {
                if (musicPlaying) {
                    onStop();
                } else {
                    onPlay(1);
                }
            }}>
                <img width={60} height={60} src="/image/giphy.gif" /> 
            </Button>
        </Card>
        </div>;
    }else{
        return <div>
        <Card raised className={classes.card}>
            {/* <div className={musicPlaying ? classes.playRecord : classes.stopRecord} >
            {musicPlaying ? 
                <img width={60} height={60} src="/image/record_play.png" /> :
                <img width={60} height={60} src="/image/record_stop.png" />
            }
            </div>
            <div className={classes.transparentBlock}>
    
            </div> */}
            
            <Button className={classes.circle} onClick={() => {
                if (musicPlaying) {
                    onStop();
                } else {
                    onPlay(1);
                }
            }}>
                <FontAwesomeIcon className={classes.icon} icon={faPlay} />
            </Button>
            <div className={classes.animationText}>
                <MusicTitle musicPlaying={musicPlaying}></MusicTitle>
            </div>
        </Card>
        </div>;
    }
};

export default Player;