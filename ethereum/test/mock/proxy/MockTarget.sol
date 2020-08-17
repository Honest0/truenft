pragma solidity ^0.4.24;

contract MockTarget{
  function callMe() external pure returns (bytes32){
    return(0x012345);
  }
}
