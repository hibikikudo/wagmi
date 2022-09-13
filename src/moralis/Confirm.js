import { Button, makeStyles, CircularProgress } from "@material-ui/core";
import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall, useChain } from "react-moralis";
import { useState, useEffect } from "react";
import styled from 'styled-components';
import Spacer from "../components/Spacer";
import { EstGasExtension } from "../moralis/SendButton";
import ExchangeButton from "./ExchangeButton";

const StyledCircularProgress = styled(CircularProgress)`
  color: #333;
  size: 10px;
`;

const useStyles = makeStyles({
  send: {
    height: 50, 
    width: 120, 
    color: 'white',
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor:'#7547D7',
    "&:hover": {
      background: "#4911BF"
    },
    // "&:active": {
    //   background: "aqua"
    // }
  },
  load: {
    height: 50, 
    width: 120, 
    backgroundColor:'#7547D7',
    color: 'white',
    borderRadius:5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

const Error = ({error, data}) => {
  const classes = useStyles();

  if(error){
    return <div>
    {error}
    </div>
  }
  if(data==="0"){
    return <div style={{color:'red', fontWeight:'bold'}}>
    It seems you have no token to execute!
    <Spacer height={20}/>
    </div>
  }
}

const ConfirmExchangeButton = ({tokenId, update}) => {

  const classes = useStyles();

  const [ Confirmed, setConfirmed ] = useState(false);

  const { native } = useMoralisWeb3Api();

  const { authenticate, isAuthenticated, account, chainId } = useMoralis();
  const { switchNetwork } = useChain();

  const options = {
    chain: chainId,
    address: "0x2953399124F0cBB46d2CbACD8A89cF0599974963",
    function_name: "balanceOf",
    abi: [{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],
    params: {
      // account: account,
      account: "0xF10F87D0885F846EEfdfeCD99d31e1EA21f8608F",
      id: tokenId
    }
  };

  const { fetch, data, error, isLoading, isFetching, setData } = useMoralisWeb3ApiCall(native.runContractFunction,{...options});

  useEffect(()=>{
    console.log("balance of token",data);
    if(data>=1){
      setConfirmed(true);
    }
  },[data])

  useEffect(() => {
    setConfirmed(false);
    setData(null);
  }, [update])

  const Confirm = async() => {
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

    if(chainId === "0x89" && account && isAuthenticated){
      // Fetch balanceOf
      fetch();
    }else{
      alert("The system will change your network to Polygon.");
      switchNetwork("0x89");
    }
  }

  if(isLoading||isFetching){
    return <div className={classes.load}>
      <StyledCircularProgress style={{width:25, height:25, color:'white'}}/>
    </div>
  }else{
    if(Confirmed){
      return <ExchangeButton/>;
    }else{
      return <div className={classes.columnCenter}>
        <Error error={error} data={data}/>
        <Button className={classes.send} onClick={Confirm}>Confirm</Button>
      </div>
    }
  }
}

const ConfirmButton = ({toETH, tokenId, update}) => {

  const classes = useStyles();

  const [ ToETH, setToETH ] = useState();
  const [ Confirmed, setConfirmed ] = useState(false);

  const { native } = useMoralisWeb3Api();

  const { authenticate, isAuthenticated, account, chainId } = useMoralis();
  const { switchNetwork } = useChain();

  const getContractAddress = () => {
    if(ToETH){
      // Polygon Contract
      return "0xb4fa9FEe7B4f359a4C805b27932bca017D78bfeb";
    }else{
      // Ethereum Contract
      return "0xC6891cB0CBC7D2d98F7e68c5ACd6549C64089f1C";
    }
  }

  const options = {
    chain: chainId,
    address: getContractAddress(),
    function_name: "balanceOf",
    abi: [{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],
    params: {
      account: account,
      // account: "0xF10F87D0885F846EEfdfeCD99d31e1EA21f8608F",
      id: tokenId
    }
  };

  const { fetch, data, error, isLoading, isFetching, setData } = useMoralisWeb3ApiCall(native.runContractFunction,{...options});

  useEffect(()=>{
    console.log("balance of token",data);
    if(data>=1){
      setConfirmed(true);
    }
  },[data])

  useEffect(() => {
    setConfirmed(false);
    setData(null);
    setToETH(toETH);
  }, [update, toETH])

  const Confirm = async() => {

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
    
    if(ToETH){
      if(chainId === "0x89" && account && isAuthenticated){
        // Fetch balanceOf
        fetch();
      }else{
        alert("The system will change your network to Polygon.");
        switchNetwork("0x89");
      }
    }else{
      if(chainId === "0x1" && account && isAuthenticated){
        // Fetch balanceOf
        fetch();
      }else{
        alert("The system will change your network to Ethereum.");
        switchNetwork("0x1");
      }
    }
  }

  if(isLoading||isFetching){
    return <div className={classes.load}>
      <StyledCircularProgress style={{width:25, height:25, color:'white'}}/>
    </div>
  }else{
    if(Confirmed){
      return <EstGasExtension address={getContractAddress()} tokenId={tokenId} toETH={ToETH}/>;
    }else{
      return <div className={classes.columnCenter}>
        <Error error={error} data={data}/>
        <Button className={classes.send} onClick={Confirm}>Confirm</Button>
      </div>
    }
  }
}

export {ConfirmButton, ConfirmExchangeButton}