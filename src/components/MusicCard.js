import useSound from "use-sound";
import { FormControlLabel, Button, Card, Checkbox, Grid, Hidden, makeStyles } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePause, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { WLMintButton, MintButton } from "../moralis/MintButton";
import Spacer from "./Spacer";
import { useMoralis, useMoralisQuery, useChain, useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import { MusicContext } from "../provider/MusicProvider";
import { MoralisProvider } from 'react-moralis';

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

const useStyles = makeStyles({
    card: {
        width: "60vw",
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
        flexWrap:'wrap'
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
        marginRight: 40,
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
    },
    price: {
        fontWeight: 'bold',
    },
    customButton: {
        height: "50%",
        width: "50%",
        fontSize: 20,
        fontFamily: 'Lato',
        fontWeight: 'bold',
        backgroundColor: '#7547D7',
        color: 'white',
        "box-sizing": "border-box",
        "&:hover": {
            background: "#4911BF"
          },
    },
});

const handleFee = (sale, id)=>{
    const toWei = 1000000000000000000;
    if(sale === "presale" || sale === 1){
      switch(id){
        case 1:
          return(0.005 * toWei)
        case 2:
          return(0.2 * toWei)
        case 3:
          return(0.01 * toWei)
        case 4:
          return(0.01 * toWei)
        default:
          return(0)
      }
    }else if(sale === "public sale" || sale === 2){
      switch(id){
        case 1:
          return(0.01 * toWei)
        case 2:
          return(0.4 * toWei)
        case 3:
          return(0.02 * toWei)
        case 4:
          return(0.02 * toWei)
        default:
          return(0)
      }
    }
  }

const MintButtons = ({tokenId, sales, checked, inStock}) => {
    const classes = useStyles();

    const [valid, setValid] = useState(false);

    const { authenticate, isAuthenticated, account, chainId } = useMoralis();
    const { switchNetwork } = useChain();
    
    const { data } = useMoralisQuery(
        "AllowList",
        (query) => query,
        []
    )

    useEffect(() => {
        if(data.length >= 1 && account && sales==="1"){
            let wlarray = data[data.length-1].attributes.allowlist;
            let wlarray_lc = wlarray.map(addr => addr.toLowerCase());
            if(wlarray_lc.includes(`${account.toLowerCase()}`)){
                console.log("You are whitelisted account");
                // console.log(wlarray_lc);
                // console.log(account.toLowerCase());
                setValid(true);
            }else{
                // console.log(wlarray_lc);
                // console.log(account.toLowerCase());
                console.log("You aren't whitelisted account");
            }
        }
    }, [data, account]);

    const handleError = async () => {
        if(!isAuthenticated || !account){
            alert("Please connect wallet!");
            await authenticate({signingMessage: "Log in using Moralis"})
            .then((user) => {
              console.log("logged in user:", user);
              if (user) {
                console.log(user.get("ethAddress"));
              } else {
                  console.log('no user');
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        if(chainId!=="0x1" && chainId!=="0x5"){
            alert("The system will change your network to Ethereum.");
            switchNetwork("0x1");
        }else{
            if(!checked){
                alert("You cannot mint because checkBox is not checked!")
            }else if(!valid && sales==="1"){
                alert("You cannot mint because you are not whitelisted!")
            }else if(!inStock){
                alert("NFTs are out of stock!")
            }else{
                alert("Something is wrong! Please contact WAGMI Music")
            }
        }
    }
    if((chainId==="0x1" || chainId==="0x5") && checked && inStock){
        /*
        *  sales == 0 => prepared
        *  sales == 1 => presale
        *  sales == 2 => pulicsale
        *  sales == 3 => suspended
        */
        switch(sales){
            case "0":
                return <Button className={classes.button} style={{backgroundColor: "#716E63"}} onClick={()=>{alert("mint sale has yet to start!", sales)}} >Mint</Button>
            case "1":
                if(valid && data){
                    return <div>
                    <WLMintButton data={data} tokenId={tokenId} fee={handleFee("presale", tokenId)}/>
                    </div>
                }else{
                    return <Button className={classes.button} style={{backgroundColor: "#716E63"}} onClick={handleError} >Mint</Button>
                }
            case "2":
                return <div>
                <MintButton tokenId={tokenId} fee={handleFee("public sale", tokenId)}/>
                </div>
            case "3":
                return <Button className={classes.button} style={{backgroundColor: "#716E63"}} onClick={()=>{alert("Mint sale is suspended!")}} >Mint</Button>
            default:
                return <Button className={classes.button} style={{backgroundColor: "#716E63"}} onClick={()=>{alert("mint sale has yet to start!", sales)}} >Mint</Button>
        }
    }else{
        return <Button className={classes.button} style={{backgroundColor: "#716E63"}} onClick={handleError} >Mint</Button>
    }
}

const MusicCard = ({artist = "hibikilla", title = "LUNA",id, baseId=0, inStock, sales}) => {
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const tokenId = baseId+id;
    // console.log("tokenId",tokenId)
    const option = {
        chain: "0x1",
        address: contractAddress,
        function_name: "sales",
        abi: [{"inputs":[{"internalType":"uint256","name":"para","type":"uint256"}],"name":"sales","outputs":[{"internalType":"enum WAGMIMusicToken1155.saletate","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}],
        params: {para:1}
      };

    const classes = useStyles();
    const { musicPlaying, onPlay, onStop } = useContext(MusicContext);

    const [checked, setChecked] = useState();
    // const [sales, setSales] = useState("2");

    const { account } = useMoralis();
    const { native } = useMoralisWeb3Api();
    // const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(native.runContractFunction,{...option});

    const handleChange = (e) => {
        setChecked(e.target.checked)
    }

    const handleSrc = (_id) => {
        return(`/image/luna${_id}.png`);
    }

    const handleOpensea = (id) => {
        return(`https://opensea.io/assets/ethereum/${contractAddress}/${id}`)
    }

    // useEffect(()=>{
    //     fetch();
    // }, [])

    // useEffect(() => {
    //     setSales(data);
    // }, [data])

    if(!inStock){
        return <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
                <Card raised className={classes.card}>
                <div className={classes.graffiti}>Sold Out!</div>
                    <div className={classes.image}>
                        <img className={classes.img}
                        src={handleSrc(id)}/>
                    </div>
                    <div className={classes.info}>
                        <div className={classes.base}>
                            <Button onClick={() => {
                                if (musicPlaying === id) {
                                    onStop(id);
                                } else {
                                    onPlay(id);
                                }
                            }}>
                                {musicPlaying === id ?
                                    <FontAwesomeIcon className={classes.icon} icon={faCirclePause} /> : 
                                    <FontAwesomeIcon className={classes.icon} icon={faCirclePlay} />
                                }
                            </Button>
                            <div className={classes.transparentBlock}></div>
                            <div>
                                <div style={{fontSize:24}}>{artist}</div>
                                <div style={{fontSize:28, fontWeight: 'bold'}}>{title}</div>
                            </div>
                        </div>
                        <Spacer height={10}/>
                        <div className={classes.price}>
                            - {handleFee(Number(sales), tokenId)/1000000000000000000} eth
                        </div>
                        <Spacer height={30}/>
                        <Button 
                            href={handleOpensea(tokenId)}
                            target="_blank"
                            className={classes.customButton}
                            >
                            Go OpenSea
                        </Button>
                    </div>
                </Card>
        </MoralisProvider>;
    }

    if(sales==="1" || sales==="2") {
        return <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
                <Card raised className={classes.card}>
                {/* <div className={classes.graffiti}>FreeMint !!</div> */}
                    <div className={classes.image}>
                        <img className={classes.img}
                        src={handleSrc(id)}/>
                    </div>
                    <div className={classes.info}>
                        <div className={classes.base}>
                            <Button onClick={() => {
                                if (musicPlaying === id) {
                                    onStop(id);
                                } else {
                                    onPlay(id);
                                }
                            }}>
                                {musicPlaying === id ?
                                    <FontAwesomeIcon className={classes.icon} icon={faCirclePause} /> : 
                                    <FontAwesomeIcon className={classes.icon} icon={faCirclePlay} />
                                }
                            </Button>
                            <div className={classes.transparentBlock}></div>
                            <div>
                                <div style={{fontSize:24}}>{artist}</div>
                                <div style={{fontSize:28, fontWeight: 'bold'}}>{title}</div>
                            </div>
                        </div>
                        <Spacer height={10}/>
                        <div className={classes.price}>
                            - {handleFee(Number(sales), tokenId)/1000000000000000000} eth
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
                        <MintButtons tokenId={tokenId} checked={checked} sales={sales} inStock={inStock}/>
                    </div>
                </Card>
        </MoralisProvider>;
    } else if (sales==="3") {
        return <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <Card raised className={classes.card}>
                <div className={classes.graffiti}>Completed!</div>
                    <div className={classes.image}>
                        <img className={classes.img}
                        src={handleSrc(id)}/>
                    </div>
                    <div className={classes.info}>
                        <div className={classes.base}>
                            <Button onClick={() => {
                                if (musicPlaying === id) {
                                    onStop(id);
                                } else {
                                    onPlay(id);
                                }
                            }}>
                                {musicPlaying === id ?
                                    <FontAwesomeIcon className={classes.icon} icon={faCirclePause} /> : 
                                    <FontAwesomeIcon className={classes.icon} icon={faCirclePlay} />
                                }
                            </Button>
                            <div className={classes.transparentBlock}></div>
                            <div>
                                <div style={{fontSize:24}}>{artist}</div>
                                <div style={{fontSize:28, fontWeight: 'bold'}}>{title}</div>
                            </div>
                        </div>
                        <Spacer height={10}/>
                        <div className={classes.price}>
                            - {handleFee(Number(sales), tokenId)/1000000000000000000} eth
                        </div>
                        <Spacer height={30}/>
                        <Button 
                            href={handleOpensea(tokenId)}
                            target="_blank"
                            className={classes.customButton}
                            >
                            Go OpenSea
                        </Button>
                    </div>
                </Card>
        </MoralisProvider>;
    }else{
        return <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}></MoralisProvider>
    }
};

export default MusicCard;