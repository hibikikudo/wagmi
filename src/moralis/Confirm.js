import { Button, makeStyles, CircularProgress } from "@material-ui/core";
import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall, useChain } from "react-moralis";
import { useState, useEffect } from "react";
import styled from 'styled-components';
import Spacer from "../components/Spacer";
import { EstGasExtension } from "../moralis/SendButton";

const StyledCircularProgress = styled(CircularProgress)`
  color: #333;
  size: 10px;
`;

const useStyles = makeStyles({
  send: {
    height: 50, 
    width: 120, 
    color: '#030303',
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor:'#F4BF1A',
    "&:hover": {
      background: "#B58B07"
    },
    // "&:active": {
    //   background: "aqua"
    // }
  },
  load: {
    height: 50, 
    width: 120, 
    backgroundColor:'#F4BF1A',
    borderRadius:5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

const Error = ({error, data}) => {
  const classes = useStyles();

  if(error){
    return <div>
    {error}
    </div>
  }
  if(data==="0"){
    return <div style={{color:'red', fontWeight:'bold'}}>
    It seems you have no token to send!
    <Spacer height={20}/>
    </div>
  }
}

const ConfirmButton = ({toETH, tokenId, update}) => {

  const classes = useStyles();

  const [ ToETH, setToETH ] = useState();
  const [ Confirmed, setConfirmed ] = useState(false);

  const { native } = useMoralisWeb3Api();

  const { isAuthenticated, account, chainId } = useMoralis();
  const { switchNetwork } = useChain();

  const getContractAddress = () => {
    if(ToETH){
      // Polygon Contract
      return "0xb4fa9FEe7B4f359a4C805b27932bca017D78bfeb";
    }else{
      // Ethereum Contract
      return "0xC6891cB0CBC7D2d98F7e68c5ACd6549C64089f1C";
    }
  }

  const options = {
    chain: chainId,
    address: getContractAddress(),
    function_name: "balanceOf",
    abi: [{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],
    params: {
      account: account,
      // account: "0xaDAcbA4Cae9471C26D613F7A94014549a647783C",
      id: tokenId
    }
  };

  const { fetch, data, error, isLoading, isFetching, setData } = useMoralisWeb3ApiCall(native.runContractFunction,{...options});

  useEffect(()=>{
    // console.log("balance of token",data);
    if(data>=1){
      setConfirmed(true);
    }
  },[data])

  useEffect(() => {
    setConfirmed(false);
    setData(null);
    setToETH(toETH);
  }, [update, toETH])

  const Confirm = () => {
    if(ToETH){
      if(chainId === "0x89" && account && isAuthenticated){
        // Fetch balanceOf
        fetch();
      }else{
        alert("The system will change your network to Polygon.");
        switchNetwork("0x89");
      }
    }else{
      if(chainId === "0x1" && account && isAuthenticated){
        // Fetch balanceOf
        fetch();
      }else{
        alert("The system will change your network to Ethereum.");
        switchNetwork("0x1");
      }
    }
  }

  if(isLoading||isFetching){
    return <div className={classes.load}>
      <StyledCircularProgress style={{width:25, height:25}}/>
    </div>
  }else{
    if(Confirmed){
      return <EstGasExtension address={getContractAddress()} tokenId={tokenId} toETH={ToETH}/>;
    }else{
      return <div className={classes.columnCenter}>
        <Error error={error} data={data}/>
        <Button className={classes.send} onClick={Confirm}>Confirm</Button>
      </div>
    }
  }
}


export default ConfirmButton;