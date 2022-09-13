import { Button, Card, makeStyles } from "@material-ui/core";
import Header from "../components/Header";
import Spacer from "../components/Spacer";
import Collection from "../components/Collection";
import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { MoralisProvider } from 'react-moralis';

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

const useStyles = makeStyles({
  back: {
    backgroundColor: '#151515',
    minHeight: '100vh',
    minWidth: '100vw',
    zIndex: -1
  },
  appField: {
    width:"90vw",
  },
  columnCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position:'relative',
  },
  rowCenter: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  appBox: {
    width:"22vw",
    height: "28vw",
    margin: "1vw",
    backgroundColor:"#030303",
    borderRadius: "1vw",
  },
  appButton: {
    fontSize:16,
    width:"40%",
    color:"white",
    border:"solid",
    borderColor:"white",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    "&:hover": {
      background: "#5c5c5c"
    },
  },
  img: {
    width: "100%",
    borderTopRightRadius: "1vw",
    borderTopLeftRadius: "1vw",
  },
  fade: {
    bottom:0,
    width:"100%",
    height:"50%",
    background: "linear-gradient(to bottom, transparent, black)",
    position:'absolute',
  },
  frame: {
    borderTopRightRadius: "1vw",
    borderTopLeftRadius: "1vw",
    width:"22vw",
    height:"22vw",
    position:'relative',
  },
  description: {
    bottom:70,
    position:'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  aName: {
    fontSize:20,
  },
  aDesc: {
    // fontFamily:'Lato',
    fontSize:10,
  },
  rowLeft: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  display: {
    width:"50vw",
    fontSize:20,
    color:"#4A434D",
    textAlign: 'center'
  }
})
let tokenArray = [];
let luna = true;
let badmind = true;
let rtt = true;

const WagmiCollection = ({sales}) => {
  const classes = useStyles();
  const Web3Api = useMoralisWeb3Api();
  const [update,setUpdate]=useState(false)

  const { native } = useMoralisWeb3Api();
  const { isWeb3Enabled, enableWeb3, isAuthenticated, account, isWeb3EnableLoading, Moralis } =
    useMoralis();

  useEffect(() => {
  const connectorId = window.localStorage.getItem("connectorId");
  if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
    enableWeb3({ provider: connectorId });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  const fetchToken = async () => {
    // Luna Token
    const options = {
      chain: "0x1",
      address: account,
      token_address: "0xa86a7046800c57236B61d1587f4aBE9B38Ab6F5d",
    };
    const token = await Web3Api.account.getNFTsForContract(options);
    // console.log("token",token);
    // console.log("tokenUri",token.result[0].token_uri);
    setUpdate(update?false:true)
    token.result.forEach((res, i) => {
      tokenArray.push([res.token_id, res.amount, res.token_uri]);
      // console.log("umm",tokenArray);
      setUpdate(update?false:true)
    })
  }

  const fetchLunaToken = async () => {
    // Luna Token
    const options = {
      chain: "0x1",
      address: account,
      token_address: "0xd91A3ad7C4e093E1A934481cDC6755221E0c6ac4",
    };
    const token = await Web3Api.account.getNFTsForContract(options);
    // console.log("lunatoken",token);
    // console.log("lunatokenUri",token.result[0].token_uri);
    setUpdate(update?false:true)
    token.result.forEach((res, i) => {
      tokenArray.push([res.token_id, res.amount, res.token_uri]);
      // console.log("umm",tokenArray);
      setUpdate(update?false:true)
    })
  }

  const fetchLegacyToken = async () => {
    // RTT Token
    const options = {
      chain: "polygon",
      address: account,
      token_address: "0xb4fa9FEe7B4f359a4C805b27932bca017D78bfeb",
    };
    const token = await Web3Api.account.getNFTsForContract(options);
    // console.log("legacy",token);
    // console.log("legacyUri",token.result[0].token_uri);
    // setUpdate(update?false:true)
    token.result.forEach((res, i) => {
      tokenArray.push([res.token_id, res.amount, res.token_uri]);
      // console.log("umm",tokenArray);
      // setUpdate(update+1)
    })
  }

  useEffect(()=>{
    if(luna){
      fetchLunaToken();
      luna = false;
    }
    if(badmind){
      fetchToken();
      badmind = false;
    }
    if(rtt){
      fetchLegacyToken();
      rtt = false;
    }
  },[])

  // useEffect(()=>{
  //   fetchLegacyToken();
  // },[account])

  // useEffect(()=>{
  //   fetchLunaToken();
  // },[account])

  // useEffect(()=>{
  //   fetchToken();
  // },[account])

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  // useEffect(()=>{
  //   console.log("detect array",tokenArray.length)
  //   setUpdate(update+1)
  // },[tokenArray.length])

  // useEffect(()=>{
  //   console.log("update")
  // },[update])
  if(tokenArray.length){
    return <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
    <div className={classes.back}>
      <Header color="#030303" subColor="white" sales={sales}/>
      <Spacer height={150}></Spacer>
      <div>
        <div className={classes.columnCenter}>
          <div className={classes.appField}>
            <div className={classes.rowLeft}>
              {tokenArray.map((data, i) => <Collection key={i} data={data}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
    </MoralisProvider>;
  }else{
    return <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
    <div className={classes.back}>
      <Header color="#030303" subColor="white" sales={sales}/>
      <div>
        <div className={classes.columnCenter}>
        <Spacer height={"48vh"}></Spacer>
          <div className={classes.display}>
            There is no nft to display... purchase wagmi nft!
          </div>
        </div>
      </div>
    </div>
    </MoralisProvider>;
  }
}

export default WagmiCollection;