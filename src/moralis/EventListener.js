// import { useMoralisQuery } from "react-moralis";
import { Grid } from '@material-ui/core';
import contractAbi from "./abi.json" // add later
import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import { useMoralis } from "react-moralis";
import MintButton from "./MintButton";

// const contractAddress = process.env.CONTRACT_ADDRESS
const contractAddress = "0x64B4B8AD8AB87F988d0FE67c38aFE1acd61B9348";
let web3Provider, contract, sale_filter;

if(window.ethereum){
  web3Provider = new ethers.providers.Web3Provider(window.ethereum);
  contract = new ethers.Contract(contractAddress, contractAbi, web3Provider);
  sale_filter = contract.filters.NowOnSale(null);
}

const EventListener = () => {
  const { isAuthenticated, account } = useMoralis();
  const [sales, setSeles] = useState();
  
  useEffect(() => {
    const fetch = async () => {
      const sale_event = await contract.queryFilter(sale_filter);
      setSeles(sale_event[sale_event.length-1].args[0])
    }
    if(window.ethereum) fetch();
  });

  if(sales && isAuthenticated && account){
    return(
      <Grid item>
          <MintButton/>
      </Grid>
    )
  }else{
    return;
  }
};

export default EventListener