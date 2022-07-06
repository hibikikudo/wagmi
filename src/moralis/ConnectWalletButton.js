import { useEffect } from "react";
import { useMoralis, useChain } from "react-moralis";
import { getEllipsisTxt } from "../helpers/formatters";
import { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faWallet } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles({
  button: {
    height:45,
    width: 190,
    background: "#7547D7",
    borderRadius: 0,
    boxShadow: '3px 3px 0.1px 0.1px rgba(0, 0, 0, .1)',
    marginLeft: 20,
    fontSize: 14,
    display: 'flex',
    justifyContent:'flex-start',
    "&:hover": {
      background: "#4911BF"
    },
  },
  icon: {
    color: "white",
    marginLeft: '5%',
    marginRight: '5%',
  },
  address: {
    color: "white",
    width:130,
    display: 'flex',
    justifyContent:'center',
  }
});
const ConnectWalletButton = ({color = '#333'}) => {
    const classes = useStyles();
    const { authenticate, isAuthenticated, isAuthenticating, account, chainId, logout } = useMoralis();
    const { switchNetwork } = useChain();
    const [address, setAddress] = useState();

  useEffect(() => {
    if(chainId === "0x1" || chainId === "0x4" || chainId === "0x89" || chainId === null){
    }else{
      alert("The system will change your network to Ethereum");
      switchNetwork("0x1");
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