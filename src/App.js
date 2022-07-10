import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { ThemeProvider } from "@material-ui/core";
import MyRoutes from "./components/Routes";
import theme from "./Theme";
import { MusicProvider } from "./provider/MusicProvider";
import Player from "./components/Player";
import { ethers } from "ethers";
import contractAbi from "./moralis/abi.json";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const maxSupply = process.env.REACT_APP_MAX_SUPPLY;

const options = {
  chain: "0x1",
  address: contractAddress,
  function_name: "tokenSupply",
  abi: [{"inputs":[],"name":"tokenSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],
  params: {}
};

let web3Provider, contract, sale_filter;
if(window.ethereum){
  web3Provider = new ethers.providers.Web3Provider(window.ethereum);
  contract = new ethers.Contract(contractAddress, contractAbi, web3Provider);
  sale_filter = contract.filters.NowOnSale(null);
}

const App = () => {
  const { native } = useMoralisWeb3Api();
  const { isWeb3Enabled, enableWeb3, isAuthenticated, account, isWeb3EnableLoading } =
    useMoralis();

  /*
  *  sales == 0 => PreRelease
  *  sales == 1 => FreeMint
  *  sales == 2 => Suspended
  */
  const [sales, setSeles] = useState();
  const [supply, setSupply] = useState(true);
  const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(native.runContractFunction,{...options});

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  useEffect(() => {
    const fetchEvent = async () => {
    const sale_event = await contract.queryFilter(sale_filter);
    setSeles(sale_event[sale_event.length-1].args[0])
    }
    const fetchSupply = async () => {
    fetch();
    }
    if(window.ethereum) fetchEvent();
    fetchSupply();
  }, [account]);

  useEffect(() => {
    if(data===`${maxSupply}`){
        setSupply(false);
        console.log("Token Supply reached max amount");
    }
  }, [data])

  return (
    <>
      <ThemeProvider theme={theme}>
        <MusicProvider>
          <div style={{position:'fixed', left: 30, bottom: 25, zIndex: 1}}> 
            <Player />
          </div>
          <MyRoutes sales={sales} inStock={supply} maxSupply={maxSupply} minted={data}/>
        </MusicProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
