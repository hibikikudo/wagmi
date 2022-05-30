// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "../interface/IERC1155Mock.sol";

/* mandatory parameter
*  1. name 
*  2. symbol 
*/ 
contract ERC1155Mock is ERC1155, IERC1155Mock{
    using SafeMath for uint256;

    // マークルルート
    bytes32 public merkleRoot;
    // コントラクトの作成者
    address private _creator;
    // メタデータのURI
    string private _uri = "METADATA_URI";
    // トークンの名前
    string private _name;
    // トークンの単位
    string private _symbol;

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
    // ホワイトリストの既請求者
    mapping(address => bool) public whitelistClaimed;

    event NowOnSale(SaleState sales);
    event Withdraw(address indexed recipient, uint amount);

    constructor(
        string memory name_,
        string memory symbol_
    )ERC1155(_uri){
        _MAX_AMOUNT_OF_MINT[0] = 100;
        MINT_PRICE[0] = 0.05 ether;
        WL_MINT_PRICE[0] = 0.01 ether;
        sales = SaleState.Suspended;
        _name = name_;
        _symbol = symbol_;
        _creator = msg.sender;
    }

    /*
    * @title supplyCheck
    * @notice 供給量の上限確認
    * @param _tokenId トークンID
    * @param _amount トークンの個数
    */
    modifier supplyCheck(
        uint256 _tokenId,
        uint256 _amount
    ){
        require(supplyOfEach[_tokenId] + _amount < _MAX_AMOUNT_OF_MINT[_tokenId], 
        "Max supply reached");
        _;
    }

    /*
    * @title supplyCheckBatch
    * @notice 供給量の上限確認
    * @param _tokenIds トークンID
    * @param _amounts トークンの個数
    * @div バルクミント用
    */
    modifier supplyCheckBatch(
        uint256[] calldata _tokenIds,
        uint256[] memory _amounts
    ){
        for(uint256 i=0; i<_tokenIds.length; i++){
        require(supplyOfEach[_tokenIds[i]] + _amounts[i] < _MAX_AMOUNT_OF_MINT[_tokenIds[i]], 
        "Max supply reached");
        }
        _;
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
    * @param _tokenId トークンID
    * @param _amount トークンの個数
    * @dev パブリックセール時に対応
    */
    function mint(
        uint256 _tokenId,
        uint256 _amount
    ) public payable virtual override supplyCheck(_tokenId, _amount) {
        require(msg.value == MINT_PRICE[_tokenId] * _amount, "value is incorrect");
        require(sales == SaleState.PublicSale, "NFTs are not now on sale");
        supplyOfEach[_tokenId] += _amount;
        _mint(_msgSender(), _tokenId, _amount);
    }

    /*
    * @title whitelistMint
    * @notice ホワイトリスト用のmint関数
    * @param _tokenId トークンID
    * @param _amount トークンの個数
    * @param _merklePloof マークルプルーフ
    * @dev マークルツリーを利用
    * @dev プレセール時に対応
    */
    function whitelistMint(
        uint256 _tokenId,
        uint256 _amount,
        bytes32[] calldata _merkleProof
    ) public payable virtual override supplyCheck(_tokenId, _amount) {
        require(msg.value == WL_MINT_PRICE[_tokenId] * _amount, "value is incorrect");
        require(sales == SaleState.Presale, "NFTs are not now on sale");
        require(!whitelistClaimed[msg.sender], "Address already claimed");

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(
        MerkleProof.verify(_merkleProof, merkleRoot, leaf),
        "Invalid Merkle Proof."
        );
        whitelistClaimed[msg.sender] = true;

        supplyOfEach[_tokenId] += _amount;
        _mint(_msgSender(), _tokenId, _amount);
    }

    /*
    * @title mintByOwner
    * @notice バルクミント用
    * @param _tokenIds トークンID
    * @param _amounts トークンの個数
    * @param _to 送信先
    * @dev 
    */
    function mintByOwner(
        uint256[] calldata _tokenIds, 
        uint256[] calldata _amounts,
        address[] calldata _to
    )public virtual override onlyCreatorOrAgent supplyCheckBatch(_tokenIds, _amounts){
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

    /*
    * @title EMGReveal
    * @notice メタデータの変更
    * @param uri
    * @dev reveal,EMG用
    */
    function EMGReveal(
        string memory _EMGuri
    ) public virtual override onlyCreatorOrAgent {
        _setURI(_EMGuri);
    }
    
    /*
    * @title name
    * @notice コントラクト名の呼び出し
    * @return _name コントラクト名
    * @dev OpenSeaに表示するための技術要件
    */
    function name() public view virtual override returns(string memory){
        return(_name);
    }

    /*
    * @title symbol
    * @notice NFT単位の呼び出し
    * @return _symbol NFT単位
    * @dev OpenSeaに表示するための技術要件
    */
    function symbol() public view virtual override returns(string memory){
        return(_symbol);
    }
}