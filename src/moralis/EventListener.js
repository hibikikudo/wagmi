// import { useMoralisQuery } from "react-moralis";
import { Grid } from '@material-ui/core';
import contractAbi from "./abi.json" // add later
import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import { useMoralis } from "react-moralis";
import MintButton from "./MintButton";
import MusicCard from '../components/MusicCard';

// const contractAddress = process.env.CONTRACT_ADDRESS
const contractAddress = "0xECc866f9D76ef66A92D3BDb61F558582b56Cdeb1";
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
  console.log("isAuth",isAuthenticated);
  console.log("account",account);
  console.log("event",sales);

  /*
  *  sales == 0 => Presale
  *  sales == 1 => PublicSale
  *  sales == 2 => Suspended
  */
  if(sales === 2 && isAuthenticated && account){
    return <div>
      <MusicCard />
    </div>;
  }else{
    return <div>
      <MusicCard />
    </div>;
  }
};

export default EventListener