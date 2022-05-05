import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "../helpers/formatters";
import { useState } from "react";
import { Button } from "@material-ui/core";

const ConnectWalletButton = () => {
    const { authenticate, isAuthenticated, isAuthenticating, account, logout } = useMoralis();
    const [address, setAddress] = useState();

  useEffect(() => {
    setAddress((isAuthenticated && account));
  }, [account, isAuthenticated]);

  const login = async () => {
    if (!isAuthenticated || !account) {

      await authenticate({signingMessage: "Log in using Moralis" })
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
      <Button onClick={logOut} disabled={isAuthenticating}>{getEllipsisTxt(account, 3)}</Button>
      : <Button onClick={login}>ConnectWallet</Button>}
    </div>
  );
};

export default ConnectWalletButton