// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC1155Mock {

    /*
    * @title mint
    * @notice 一般的なmint関数
    * @param _tokenId トークンID
    * @param _amount トークンの個数
    * @dev パブリックセール時に対応
    */
    function mint(uint256 _tokenId, uint256 _amount) external payable;

    /*
    * @title whitelistMint
    * @notice ホワイトリスト用のmint関数
    * @param _tokenId トークンID
    * @param _amount トークンの個数
    * @param _merklePloof マークルプルーフ
    * @dev マークルツリーを利用
    * @dev プレセール時に対応
    */
    function whitelistMint(uint256 _tokenId, uint256 _amount, bytes32[] calldata _merkleProof) external payable;

    /*
    * @title mintByOwner
    * @notice バルクミント用
    * @param _tokenIds トークンID
    * @param _amounts トークンの個数
    * @param _to 送信先
    * @dev 
    */
    function mintByOwner(uint256[] calldata _tokenIds, uint256[] calldata _amounts, address[] calldata _to)external;

    /*
    * @title addMerkleRoot
    * @notice マークルルートの設定
    * @dev ホワイトリスト用
    */
    function setMerkleRoot(bytes32 _merkleRoot) external;

    /*
    * @title withdraw
    * @notice 資金の引き出し
    * @param 引き出し先のアドレス
    * @dev 収益を分配する場合はこの関数を消去してRevenuePoolを継承
    */
    function withdraw(address _recipient) external;

    /*
    * @title startPresale
    * @notice プレセールの開始
    * @dev 列挙型で管理
    */
    function startPresale() external;

    /*
    * @title startPublicSale
    * @notice パブリックセールの開始
    * @dev 列挙型で管理
    */
    function startPublicSale() external;

    /*
    * @title suspendSale
    * @notice セール状態の停止
    * @dev 列挙型で管理
    */
    function suspendSale() external;

    /*
    * @title license
    * @notice エージェントの設定
    * @param エージェントのアドレス
    * @dev 
    */
    function license(address agentAddr) external;

    /*
    * @title unlicense
    * @notice エージェントの削除
    * @param エージェントのアドレス
    * @dev 
    */
    function unlicense(address agentAddr) external;

    /*
    * @title EMGReveal
    * @notice メタデータの変更
    * @param uri
    * @dev reveal,EMG用
    */
    function EMGReveal(
        string memory _EMGuri
    ) external;

    /*
    * @title name
    * @notice コントラクト名の呼び出し
    * @return _name コントラクト名
    * @dev OpenSeaに表示するための技術要件
    */
    function name() external view returns(string memory);

    /*
    * @title symbol
    * @notice NFT単位の呼び出し
    * @return _symbol NFT単位
    * @dev OpenSeaに表示するための技術要件
    */
    function symbol() external view returns(string memory);

    
}