pragma solidity ^0.4.24;

contract Mock_ERC721TokenReceiver {
  bool called = false;  

  function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes _data) external pure returns (bytes4) {
    _operator;
    _from;
    _tokenId;
    _data;
    return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
  }
}
