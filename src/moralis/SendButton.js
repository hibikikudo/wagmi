import { Button, makeStyles, CircularProgress } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useMoralis, useMoralisWeb3Api, useWeb3ExecuteFunction, useMoralisWeb3ApiCall } from "react-moralis";
import { getChainById, networkConfigs } from "../helpers/networks";
import Spacer from "../components/Spacer";

const useStyles = makeStyles({
  send: {
    height: 50, 
    width: 120, 
    color: '#030303',
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor:'#F4BF1A',
    "&:hover": {
      background: "#B58B07"
    },
    // "&:active": {
    //   background: "aqua"
    // }
  },
});

const getChainId = (toETH) => {
  if(toETH){
    return 1;
  }else{
    return 9;
  }
}

const EstGasExtension = ({address, tokenId, toETH}) => {
  const { native } = useMoralisWeb3Api();
  const { account, chainId } = useMoralis();

  const options = {
    chain: chainId,
    address: address,
    function_name: "estimateSendFee",
    abi: [{"inputs":[{"internalType":"uint16","name":"_dstChainId","type":"uint16"},{"internalType":"bytes","name":"_toAddress","type":"bytes"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bool","name":"_useZro","type":"bool"},{"internalType":"bytes","name":"_adapterParams","type":"bytes"}],"name":"estimateSendFee","outputs":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"zroFee","type":"uint256"}],"stateMutability":"view","type":"function"}],
    params: {
      _dstChainId:getChainId(toETH),
      _toAddress: account,
      // _toAddress: "0xaDAcbA4Cae9471C26D613F7A94014549a647783C",
      _tokenId:tokenId,
      _amount:1,
      _useZro:"false",
      _adapterParams:"0x00010000000000000000000000000000000000000000000000000000000000030d40",
    }
  };

  const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(native.runContractFunction,{...options});

  useEffect(() => {
    fetch();
  }, [toETH]);
  useEffect(() => {
    // console.log("estimateFee",data ?data[0] :null);
  }, [data]);
  return<div>
    <SendButton address={address} tokenId={tokenId} toETH={toETH} fee={data ?data[0] :0}/>
  </div>
}

const SendButton = ({address, tokenId, toETH, fee}) => {
  const classes = useStyles()

  const { account } = useMoralis();

  const options = {
    contractAddress: address,
    functionName:"sendFrom",
    abi:[{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint16","name":"_dstChainId","type":"uint16"},{"internalType":"bytes","name":"_toAddress","type":"bytes"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address payable","name":"_refundAddress","type":"address"},{"internalType":"address","name":"_zroPaymentAddress","type":"address"},{"internalType":"bytes","name":"_adapterParams","type":"bytes"}],"name":"sendFrom","outputs":[],"stateMutability":"payable","type":"function"}],
    params:{
      _from:account,
      _dstChainId:getChainId(toETH),
      _toAddress:account,
      _tokenId:tokenId,
      _amount:1,
      _refundAddress:account,
      _zroPaymentAddress:"0x0000000000000000000000000000000000000000",
      _adapterParams:"0x00010000000000000000000000000000000000000000000000000000000000030d40"
    },
    msgValue: fee
  };

  const { fetch, error } = useWeb3ExecuteFunction(options);

  useEffect(() => {
    if(error){
      if(error.message){
        alert(error.message)
      }else{
        alert(error)
      }
    }
  }, [error])

  return<div>
    <Button className={classes.send} onClick={fetch}>Send</Button>
  </div>
}

export {SendButton, EstGasExtension};