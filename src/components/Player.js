import useSound from "use-sound";
import { Button, Card, Grid, Hidden, makeStyles } from "@material-ui/core";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePause, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { getEllipsisTxt } from "../helpers/formatters";
import { MusicContext } from "../provider/MusicProvider";

const useStyles = makeStyles({
    card: {
        height: 70,
        width: 400,
        borderRadius: 10,
        backgroundColor: '#2F2C37',
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5
    },
    playRecord: {
        width: 120,
        height: 120,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        transform: 'translateY(-10%)'
    },
    stopRecord: {
        width: 120,
        height: 120,
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
        fontSize: 40,
        color: 'white'
    },
    animationText: {
        width:'50%',
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
    const { isPlaying, title } = useContext(MusicContext);
    const classes = useStyles();

    if(isPlaying){
        return <div className={classes.playingMusicDisc}>
            {title}
        </div>
    }else{
        return <div className={classes.notPlayingMusicDisc}>
            {getEllipsisTxt(title, 25, 0)}
        </div>
    }
}
const Player = () => {
    const classes = useStyles();
    const { isPlaying, onPlay, onStop } = useContext(MusicContext);

    return <div>
            <Card raised className={classes.card}>
                <div className={isPlaying ? classes.playRecord : classes.stopRecord} >
                {isPlaying ? 
                    <img width={120} height={120} src="/image/record_play.png" /> :
                    <img width={100} height={100} src="/image/record_stop.png" />
                }
                </div>
                <div className={classes.transparentBlock}>

                </div>
                <div className={classes.animationText}>
                    <MusicTitle isPlaying={isPlaying}></MusicTitle>
                </div>
                <Button onClick={() => {
                    if (isPlaying) {
                        onStop();
                    } else {
                        onPlay();
                    }
                }}>
                    {isPlaying ?
                        <FontAwesomeIcon className={classes.icon} icon={faCirclePause} /> : 
                        <FontAwesomeIcon className={classes.icon} icon={faCirclePlay} />
                    }
                </Button>
            </Card>

    </div>;
};

export default Player;