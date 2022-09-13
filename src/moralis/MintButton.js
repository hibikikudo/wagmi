import { Button, makeStyles, CircularProgress } from "@material-ui/core";
import { useMoralis, useMoralisQuery, useMoralisCloudFunction, useWeb3ExecuteFunction, useNewMoralisObject } from "react-moralis";
import keccak256 from "keccak256";
import { Buffer } from 'buffer';
import styled from 'styled-components';
import { MerkleTree } from 'merkletreejs';
import Spacer from "../components/Spacer";
import { getEllipsisTxt } from "../helpers/formatters";
import { faHandPointLeft } from "@fortawesome/free-solid-svg-icons";

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
      console.log(error)
      return <div style={{color:'red', fontWeight:'bold'}}>
      {getEllipsisTxt(error.data.message, 80, 0)}
      <Spacer height={20}/>
      </div>
    }
    console.log(error)
    console.log(error.message)
    return <div style={{color:'red', fontWeight:'bold'}}>
    {getEllipsisTxt(error.message, 80, 0)}
    <Spacer height={20}/>
    </div>
  }
}

const MintButton = ({tokenId, fee}) => {
  const options = {
    contractAddress: contractAddress,
    functionName:"omniMint",
    abi:[{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint32","name":"_amount","type":"uint32"},{"internalType":"bytes","name":"_data","type":"bytes"},{"internalType":"bytes32[]","name":"_merkleProof","type":"bytes32[]"}],"name":"omniMint","outputs":[],"stateMutability":"payable","type":"function"}],
    params:{
      _tokenId: tokenId,
      _amount:1,
      _data:"0x00",
      _merkleProof:[]
    },
    msgValue: fee
  };

  const classes = useStyles();
  const { fetch, error } = useWeb3ExecuteFunction(options);
  return (
    <div className={classes.columnCenter}>
      <Error error={error}/>
      <Button className={classes.button} onClick={fetch}>Mint</Button>
    </div>)
}

const WLMintButton = ({data, tokenId, fee}) => {

  const classes = useStyles();
  const { account } = useMoralis();

  const getHexPloof = (data) => {
    let leafNodes, merkleTree, clamingHashedAddress;

    leafNodes = data.map(addr => keccak256(addr));
    merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
    console.log(merkleTree.toString());
    console.log(keccak256(account));
    clamingHashedAddress = keccak256(account);
    return merkleTree.getHexProof(clamingHashedAddress);
  }

  console.log("kore",data);
  const hexPloof = getHexPloof(data[data.length-1].attributes.allowlist);
  // console.log('merklePloof\n',hexPloof);

  const options = {
    contractAddress: contractAddress,
    functionName:"omniMint",
    abi:[{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint32","name":"_amount","type":"uint32"},{"internalType":"bytes","name":"_data","type":"bytes"},{"internalType":"bytes32[]","name":"_merkleProof","type":"bytes32[]"}],"name":"omniMint","outputs":[],"stateMutability":"payable","type":"function"}],
    params:{
      _tokenId: tokenId,
      _amount:1,
      _data:"0x00",
      _merkleProof:hexPloof?hexPloof:[]
    },
    msgValue: fee
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
export {MintButton, WLMintButton};