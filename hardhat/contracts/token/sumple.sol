//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Sumple is ERC721, Ownable {
  string private baseURI_ = 'https://ipfs.moralis.io:2053/ipfs/QmeXq9GPhPEaLwoocRjVS9PNwJJWwLiEb2dFWQuvpKYgZs/metadata/';

  constructor(
    string memory name,
    string memory symbol,
    address owner
  )ERC721(name, symbol){
    transferOwnership(owner);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC721)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function mint(address to, uint256 tokenId) public {
    _mint(to, tokenId);
  }

//URI実装案１
  /*
  * @title setBaseURI
  * @dev 
  */
  function setBaseURI(string memory uri_) public {
    baseURI_ = uri_;
  }

  /*
  * @title tokenURI
  * @dev 
  */
  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");
    return string(abi.encodePacked(baseURI_, Strings.toString(tokenId)));
  }
}