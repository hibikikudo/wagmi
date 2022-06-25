import { Button, makeStyles } from "@material-ui/core";
import { useMoralis, useMoralisQuery, useMoralisCloudFunction, useWeb3ExecuteFunction, useNewMoralisObject } from "react-moralis";
import keccak256 from "keccak256";
import { Buffer } from 'buffer';
import { MerkleTree } from 'merkletreejs'

window.Buffer = Buffer;

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
  }
});

const MintButton = () => {

  const classes = useStyles();

  const options = {
    contractAddress:"0x64B4B8AD8AB87F988d0FE67c38aFE1acd61B9348",
    functionName:"mint",
    abi:[{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"}],
    params:{
      _tokenId:5,
      _amount:1
    },
  };

  const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction(options);

  return (
  <div>
    <Button className={classes.button} onClick={() => fetch()} disabled={isFetching}>Mint</Button>
  </div>)
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
    const testAccount = '0x5DE4Fc4548ba286EB29173630618D4Ef5E489Bd6';
    clamingHashedAddress = keccak256(testAccount);
    return hexPloof = merkleTree.getHexProof(clamingHashedAddress);
    // console.log("Merkle Ploof\n", hexPloof);
  }

  const hexPloof = getHexPloof(data.data[0].attributes.allowlist);
  console.log('merklePloof\n',hexPloof);

  const options = {
    contractAddress:"0x64B4B8AD8AB87F988d0FE67c38aFE1acd61B9348",
    functionName:"mint",
    abi:[{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"}],
    params:{
      _tokenId:5,
      _amount:1
    }
  };
  const { fetch } = useWeb3ExecuteFunction(options);

  return (
  <div>
    <Button className={classes.button} onClick={fetch}>Mint</Button>
  </div>)
}
export {MintButton, WLMintButton};