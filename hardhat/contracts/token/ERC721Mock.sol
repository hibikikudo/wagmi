// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "../interface/IERC721Mock.sol";

/* mandatory parameter
*  1. name 
*  2. symbol 
*/ 
contract ERC721Mock is ERC721, IERC721Mock{
  using SafeMath for uint256;

  // マークルルート
  bytes32 public merkleRoot;
  // コントラクトの作成者
  address private _creator;
  // ベースURI
  string private baseURI_;
  // テストURI
  string private _uri = "ipfs://QmeQAdSCQpTEskc1JYt9QrmR8PCSiGuFJPzCRjjBVWUWq9/metadata/{id}.json";

  // 販売状態(列挙型)
  enum SaleState {Presale, PublicSale, Suspended} 
  SaleState sales;

  // トークンごとの供給量
  mapping(uint256 => uint256) public supplyOfEach;
  // 供給量の上限
  mapping(uint256 => uint256) private _MAX_AMOUNT_OF_MINT;
  // ミント価格
  mapping(uint256 => uint256) public MINT_PRICE;
  // WL用ミント価格
  mapping(uint256 => uint256) public WL_MINT_PRICE;
  // 実行権限のある執行者
  mapping(address => bool) private _agent;
  // ホワイトリストの既に請求者
  mapping(address => bool) public whitelistClaimed;

  event NowOnSale(SaleState sales);
  event Withdraw(address indexed recipient, uint amount);

  constructor (
    string memory _name,
    string memory _symbol
  ) ERC721(_name, _symbol){
    _MAX_AMOUNT_OF_MINT[0] = 100;
    MINT_PRICE[0] = 0.05 ether;
    sales = SaleState.Suspended;
    _creator = msg.sender;
  }

  /*
  * @title supplyCheck
  * @notice 供給量の上限確認
  * @param トークンID
  */
  modifier supplyCheck(
    uint256 _tokenId
  ){
    require(supplyOfEach[_tokenId] < _MAX_AMOUNT_OF_MINT[_tokenId], 
    "Max supply reached");
    _;
  }

  /*
  * @title supplyCheck
  * @notice 供給量の上限確認
  * @param トークンID
  * @div バルクミント用
  */
  modifier supplyCheckBatch(
    uint256[] calldata _tokenIds
  ){
    for(uint256 i=0; i<_tokenIds.length; i++){
      require(supplyOfEach[_tokenIds[i]] < _MAX_AMOUNT_OF_MINT[_tokenIds[i]], 
      "Max supply reached");
      _;
    }
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
  * @title mint
  * @notice 一般的なmint関数
  * @param トークンID
  * @dev パブリックセール時に対応
  */
  function mint(
    uint256 _tokenId
  ) public payable virtual override supplyCheck(_tokenId) {
    require(msg.value == MINT_PRICE[_tokenId], "value is incorrect");
    require(sales == SaleState.PublicSale, "NFTs are not now on sale");
    supplyOfEach[_tokenId] = supplyOfEach[_tokenId].add(1);
    _mint(_msgSender(), _tokenId);
  }

  /*
  * @title whitelistMint
  * @notice ホワイトリスト用のmint関数
  * @param トークンID
  * @param マークルプルーフ
  * @dev マークルツリーを利用
  * @dev プレセール時に対応
  */
  function whitelistMint(
    uint256 _tokenId,
    bytes32[] calldata _merkleProof
  ) public payable virtual override supplyCheck(_tokenId) {
    require(msg.value == WL_MINT_PRICE[_tokenId], "value is incorrect");
    require(sales == SaleState.Presale, "NFTs are not now on sale");
    require(!whitelistClaimed[msg.sender], "Address already claimed");

    bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
    require(
      MerkleProof.verify(_merkleProof, merkleRoot, leaf),
      "Invalid Merkle Proof."
    );
    whitelistClaimed[msg.sender] = true;

    supplyOfEach[_tokenId] = supplyOfEach[_tokenId].add(1);
    _mint(_msgSender(), _tokenId);
  }

  /*
  * @title mintByOwner
  * @notice バルクミント用
  * @param トークンのID
  * @param 送信先
  * @dev 
  */
  function mintByOwner(
    uint256[] calldata _tokenIds, 
    address[] calldata _to
  )public virtual override onlyCreatorOrAgent supplyCheckBatch(_tokenIds){
    for(uint256 i = 0; i < _tokenIds.length; i++){
      supplyOfEach[_tokenIds[i]] = supplyOfEach[_tokenIds[i]].add(1);
      _mint(_to[i], _tokenIds[i]);
    }
  }

  /*
  * @title addMerkleRoot
  * @notice マークルルートの設定
  * @dev ホワイトリスト用
  */
  function setMerkleRoot(bytes32 _merkleRoot) public virtual override onlyCreatorOrAgent {
    merkleRoot = _merkleRoot;
  }

  /*
  * @title withdraw
  * @notice 資金の引き出し
  * @param 引き出し先のアドレス
  * @dev 収益を分配する場合はこの関数を消去してRevenuePoolを継承
  */
  function withdraw(address _recipient) public virtual override onlyCreatorOrAgent {
    payable(_recipient).transfer(address(this).balance);
    emit Withdraw(_recipient, address(this).balance);
  }

  /*
  * @title startPresale
  * @notice プレセールの開始
  * @dev 列挙型で管理
  */
  function startPresale() public virtual override onlyCreatorOrAgent {
    sales = SaleState.Presale;
    emit NowOnSale(sales);
  }

  /*
  * @title startPublicSale
  * @notice パブリックセールの開始
  * @dev 列挙型で管理
  */
  function startPublicSale() public virtual override onlyCreatorOrAgent {
    sales = SaleState.PublicSale;
    emit NowOnSale(sales);
  }

  /*
  * @title suspendSale
  * @notice セール状態の停止
  * @dev 列挙型で管理
  */
  function suspendSale() public virtual override onlyCreatorOrAgent {
    sales = SaleState.Suspended;
    emit NowOnSale(sales);
  }

  /*
  * @title license
  * @notice エージェントの設定
  * @param エージェントのアドレス
  * @dev 
  */
  function license(address agentAddr) public virtual override onlyCreatorOrAgent {
    _agent[agentAddr] = true;
  }

  /*
  * @title unlicense
  * @notice エージェントの削除
  * @param エージェントのアドレス
  * @dev 
  */
  function unlicense(address agentAddr) public virtual override onlyCreatorOrAgent {
    _agent[agentAddr] = false;
  }

//URI実装案１
  /*
  * @title setBaseURI
  * @dev 
  */
  function setBaseURI(string memory uri_) public virtual override onlyCreatorOrAgent {
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
  // function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
  //   return _uri;
  // }
}