// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/* mandatory parameter
*  1. name 
*  2. symbol 
*/ 
contract ERC721Drop is ERC721 {
  using SafeMath for uint256;

  // マークルルート
  bytes32 public merkleRoot;
  // コントラクトの作成者
  address private _creator;
  // ベースURI
  string private baseURI_;
  // テストURI
  string private _uri = "ipfs://QmeQAdSCQpTEskc1JYt9QrmR8PCSiGuFJPzCRjjBVWUWq9/metadata/{id}.json";
  // 供給量の上限
  uint256 public MAX_AMOUNT_OF_MINT;
  // トークンの供給量
  uint256 public tokenSupply;
  // 販売状態
  bool public sales;
  // 実行権限のある執行者
  mapping(address => bool) private _agent;
  // ホワイトリストの既に請求者
  mapping(address => bool) public whitelistClaimed;

  event NowOnSale(bool sales);

  constructor (
    string memory _name,
    string memory _symbol
  ) ERC721(_name, _symbol){
    MAX_AMOUNT_OF_MINT = 100;
    _creator = msg.sender;
    sales = false;
  }

  /*
  * @title onlyCreatorOrAgent
  * @notice 実行権限の確認
  * @div 
  */
  modifier onlyCreatorOrAgent {
    require(msg.sender == _creator || _agent[msg.sender], "This is not allowed except for _creator or agent");
    _;
  }

  /*
  * @title whitelistMint
  * @notice ホワイトリスト用のmint関数
  * @param トークンID
  * @param マークルプルーフ
  * @dev マークルツリーを利用
  * @dev プレセール時に対応
  */
  function whiteListMint(
    bytes32[] calldata _merkleProof
  ) public {
    require(sales == true, "NFTs are not now on sale");
    require(!whitelistClaimed[msg.sender], "Address already claimed");
    require(tokenSupply < MAX_AMOUNT_OF_MINT, "Max supply reached");

    bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
    require(
      MerkleProof.verify(_merkleProof, merkleRoot, leaf),
      "Invalid Merkle Proof."
    );
    whitelistClaimed[msg.sender] = true;

    uint _newTokenId = tokenSupply;
    tokenSupply = tokenSupply.add(1);

    _mint(_msgSender(), _newTokenId);
  }

  /*
  * @title addMerkleRoot
  * @notice マークルルートの設定
  * @dev ホワイトリスト用
  */
  function setMerkleRoot(bytes32 _merkleRoot) public onlyCreatorOrAgent {
    merkleRoot = _merkleRoot;
  }

  /*
  * @title startSale
  * @notice フリーミントの開始
  */
  function startSale() public onlyCreatorOrAgent {
    sales = true;
    emit NowOnSale(sales);
  }

  /*
  * @title suspendSale
  * @notice フリーミントの停止
  */
  function suspendSale() public onlyCreatorOrAgent {
    sales = false;
    emit NowOnSale(sales);
  }

  /*
  * @title license
  * @notice エージェントの設定
  * @param エージェントのアドレス
  * @dev 
  */
  function license(address agentAddr) public onlyCreatorOrAgent {
    _agent[agentAddr] = true;
  }

  /*
  * @title unlicense
  * @notice エージェントの削除
  * @param エージェントのアドレス
  * @dev 
  */
  function unlicense(address agentAddr) public onlyCreatorOrAgent {
    _agent[agentAddr] = false;
  }

//URI実装案１
  /*
  * @title setBaseURI
  * @dev 
  */
  function setBaseURI(string memory uri_) public onlyCreatorOrAgent {
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

//URI実装案２
  /*
  * @title setBaseURI
  * @dev 
  */
  function setURI(string memory uri_) public onlyCreatorOrAgent {
    _uri = uri_;
  }
  
  /*
  * @title setBaseURI
  * @dev 
  */
  // function tokenURI(uint256 tokenId) public view returns (string memory) {
  //   return _uri;
  // }
}