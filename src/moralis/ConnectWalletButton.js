import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "../helpers/formatters";
import { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faWallet } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles({
  button: {
    height:40,
    width: 180,
    background: "#FFCF00",
    borderRadius: 0,
    boxShadow: '3px 3px 0.1px 0.1px rgba(0, 0, 0, .1)',
    marginLeft: 20,
    fontSize: 12,
    display: 'flex',
    justifyContent:'flex-start',
    "&:hover": {
      background: "#B58B07"
    },
  },
  icon: {
    color: "#C89B0E",
    marginLeft: '5%',
    marginRight: '5%',
  },
  address: {
    color: "#333",
    width:120,
    display: 'flex',
    justifyContent:'center',
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
        className={classes.button}
        onClick={logOut}
        disabled={isAuthenticating}>
          <FontAwesomeIcon className={classes.icon} icon={faWallet} />
          <div className={classes.transparentBlock}></div>
          <div className={classes.address}>
            {getEllipsisTxt(account, 4, 4)}
          </div>
        </Button>
      : <Button
        className={classes.button}
        onClick={logIn}>
          <FontAwesomeIcon className={classes.icon} icon={faWallet} />
          <div className={classes.address}>
            ConnectWallet
          </div>
        </Button>}
    </div>
  );
};

export default ConnectWalletButton