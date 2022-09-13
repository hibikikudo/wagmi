import { Button, makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useMoralis, useMoralisWeb3Api, useWeb3ExecuteFunction, useMoralisWeb3ApiCall } from "react-moralis";

const useStyles = makeStyles({
  exchange: {
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
})

const ExchangeButton = () => {
  const classes = useStyles()
  const { account } = useMoralis();

  const option = {

  };

  const { fetch, error } = useWeb3ExecuteFunction(option);

  useEffect(() => {
    if(error){
      if(error.message){
        alert(error.message)
      }else{
        alert(error)
      }
    }
  }, [error])

  return <Button className={classes.exchange} onClick={fetch}>Exchange</Button>
}

export default ExchangeButton;