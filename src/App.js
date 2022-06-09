import { useEffect } from "react";
import { useMoralis } from "react-moralis";

import { ThemeProvider } from "@material-ui/core";
import Header from "./components/Header";
import Home from "./pages/HomePage";
import MyRoutes from "./components/Routes";
import theme from "./Theme";

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
      <div style={{ 
        backgroundSize: "50px 50px",
        backgroundImage: `url("https://storage.googleapis.com/studio-design-asset-files/projects/xmaZZplJaR/s-178x157_webp_e1ceac5a-b338-4a18-8f2c-fbf9490beb35.png")`,
        minHeight:'100vh'
        }}>
          <Header />
          <MyRoutes />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
