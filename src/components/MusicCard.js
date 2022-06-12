import useSound from "use-sound";
import { Button, Card, Grid, Hidden, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePause, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import MintButton from "../moralis/MintButton";

const useStyles = makeStyles({
    card: {
        width: 600,
        height: 300,
        borderRadius: 20,
        backgroundColor: 'white',
        color: '#333',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        margin: 10,
        backgroundColor: 'red',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }
});
const MusicCard = ({artist = "hibikilla", title = "BAD MIND"}) => {
    const classes = useStyles();

    return <div>
            <Card raised className={classes.card}>
                <div className={classes.image}>
                    <img width={250} height={250} 
                    src="/image/bad_mind.png" />
                </div>
                <div>
                    <div>
                        <div>再生</div>
                        <div>
                            <div>{artist}</div>
                            <div>{title}</div>
                        </div>
                    </div>
                    <div>I acknowledge that I have read and understood our policy prior to buying</div>
                    <Button onClick={() => {

                    }}>
                        <FontAwesomeIcon className={classes.icon} icon={faCirclePlay} />
                    </Button>
                    <MintButton />
                </div>
            </Card>

    </div>;
};

export default MusicCard;