// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IRevenuePool {
    /*
    * @title setShare
    * @notice 収益分配率の設定
    * @param ステークホルダーのアドレス
    * @param 収益分配率(百分率)
    */
    function setShare(address[] calldata _stakeholders, uint[] calldata _share) external;

    /*
    * @title withdraw
    * @notice 資産の引き出し
    * @param _recipient 引き出し先のアドレス
    * @param _claimed 引き出す資産額
    * @dev 発生した収益の総額をaddress(this).balance + totalPayedで計算
    */
    function withdraw(address _recipient, uint _claimed) external;

    /*
    * @title EMGWithdraw
    * @notice 緊急用の資金の引き出し
    * @param 引き出し先のアドレス
    * @param 引き出す資産額
    */
    function EMGWithdraw(address _recipient, uint _claimed) external;

    /*
    * @title claimable
    * @notice 引き出し可能な資産額の確認
    */
    function claimable() external view returns(uint);
}