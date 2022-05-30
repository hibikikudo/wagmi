const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

let whitelistAddresses = [
    // addresses array here.
  ];

const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
console.log()
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
const rootHash = merkleTree.getRoot();

const clamingAddress = leafNodes[0];
const hexPloof = merkleTree.getHexProof(clamingAddress);

// console.log(merkleTree.verify(hexPloof, clamingAddress, rootHash));
