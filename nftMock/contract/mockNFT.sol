//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract mockNFT is ERC721 {
  bool private _nowOnSale = false;
  
  constructor (
    string memory _name, 
    string memory _symbol
  ) ERC721(_name, _symbol){}

  event NowOnSale(bool onsale);

  function mint(
    address _to,
    uint _tokenId
  ) public payable {
    require(msg.value == 0.05 ether);
    _safeMint(_to, _tokenId);
  }

  function startSale() public {
    emit NowOnSale(_nowOnSale);
  }
  function suspendSale() public {
    emit NowOnSale(_nowOnSale);
  }
}