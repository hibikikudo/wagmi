import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { ThemeProvider } from "@material-ui/core";
import Header from "./components/Header";
import Home from "./pages/HomePage";
import MyRoutes from "./components/Routes";
import theme from "./Theme";
import { MusicProvider } from "./provider/MusicProvider";
import Player from "./components/Player";

const App = () => {

  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <MusicProvider>
          <div style={{position:'fixed', left: 10, bottom: 10, zIndex: 1}}> 
            <Player />
          </div>
          <MyRoutes />
        </MusicProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
