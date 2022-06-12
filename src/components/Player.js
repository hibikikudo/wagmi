import useSound from "use-sound";
import { Button, Card, Grid, Hidden, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePause, faCirclePlay } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles({
    card: {
        width: 400,
        borderRadius: 10,
        backgroundColor: '#4A434D',
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
        width: 180,
        height: 50,
        //backgroundColor: 'red'
    },
    icon: {
        fontSize: 50,
        color: 'white'
    },
    animationText: {
        overflow: 'hidden'
    },
    playingMusicDisc: {
        display: 'inline-block',
        whiteSpace: 'nowrap',
        animation: `$text_scroll 5s linear infinite`
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
const Player = () => {
    const classes = useStyles();
    const [isPlaying, setIsPlaying] = useState(false);
    const [play, {stop, pause}] = useSound('/music/bad_mind.mp3');

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
                    <div className={isPlaying ? classes.playingMusicDisc : classes.notPlayingMusicDisc}>
                        Hibikilla ~ Bad Mind ~
                    </div>
                </div>
                <Button onClick={() => {
                    if (isPlaying) {
                        pause();
                        setIsPlaying(false);
                    } else {
                        play();
                        setIsPlaying(true);
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