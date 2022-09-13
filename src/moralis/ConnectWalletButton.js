import { useEffect } from "react";
import { useMoralis, useChain } from "react-moralis";
import { getEllipsisTxt } from "../helpers/formatters";
import { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faWallet } from "@fortawesome/free-solid-svg-icons";
import Spacer from "../components/Spacer";

const useStyles = makeStyles({
  button: {
    height:40,
    width: 190,
    background: "#7547D7",
    borderRadius: 0,
    boxShadow: '3px 3px 0.1px 0.1px rgba(0, 0, 0, .1)',
    marginLeft: 20,
    marginRight: 5,
    fontSize: 14,
    display: 'flex',
    justifyContent: 'space-between',
    "&:hover": {
      background: "#4911BF"
    },
    margin: "4%",
  },
  icon: {
    color: "white",
    marginLeft: '5%',
    marginRight: '5%',
  },
  address: {
    marginTop: "4px",
    color: "white",
    // justifyContent: 'center',
    alignItems: 'center',
    width:130,
    display: 'flex',
  }
});
const ConnectWalletButton = () => {
    const classes = useStyles();
    const { authenticate, isAuthenticated, isAuthenticating, account, chainId, logout } = useMoralis();
    const { switchNetwork } = useChain();
    const [address, setAddress] = useState();

  useEffect(() => {
    if(chainId === "0x1" || chainId === "0x89" || chainId === "0x5" || chainId === null){
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
          <Spacer width={25}/>
          <div className={classes.address}>
            {getEllipsisTxt(account, 4, 4)}
          </div>
        </Button>
      : <Button
        className={classes.button}
        onClick={logIn}>
          <FontAwesomeIcon className={classes.icon} icon={faWallet} />
          <div className={classes.address}>
            Connect Wallet
          </div>
        </Button>}
    </div>
  );
};

const SimpleConnectWalletButton = ({width, height, fontSize, color}) => {
  const classes = useStyles();
  const { authenticate, isAuthenticated, isAuthenticating, account, chainId, logout } = useMoralis();
  const { switchNetwork } = useChain();
  const [address, setAddress] = useState();

useEffect(() => {
  if(chainId === "0x1" || chainId === "0x89" || chainId === "0x5" || chainId === null){
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
      onClick={logOut}
      style={{minWidth:width,maxWidth:width,minHeight:height,maxHeight:height}}
      disabled={isAuthenticating}>
        <Spacer width={25}/>
        <div className={classes.address} style={{width:width,fontSize:fontSize, color:color}}>
          {getEllipsisTxt(account, 4, 4)}
        </div>
      </Button>
    : <Button
      onClick={logIn}
      style={{minWidth:width,maxWidth:width,minHeight:height,maxHeight:height}}>
        <div className={classes.address} style={{width:width,fontSize:fontSize, color:color}}>
          Connect Wallet
        </div>
      </Button>}
  </div>
);
};

export {SimpleConnectWalletButton, ConnectWalletButton};