import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Button } from "@material-ui/core";

const ConnectWalletButton = () => {
    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

    useEffect(() => {
    if (isAuthenticated) {
      // add your logic here
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const login = async () => {
    if (!isAuthenticated) {

      await authenticate({signingMessage: "Log in using Moralis" })
        .then(function (user) {
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
      {isAuthenticated ? 
      <Button onClick={logOut} disabled={isAuthenticating}>Logout</Button>
      : <Button onClick={login}>ConnectWallet</Button>}
    </div>
  );
};

export default ConnectWalletButton