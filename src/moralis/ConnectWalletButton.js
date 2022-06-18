import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "../helpers/formatters";
import { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    height:50,
    width: 200,
    fontFamily: 'Lato',
    fontWeight:"bold",
    background: "#FFCF00",
    borderRadius: 0,
    boxShadow: '3px 3px 0.1px 0.1px rgba(0, 0, 0, .1)',
    //color: 'white'
    marginTop: 30,
    marginLeft: 20,
    fontSize: 20,
  }
});
const ConnectWalletButton = ({color = '#333'}) => {
    const classes = useStyles();
    const { authenticate, isAuthenticated, isAuthenticating, account, chainId, logout } = useMoralis();
    const [address, setAddress] = useState();

  useEffect(() => {
    if(chainId === "0x1" || chainId === "0x4" || chainId === null){
      console.log("chainId", chainId)
    }else{
      alert("Please connect metamask to Ethereum chain");
    }
    setAddress((isAuthenticated && account));
  }, [account, isAuthenticated, chainId]);

  const logIn = async () => {
    if (!isAuthenticated || !account) {

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
  }

  const logOut = async () => {
    await logout();
    console.log("logged out");
  }

  return (
    <div>
      {isAuthenticated && account ? 
      <Button
        style={{color: color}}
        className={classes.button}
        onClick={logOut}
        disabled={isAuthenticating}>
          {getEllipsisTxt(account, 4)}
        </Button>
      : <Button
        className={classes.button}
        style={{color: color}}
        onClick={logIn}>ConnectWallet</Button>}
    </div>
  );
};

export default ConnectWalletButton