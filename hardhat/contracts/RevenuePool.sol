// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract RevenuePool is Ownable{
    uint private totalPayed;
    mapping(address => uint) private _payedToEach;
    mapping(address => uint) public share;

    /*
    * @title setShare
    * @notice 収益分配率の設定
    * @param ステークホルダーのアドレス
    * @param 収益分配率(百分率)
    */
    function setShare(address[] calldata _stakeholders, uint[] calldata _share) public onlyOwner {
        for(uint256 i = 0; i < _stakeholders.length; i++){
            share[_stakeholders[i]] = _share[i];
        }
    }

    /*
    * @title withdraw
    * @notice 資産の引き出し
    * @param _recipient 引き出し先のアドレス
    * @param _claimed 引き出す資産額
    * @dev 発生した収益の総額をaddress(this).balance + totalPayedで計算
    * @devparam _claimable 引き出し可能な資産額
    * @devparam totalPayed 引き出された総資産額
    * @devparam _payedToEach 引き出し済みの資産
    * @devparam share 受け取る収益の割合
    */
    function withdraw(address _recipient, uint _claimed) public {
        uint _claimable = (share[msg.sender] / 100) * (address(this).balance + totalPayed) - _payedToEach[msg.sender];
        require(_claimed <= _claimable, "Claimed amount is exceeding claimable limit");
        _claimable -= _claimed;
        totalPayed += _claimed;
        _payedToEach[msg.sender] += _claimed;
        payable(_recipient).transfer(_claimed);
    }

    /*
    * @title EMGWithdraw
    * @notice 緊急用の資金の引き出し
    * @param 引き出し先のアドレス
    * @param 引き出す資産額
    */
    function EMGWithdraw(address _recipient, uint _claimed) public onlyOwner {
        require(_claimed <= address(this).balance, "Claimed amount is exceeding funding");
        payable(_recipient).transfer(_claimed);
    }

    /*
    * @title claimable
    * @notice 引き出し可能な資産額の確認
    */
    function claimable() public view returns(uint){
        uint _claimable = (share[msg.sender] / 100) * (address(this).balance + totalPayed) - _payedToEach[msg.sender];
        return(_claimable);
    }
}