import useSound from "use-sound";
import { Button, Card, Grid, Hidden, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePause, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { getEllipsisTxt } from "../helpers/formatters";

const useStyles = makeStyles({
    card: {
        height: 70,
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

const MusicTitle = ({isPlaying}) => {
    const classes = useStyles();
    const title = "Hibikilla - Bad Mind - featuring xxx"

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
                    <MusicTitle isPlaying={isPlaying}></MusicTitle>
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