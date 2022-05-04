// import { useMoralisQuery } from "react-moralis";
import { Button, Grid, makeStyles } from '@material-ui/core';
import { contractAbi } from "abi.js" // add later
import { ethers } from "ethers";
import { Path } from './Routes';
const contractAddress = process.env.CONTRACT_ADDRESS

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
  const classes = useStyles();
  // const { fetch } = useMoralisQuery(
  //   "NowOnSale",(query) => query,
  //   [],
  //   { autoFetch: false }
  // );
  // const { data } = useMoralisQuery("NowOnSale", (query) => query, [], {
  //   live: true,
  // });

  // const basicQuery = async () => {
  //   const results = await fetch();
  //   alert("Successfully retrieved " + results.length + " transfers.");
  // };

  const web3Provider = new ethers.providers.Web3Provider(window.ethereum)

  const contract = new ethers.Contract(contractAddress, contractAbi, web3Provider);
  contract.on("NowOnSale", (state) => {
    if(state){
      console.log("Sales is Started now")
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
    }else{
      console.log("Sales is Supended now")
    }
  })
};

export default EventListener