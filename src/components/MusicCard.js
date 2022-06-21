import useSound from "use-sound";
import { FormControlLabel, Button, Card, Checkbox, Grid, Hidden, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePause, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import MintButton from "../moralis/MintButton";
import Spacer from "./Spacer";

const useStyles = makeStyles({
    card: {
        width: "auto",
        height: "auto",
        padding: 60,
        borderRadius: 20,
        backgroundColor: '#FFFAF3',
        color: '#030303',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily:'Lato',
    },
    image: {
        margin: 10,
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    img: {
        width: 250,
        height: 250,
        borderRadius: "8%",
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "3%",
        marginBottom: "3%",
    },
    // columnCenter: {
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     flexDirection: 'column',
    // },
    icon: {
        width: "auto",
        height: 80,
        color: "#030303"
    },
    transparentBlock: {
        width: '5%',
        height: 'auto',
        //backgroundColor: 'red'
    },
    formContent: {
        fontSize: 14,
        width: 250
    },
    info: {
        marginLeft: 40,
        width: 350,
        height: "auto",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    base: {
        width: 320,
        height: "auto",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    invalid: {
        height: 50, 
        width: 120, 
        color: '#030303',
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: 20
    }
});

const MintButtons = ({valid}) => {
    const classes = useStyles();
    if(valid){
        return <div>
            <MintButton/>
        </div>
    }else{
        return <div className={classes.invalid}>
            Mint
        </div>
    }
    
}

const MusicCard = ({artist = "hibikilla", title = "BAD MIND", valid}) => {
    const classes = useStyles();

    const [checked, setChecked] = useState();

    const handleChange = (e) => {
        setChecked(e.target.checked)
    }

    return <div>
            <Card raised className={classes.card}>
                <div className={classes.image}>
                    <img className={classes.img}
                    src="/image/bad_mind.png"/>
                </div>
                <div className={classes.info}>
                    <div className={classes.base}>
                        <Button onClick={() => {}}>
                            <FontAwesomeIcon className={classes.icon} icon={faCirclePlay} />
                        </Button>
                        <div className={classes.transparentBlock}></div>
                        <div>
                            <div style={{fontSize:24}}>{artist}</div>
                            <div style={{fontSize:36, fontWeight: 'bold'}}>{title}</div>
                        </div>
                    </div>
                    <Spacer height={10}/>
                    <div className={classes.form}>
                        <Checkbox 
                            defaultChecked={false}
                            color="info"
                            onChange={handleChange}
                        />
                        <div className={classes.formContent}>I acknowledge that I have read and understood our policy prior to buying.</div>
                    </div>
                    <Spacer height={20}/>
                    <MintButtons />
                </div>
            </Card>

    </div>;
};

export default MusicCard;