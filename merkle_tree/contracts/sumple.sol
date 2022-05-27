// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleTreeExample {

  bytes32 public merkleRoot;

  function whitelistMint(bytes32[] calldata _merkleProof) public view {
    // address => string => bytes32
    bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
    require(
      MerkleProof.verify(_merkleProof, merkleRoot, leaf),
      "Invalid Merkle Proof."
    );
  }
}