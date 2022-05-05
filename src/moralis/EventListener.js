// import { useMoralisQuery } from "react-moralis";
import { Button, Grid, makeStyles } from '@material-ui/core';
import contractAbi from "./abi.json" // add later
import { ethers } from "ethers";
import { Path } from '../components/Routes';
import { useEffect, useState } from 'react';
import { useMoralis } from "react-moralis";

// const contractAddress = process.env.CONTRACT_ADDRESS
const contractAddress = "0x64B4B8AD8AB87F988d0FE67c38aFE1acd61B9348"


const useStyles = makeStyles({
  icon: {
      fontSize: 25
  },
  logo: {
      fontSize: 40
  },
  customButton: {

  }
})

const EventListener = () => {
  const { isAuthenticated, account } = useMoralis();
  const [sales, setSeles] = useState();
  
  useEffect(() => {
    if(!window.ethereum) return null;
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(contractAddress, contractAbi, web3Provider);
    const sale_filter = contract.filters.NowOnSale(null);
    const fetch = async () => {
      const sale_event = await contract.queryFilter(sale_filter);
      setSeles(sale_event[sale_event.length-1].args[0])
    }
    fetch();
  });

  const classes = useStyles();

  if(sales && isAuthenticated && account){
    return(
      <Grid item>
          <Button 
              href={Path.mint}
              className={classes.customButton}
              >
            Mint
          </Button>
      </Grid>
    )
  }
};

export default EventListener