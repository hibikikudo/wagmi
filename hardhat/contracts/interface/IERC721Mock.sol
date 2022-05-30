// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC721Mock {
    /*
    * @title mint
    * @notice 一般的なmint関数
    * @param トークンID
    * @dev パブリックセール時に対応
    */
    function mint(uint256 _tokenId) external payable;

    /*
    * @title whitelistMint
    * @notice ホワイトリスト用のmint関数
    * @param トークンID
    * @param マークルプルーフ
    * @dev マークルツリーを利用
    * @dev プレセール時に対応
    */
    function whitelistMint(uint256 _tokenId,bytes32[] calldata _merkleProof) external payable;

    /*
    * @title mintByOwner
    * @notice バルクミント用
    * @param トークンのID
    * @param 送信先
    * @dev 
    */
    function mintByOwner(uint256[] calldata _tokenIds, address[] calldata _to) external;

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
}