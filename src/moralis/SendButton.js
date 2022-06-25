import { Button, makeStyles, CircularProgress } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { getChainById, networkConfigs } from "../helpers/networks";

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

const SendButton = ({address, tokenId = 1, toETH}) => {
  const classes = useStyles()

  const { account } = useMoralis();

  const getChainId = () => {
    if(toETH){
      return 1;
    }else{
      return 9;
    }
  }
  console.log(address);
  console.log(tokenId);
  console.log(account)

  const options = {
    contractAddress: "0xb4fa9FEe7B4f359a4C805b27932bca017D78bfeb",
    functionName:"sendFrom",
    abi:[{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint16","name":"_dstChainId","type":"uint16"},{"internalType":"bytes","name":"_toAddress","type":"bytes"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address payable","name":"_refundAddress","type":"address"},{"internalType":"address","name":"_zroPaymentAddress","type":"address"},{"internalType":"bytes","name":"_adapterParams","type":"bytes"}],"name":"sendFrom","outputs":[],"stateMutability":"payable","type":"function"}],
    params:{
      _from:account,
      _dstChainId:getChainId(),
      _toAddress:account,
      _tokenId:tokenId,
      _amount:1,
      _refundAddress:account,
      _zroPaymentAddress:"0x0000000000000000000000000000000000000000",
      _adapterParams:"0x00010000000000000000000000000000000000000000000000000000000000030d40"
    },
    msgValue: "10000000000000000000000000000"
  };

  const { fetch, error } = useWeb3ExecuteFunction(options);

  if(error){
    alert(error)
  }

  return<div>
    <Button className={classes.send} onClick={fetch}>Send</Button>
  </div>
}

export default SendButton;