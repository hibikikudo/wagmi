import TokenDoughnuts from "../components/TokenDoughnuts"
import contractAbi from "./abi.json" // add later
import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import { useMoralis } from "react-moralis";
import React from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";

// const contractAddress = process.env.CONTRACT_ADDRESS
const contractAddress = "0xECc866f9D76ef66A92D3BDb61F558582b56Cdeb1";
let web3Provider, contract, sale_filter;
const supply = 48;

const options = {
  chain: "rinkeby",
  address: contractAddress,
  function_name: "tokenSupply",
  abi: [{"inputs":[],"name":"tokenSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],
  params: {}
};

if(window.ethereum){
  web3Provider = new ethers.providers.Web3Provider(window.ethereum);
  contract = new ethers.Contract(contractAddress, contractAbi, web3Provider);
  sale_filter = contract.filters.NowOnSale(null);
}

const Tokenomics = ({}) => {
  const { native } = useMoralisWeb3Api();
  const { isAuthenticated, account } = useMoralis();
  const [sales, setSeles] = useState();
  const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(native.runContractFunction,{...options});

  useEffect(() => {
    const fetchEvent = async () => {
      const sale_event = await contract.queryFilter(sale_filter);
      // console.log(sale_event);
      setSeles(sale_event[sale_event.length-1].args[0])
    }
    const fetchSupply = async () => {
      fetch();
      // console.log("TokenSupply", data)
    }
    if(window.ethereum) fetchEvent();
    fetchSupply();
  }, [data]);

  return <div>
    <TokenDoughnuts sales = {sales} supply={supply} minted={data}></TokenDoughnuts>
  </div>
}

export default Tokenomics;