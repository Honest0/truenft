pragma solidity ^0.4.24;

interface ERC721TokenReceiver {
    function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes _data) external returns(bytes4);
}

library SafeMath {

  function add(uint256 _a, uint256 _b) internal pure returns (uint256) {
    uint256 c = _a + _b;
    require(c >= _a && c >= _b);
    return c;
  }

  function sub(uint256 _a, uint256 _b) internal pure returns (uint256) {
    require(_a >= _b);
    return _a - _b;
  }

  function mul(uint256 _a, uint256 _b) internal pure returns (uint256) {
    uint256 c = _a * _b;
    require(_a == 0 || c / _a == _b);
    return c;
  }

}

contract Mock_NFTInterface {

  // Attaches the SafeMath library to uint256
  using SafeMath for uint256;

  event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
  event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
  event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

  struct Token {
    address owner;
    address approved;
    bool exists;
    uint256 index;
    bytes32 URI;
  }

  string public constant name = "Bill of Lading";
  string public constant symbol = "BOL";
  uint256[] registered;
  mapping(bytes4 => bool) interfaces;
  mapping(uint256 => Token) tokens;
  mapping(address => uint256[]) tokensByOwner;
  mapping(address => mapping(address => bool)) operator;

  /************************ Mock Functions ***********************/

  function createNFT(address _owner, address _approved, bytes32 tokenURI) external {
    tokens[registered.length] = Token({
      owner: _owner,
      approved: _approved,
      index: tokensByOwner[_owner].length,
      URI: tokenURI,
      exists: true
    });
    tokensByOwner[_owner].push(registered.length);
    registered.push(registered.length);
  }

  function addInterface(bytes4 _interface) external {
    interfaces[_interface] = true;
  }

  /********************* NFTInterface Functions ********************/

  /**
   * @dev Change the approved address for an NFT
   * @param _approved The new approved address
   * @param _tokenId The NFT whose approval is being changed
   */
  function approve(address _approved, uint _tokenId) external payable {
    require(tokens[_tokenId].owner == msg.sender || operator[tokens[_tokenId].owner][msg.sender], 'not owner or operator');
    tokens[_tokenId].approved = _approved;
    emit Approval(tokens[_tokenId].owner, _approved, _tokenId);
  }

  /**
   * @dev Count all of the nfts owned by the _owner
   * @notice Throws if owner is zero address
   * @param _owner The owner of the nfts
   * @return Returns a count of the nfts owned by the _owner
   */
  function balanceOf(address _owner) external view returns (uint) {
    require(_owner != address(0));
    return tokensByOwner[_owner].length;
  }

  /**
   * @dev Get the approved address of the specified token
   * @notice Throws if the token is invalid
   * @param _tokenId The token being queried
   * @return The approved address of the specified token
   */
  function getApproved(uint _tokenId) external view returns (address) {
    require(tokens[_tokenId].exists);
    return tokens[_tokenId].approved;
  }

  /**
   * @notice Query if an address is an authorized operator for another address
   * @param _owner The address that owns the NFTs
   * @param _operator The address that acts on behalf of the owner
   * @return True if `_operator` is an approved operator for `_owner`, false otherwise
   */
  function isApprovedForAll(address _owner, address _operator) external view returns (bool) {
    return operator[_owner][_operator];
  }

  /**
   * @dev Returns the owner address of the specified token
   * @notice Throws if the specified token is invalid
   * @param _tokenId The id of the specified nft token
   * @return The address of the owner of the token
   */
  function ownerOf(uint256 _tokenId) external view returns (address) {
    require(tokens[_tokenId].exists);
    return tokens[_tokenId].owner;
  }
  function ownerOfBytes(bytes32 _tokenId) external view returns (address) {
    require(tokens[uint(_tokenId)].exists);
    return tokens[uint(_tokenId)].owner;
  }

  /**
   * @dev Transfers the specified token to the recipient and calls the recipient if the account is a contract.
   * @notice Throws if the token is invalid, the _from address is not the token owner, or if the sender is not authorized.
   * @param _from The address of the token owner
   * @param _to The address of the recipient
   * @param _tokenId The id of the specified nft token
   */
  function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable {
    require(tokens[_tokenId].owner == _from && tokens[_tokenId].owner != 0, '_from is not owner or token is not owned');
    require(tokens[_tokenId].owner == msg.sender || tokens[_tokenId].approved == msg.sender || operator[_from][msg.sender], 'sender is not authorized');
    require(_to != 0);
    _transferFrom(_from, _to, _tokenId);
    bool isContract;
    assembly {
      isContract := iszero(iszero(extcodesize(_to)))
    }
    if (isContract) {
      bytes memory b = new bytes(0);
      require(ERC721TokenReceiver(_to).onERC721Received(msg.sender, _from, _tokenId, b) == bytes4(keccak256("onERC721Received(address,address,uint256,bytes)")));
    }
    emit Transfer(_from, _to, _tokenId);
  }

  /**
   * @dev Transfers the specified token to the recipient and calls the recipient if the account is a contract.
   * @notice Throws if the token is invalid, the _from address is not the token owner, or if the sender is not authorized.
   * @param _from The address of the token owner
   * @param _to The address of the recipient
   * @param _tokenId The id of the specified nft token
   * @param _data Data to be sent to the recipient if the account is a smart contract
   */
  function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes _data) external payable {
    require(tokens[_tokenId].owner == _from && tokens[_tokenId].owner != 0, '_from is not owner or token is not owned');
    require(tokens[_tokenId].owner == msg.sender || tokens[_tokenId].approved == msg.sender || operator[_from][msg.sender], 'sender is not authorized');
    require(_to != 0);
    _transferFrom(_from, _to, _tokenId);
    bool isContract;
    assembly {
      isContract := iszero(iszero(extcodesize(_to)))
    }
    if (isContract) {
      require(ERC721TokenReceiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data) == bytes4(keccak256("onERC721Received(address,address,uint256,bytes)")));
    }
    emit Transfer(_from, _to, _tokenId);
  }

  /**
   * @dev Change the operator status of the specified address
   * @param _operator The specified address to change
   * @param _approved Authorize _operator if true, and revoke authorization if false
   */
  function setApprovalForAll(address _operator, bool _approved) external {
    operator[msg.sender][_operator] = _approved;
    emit ApprovalForAll(msg.sender, _operator, _approved);
  }

  /**
   * @dev Returns whether or not the specified interface is supported
   * @param _interfaceId The id of the specified interface
   * @return True if the interface is supported or false otherwise
   */
  function supportsInterface(bytes4 _interfaceId) external view returns (bool) {
    return interfaces[_interfaceId];
  }

  /**
   * @dev Get the token identifier of the nft token at the specified index
   * @notice Throws if `_index` >= `totalSupply()`
   * @param _index The index of the nft token
   * @return The token identifier of the nft at the `_index`th position of the contract's nfts
   */
  function tokenByIndex(uint256 _index) external view returns (uint) {
    if (_index >= registered.length)
      revert('invalid index');
    return registered[_index];
  }

  /**
   * @dev Enumerate NFTs assigned to an owner
   * @notice Throws if `_index` >= `balanceOf(_owner)` or if
   *  `_owner` is the zero address, representing invalid NFTs.
   * @param _owner An address where we are interested in NFTs owned by them
   * @param _index A counter less than `balanceOf(_owner)`
   * @return The token identifier for the `_index`th NFT assigned to `_owner`,
   *  (sort order not specified)
   */
  function tokenOfOwnerByIndex(address _owner, uint256 _index) external view returns (uint) {
    require(_owner != address(0));
    if (_index >= tokensByOwner[_owner].length)
      revert('invalid index');
    return tokensByOwner[_owner][_index];
  }

  /**
   * @dev Returns the URI associated with the specified nft token
   * @notice Throws if the nft is invalid
   * @param _tokenId The id of the specified nft token
   * @return The URI of the specified token
   */
  function tokenURI(uint256 _tokenId) external view returns (string){
    require(tokens[_tokenId].exists);
    return toString(tokens[_tokenId].URI);
  }

  /**
   * @dev Returns the total supply of nft tokens
   * @return The total supply of nft tokens
   */
  function totalSupply() external view returns (uint) {
    return registered.length;
  }

  /**
   * @dev Unsafely transfers the specified nft to the recipient
   * @notice Throws if the token is invalid, the _from address is not the token owner, or if the sender is not authorized.
   * @param _from The address of the token owner
   * @param _to The address of the recipient
   * @param _tokenId The id of the specified nft token
   */
  function transferFrom(address _from, address _to, uint256 _tokenId) external payable {
    require(tokens[_tokenId].owner == _from && tokens[_tokenId].owner != 0, '_from is not owner or token is not owned');
    require(tokens[_tokenId].owner == msg.sender || tokens[_tokenId].approved == msg.sender || operator[_from][msg.sender], 'sender is not authorized');
    require(_to != 0);
    _transferFrom(_from, _to, _tokenId);
    emit Transfer(_from, _to, _tokenId);
  }

  /*************************** Helpers ********************************/

  /**
   * @dev A helper function for performing transferFrom operations
   * @notice Throws if the token is invalid, the _from address is not the token owner, or if the sender is not authorized.
   * @param _from The address of the token owner
   * @param _to The address of the recipient
   * @param _tokenId The id of the specified nft token
   */
  function _transferFrom(address _from, address _to, uint256 _tokenId) internal {
    tokens[_tokenId].approved = 0;
    tokens[_tokenId].owner = _to;
    tokensByOwner[_from][tokens[_tokenId].index] = tokensByOwner[_from][tokensByOwner[_from].length - 1];
    tokensByOwner[_from].length -= 1;
    tokensByOwner[_to].push(_tokenId);
    tokens[_tokenId].index = tokensByOwner[_to].length - 1;
  }

  function toString(bytes32 data) internal pure  returns(string) {
      bytes memory bytesString = new bytes(64);
      bytes memory source = new bytes(32);
      assembly{
        mstore(add(source, 0x20), data)
      }

      for(uint i = 0; i < 64; i++){
        byte toConvert;
        if(i%2 != 0){
            toConvert = source[i/2];
            toConvert = toConvert << 4;
            toConvert = toConvert >> 4;
            if(toConvert < 0xa){
                bytesString[i] = byte(0x30 + uint(toConvert));
            }else{
                bytesString[i] = byte(0x60 + uint(toConvert) - 0x9);
            }
        }
        else{
            toConvert = source[i/2];
            toConvert = toConvert >> 4;
            if(toConvert < 0xa){
                bytesString[i] = byte(0x30 + uint(toConvert));
            }else{
                bytesString[i] = byte(0x60 + uint(toConvert) - 0x9);
            }
        }
      }
      return string(bytesString);
  }
}
