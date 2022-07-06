import useSound from "use-sound";
import { FormControlLabel, Button, Card, Checkbox, Grid, Hidden, makeStyles } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePause, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import WLMintButton from "../moralis/MintButton";
import Spacer from "./Spacer";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { MusicContext } from "../provider/MusicProvider";
import keccak256 from "keccak256";
import { Buffer } from 'buffer';
import { MerkleTree } from 'merkletreejs'

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
        position:'relative',
    },
    image: {
        margin: 10,
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    img: {
        width: 300,
        height: 300,
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
    icon: {
        width: "auto",
        height: 80,
        color: "#030303"
    },
    transparentBlock: {
        width: '5%',
        height: 'auto',
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
    },
    button: {
        height: 50, 
        width: 120, 
        color: '#030303',
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: "#716E63"
      },
    graffiti: {
        fontFamily:'Rock Salt',
        fontSize:'38px',
        fontWeight:'bold',
        position: 'absolute',
        color: '#B01F1F',
        top: '8%',
        left: '3%',
        transform: 'rotate(-20deg)'
    }
});

const MintButtons = ({sales, checked}) => {
    const classes = useStyles();

    const [valid, setValid] = useState(false);

    const { account } = useMoralis();
    
    const { data } = useMoralisQuery(
        "AllowList",
        (query) => query,
        []
    )

    useEffect(() => {
        if(data.length >= 1){
            let wlarray = data[data.length-1].attributes.allowlist;
            let wlarray_lc = wlarray.map(addr => addr.toLowerCase());
            if(wlarray_lc.includes(`${account}`)){
                console.log("You are whitelisted account");
                setValid(true);
            }else{
                console.log("You aren't whitelisted account");
            }
        }
    }, [data]);

    if(checked && valid && data){
        /*
        *  sales == 0 => PreRelease
        *  sales == 1 => FreeMint
        *  sales == 2 => Suspended
        */
        switch(sales){
            case 0:
                return <Button className={classes.button} style={{backgroundColor: "#716E63"}} onClick={()=>{alert("mint sale has yet to start!", sales)}} >Mint</Button>
            case 1:
                return <div>
                <WLMintButton data={data}/>
                </div>
            case 2:
                return <Button className={classes.button} style={{backgroundColor: "#716E63"}} onClick={()=>{alert("Mint sale is suspended!")}} >Mint</Button>
            default:
                return <Button className={classes.button} style={{backgroundColor: "#716E63"}} onClick={()=>{alert("mint sale has yet to start!", sales)}} >Mint</Button>
        }
        // /*
        // *  sales == 0 => Presale
        // *  sales == 1 => PublicSale
        // *  sales == 2 => Suspended
        // */
        // switch(sales){
        //     case 0:
        //         return <div>
        //         <WLMintButton data={data}/>
        //         </div>
        //     case 1:
        //         return <div>
        //         <MintButton/>
        //         </div>
        //     case 2:
        //         return <Button className={classes.button} style={{backgroundColor: "#716E63"}} onClick={()=>{alert("Mint sale is suspended!")}} >Mint</Button>
        //     default:
        //         return <Button className={classes.button} style={{backgroundColor: "#716E63"}} onClick={()=>{alert("mint sale has yet to start!", sales)}} >Mint</Button>
        // }
    }else{
        return <Button className={classes.button} style={{backgroundColor: "#716E63"}} onClick={()=>{alert("You cannot mint because checkBox is not checked or you are not whitelisted!")}} >Mint</Button>
    }
}

const MusicCard = ({artist = "hibikilla", title = "BAD MIND", sales}) => {
    const classes = useStyles();
    const { isPlaying, onPlay, onStop } = useContext(MusicContext);

    const [checked, setChecked] = useState();

    const handleChange = (e) => {
        setChecked(e.target.checked)
    }

    return <div>
            <Card raised className={classes.card}>
            <div className={classes.graffiti}>FreeMint !!</div>
                <div className={classes.image}>
                    <img className={classes.img}
                    src="/image/bad_mind.png"/>
                </div>
                <div className={classes.info}>
                    <div className={classes.base}>
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
                            color="secondary"
                            onChange={handleChange}
                        />
                        <div className={classes.formContent}>I acknowledge that I have read and understood our policy prior to buying.</div>
                    </div>
                    <Spacer height={20}/>
                    <MintButtons checked={checked} sales={sales}/>
                </div>
            </Card>

    </div>;
};

export default MusicCard;