import { Button, makeStyles, CircularProgress } from "@material-ui/core";
import { useMoralis, useMoralisQuery, useMoralisCloudFunction, useWeb3ExecuteFunction, useNewMoralisObject } from "react-moralis";
import keccak256 from "keccak256";
import { Buffer } from 'buffer';
import styled from 'styled-components';
import { MerkleTree } from 'merkletreejs';
import Spacer from "../components/Spacer";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

window.Buffer = Buffer;

const StyledCircularProgress = styled(CircularProgress)`
  color: #333;
  size: 10px;
`;

const useStyles = makeStyles({
  button: {
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

const Error = ({error}) => {
  if(error){
    if(error.data){
      return <div style={{color:'red', fontWeight:'bold'}}>
      {error.data.message}
      <Spacer height={20}/>
      </div>
    }
    return <div style={{color:'red', fontWeight:'bold'}}>
    {error.message}
    <Spacer height={20}/>
    </div>
  }
}

const WLMintButton = (data) => {

  const classes = useStyles();

  const { account } = useMoralis();

  const getHexPloof = (data) => {
    let leafNodes, merkleTree, clamingHashedAddress, hexPloof;

    leafNodes = data.map(addr => keccak256(addr));
    merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
    // console.log(merkleTree.toString());
    // console.log(keccak256(account));
    clamingHashedAddress = keccak256(account);
    return hexPloof = merkleTree.getHexProof(clamingHashedAddress);
  }

  const hexPloof = getHexPloof(data.data[data.data.length-1].attributes.allowlist);
  // console.log('merklePloof\n',hexPloof);

  const options = {
    contractAddress: contractAddress,
    functionName:"whitelistMint",
    abi:[{"inputs":[{"internalType":"bytes32[]","name":"_merkleProof","type":"bytes32[]"}],"name":"whitelistMint","outputs":[],"stateMutability":"nonpayable","type":"function"}],
    params:{
      _merkleProof: hexPloof
    }
  };
  const { fetch, error } = useWeb3ExecuteFunction(options);

  if(hexPloof){
    return (
      <div className={classes.columnCenter}>
        <Error error={error}/>
        <Button className={classes.button} onClick={fetch}>Mint</Button>
      </div>)
  }else{
    return <div className={classes.load}>
      <StyledCircularProgress style={{width:25, height:25}}/>
    </div>
  }
  
}
export default WLMintButton;