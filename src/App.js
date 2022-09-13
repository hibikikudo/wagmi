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
import { MoralisProvider } from 'react-moralis';

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const maxSupply = process.env.REACT_APP_MAX_SUPPLY;
const maxStock = ["45", "5","5","5"];

let web3Provider, contract, sale_filter;
if(window.ethereum){
  web3Provider = new ethers.providers.Web3Provider(window.ethereum);
  contract = new ethers.Contract(contractAddress, contractAbi, web3Provider);
  // console.log(contract);
  sale_filter = contract.filters.NowOnSale(null);
}

const handleOption = (id) => {
  const options = {
    chain: "0x1",
    address: contractAddress,
    function_name: "totalSupply",
    abi: [{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],
    params: {_tokenId:id}
  };
  return options;
}

const option = {
  chain: "0x1",
  address: contractAddress,
  function_name: "sales",
  abi: [{"inputs":[{"internalType":"uint256","name":"para","type":"uint256"}],"name":"sales","outputs":[{"internalType":"enum WAGMIMusicToken1155.saletate","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}],
  params: {para:1}
};

let minted = [0,0,0,0];
let checker = [true, true, true, true, true];

const App = () => {
  const { native } = useMoralisWeb3Api();
  const { isWeb3Enabled, enableWeb3, isAuthenticated, account, isWeb3EnableLoading } =
    useMoralis();

  /*
  *  sales == 0 => prepared
  *  sales == 1 => presale
  *  sales == 2 => pulicsale
  *  sales == 3 => suspended
  */
  const [sales, setSales] = useState("0");
  const [supply, setSupply] = useState([true, true, true, true]);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  const getTotalSupplyA = useMoralisWeb3ApiCall(native.runContractFunction,{...handleOption(1)});
  const getTotalSupplyB = useMoralisWeb3ApiCall(native.runContractFunction,{...handleOption(2)});
  const getTotalSupplyC = useMoralisWeb3ApiCall(native.runContractFunction,{...handleOption(3)});
  const getTotalSupplyD = useMoralisWeb3ApiCall(native.runContractFunction,{...handleOption(4)});
  const getSalesState = useMoralisWeb3ApiCall(native.runContractFunction,{...option});

  useEffect(() => {
      if(checker[0]){
        getTotalSupplyA.fetch();
        // console.log("fetch");
        checker[0] =false;
      }    
      if(checker[1]){
        getTotalSupplyB.fetch();
        checker[1] =false;
      }
      if(checker[2]){
        getTotalSupplyC.fetch();
        checker[2] =false;
      }
      if(checker[3]){
        getTotalSupplyD.fetch();
        checker[3] =false;
      }
      if(checker[4]){
        getSalesState.fetch();
        checker[4]=false;
      }
  },[]);

  useEffect(() => {
    if(getTotalSupplyA.data){
      minted[0] = getTotalSupplyA.data;
      supply[0] = (maxStock[0]!==minted[0]);
      // console.log("dataA filled", minted, getTotalSupplyA.error);
    }
  }, [getTotalSupplyA.data, minted[0]])

  useEffect(() =>{
    if(getTotalSupplyB.data){
      minted[1] = getTotalSupplyB.data;
      supply[1] = (maxStock[1]!==minted[1]);
      // console.log("dataB filled", minted, getTotalSupplyB.error);
    }
  },[getTotalSupplyB.data, minted[1]])

  useEffect(() =>{
    if(getTotalSupplyC.data){
      minted[2] = getTotalSupplyC.data;
      supply[2] = (maxStock[2]!==minted[2]);
      // console.log("dataC filled", minted, getTotalSupplyC.error);
    }
  },[getTotalSupplyC.data, minted[2]])

  useEffect(() =>{
    if(getTotalSupplyD.data){
      minted[3] = getTotalSupplyD.data;
      supply[3] = (maxStock[3]!==minted[3]);
      // console.log("dataD filled", minted, getTotalSupplyD.error);
    }
  },[getTotalSupplyD.data, minted[3]])

  useEffect(() => {
    setSales(getSalesState.data)
    // console.log("sales filled", getSalesState.data)
  },[getSalesState.data])

    return (
      <>
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <ThemeProvider theme={theme}>
          <MusicProvider>
            <div style={{position:'fixed', left: 30, bottom: 25, zIndex: 2}}> 
              <Player sales={"1"}/>
            </div>
            <MyRoutes sales={sales} inStock={supply} maxSupply={maxSupply} minted={minted}/>
          </MusicProvider>
        </ThemeProvider>
      </MoralisProvider>
      </>
    );
}

export default App;