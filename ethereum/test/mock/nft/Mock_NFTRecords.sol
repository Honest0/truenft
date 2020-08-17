pragma solidity ^0.4.23;

import "./Mock_NFTInterface.sol";

contract Mock_NFTRecords is Mock_NFTInterface {

      bytes4 internal constant transfer_sel = bytes4(keccak256('Transfer(address,address,uint256)'));
      bytes4 internal constant create_owner_sel = bytes4(keccak256('CreateRecordOwner(bytes32,address)'));
      bytes4 internal constant create_part_sel = bytes4(keccak256('CreateRecordParticipant(bytes32,address)'));
      bytes4 internal constant version_signed_sel = bytes4(keccak256('VersionRecord(bytes32,bytes32)'));
      mapping(address => uint) public nonces;
      string internal constant geth_string = "\x19Ethereum Signed Message:\n32";

      event RecordCreated(uint indexed locator, address owner, address participant);
      event RecordUpdated(uint indexed record, uint indexed updated, address owner);

      /**
       * @dev Transfers an NFT token if the message representing the transaction was signed by the `_from`.
       * @param _from The address that should own NFT at the start of the transaction
       * @param _to The recipient of the transfer
       * @param _token The id of the token to be transferred
       * @param _sig The signature that may authorize the transfer
       */
      function signedTransfer(address _from, address _to, uint _token, bytes _sig) external {
        // Ensure that the `_from` address is the owner of the token and that the token is valid
        require(tokens[_token].owner == _from && tokens[_token].owner != 0, '_from is not owner or token is not owned');
        // Ensure that the `_to` address is not address zero
        require(_to != 0);
        uint nonce = nonces[_from];
        bytes4 sel = transfer_sel;
        // Construct the hash of the message that should have been signed
        bytes32 message_hash;
        assembly {
          // Load the free_ptr
          let free_ptr := mload(0x40)
          // Place the nonce, addres of this, the transfer selector, the from address, the to address, and the token id
          mstore(free_ptr, nonce)
          mstore(add(free_ptr, 0x20), address)
          mstore(add(free_ptr, 0x40), sel)
          mstore(add(free_ptr, 0x44), _from)
          mstore(add(free_ptr, 0x64), _to)
          mstore(add(free_ptr, 0x84), _token)
          // Compute the hash of the message
          message_hash := keccak256(free_ptr, 0xa4)
          // Zero out the memory that was placed to compute the hash
          codecopy(free_ptr, codesize, 0xa4)
        }
        message_hash = keccak256(abi.encodePacked(geth_string, message_hash));

        // Ensure that the `_from` address signed the correct message
        require(ecrecoverWithSig(message_hash, _sig) == _from, '_from address did not sign or message is incorrect');
        // Increment the from address's nonce
        nonces[_from]++;
        // Transfer the token
        _transferFrom(_from, _to, _token);
        // Emit a transfer event
        emit Transfer(_from, _to, _token);
      }

      function createRecord(bytes32 _record, address _owner, address _participant, bytes _s_owner, bytes _s_part) external {
        uint owner_nonce = nonces[_owner];
        uint part_nonce = nonces[_participant];
        bytes4 owner_sel = create_owner_sel;
        bytes4 participant_sel = create_part_sel;
        bytes32 owner_hash;
        bytes32 participant_hash;
        assembly {
          // Load the free_ptr
          let free_ptr := mload(0x40)
          // Place the owner nonce, address of this, the token id, addres of the owner, and address of the participant
          mstore(free_ptr, owner_nonce)
          mstore(add(free_ptr, 0x20), address)
          mstore(add(free_ptr, 0x40), owner_sel)
          mstore(add(free_ptr, 0x44), _owner)
          mstore(add(free_ptr, 0x64), _participant)
          mstore(add(free_ptr, 0x84), _record)
          // compute the hash of the message
          owner_hash := keccak256(free_ptr, 0xa4)
          // Zero out the memory that was placed to compute the hash
          codecopy(free_ptr, codesize, 0xa4)
          // Place the nonce, gasprice, startgas, recipient address, callvalue, and calldata behind the free memory pointer in order
          mstore(free_ptr, part_nonce)
          mstore(add(free_ptr, 0x20), address)
          mstore(add(free_ptr, 0x40), participant_sel)
          mstore(add(free_ptr, 0x44), _owner)
          mstore(add(free_ptr, 0x64), _participant)
          mstore(add(free_ptr, 0x84), _record)
          // Compute the hash of the message
          participant_hash := keccak256(free_ptr, 0xa4)
          // Zero out the memory that was placed to compute the hash
          codecopy(free_ptr, codesize, 0xa4)
        }
        owner_hash = keccak256(abi.encodePacked(geth_string, owner_hash));
        participant_hash = keccak256(abi.encodePacked(geth_string, participant_hash));
        //Checks that the hashes have been signed by the right parties
        require(ecrecoverWithSig(participant_hash, _s_part) == _participant, 'Participant did not sign correct message');
        require(ecrecoverWithSig(owner_hash, _s_owner) == _owner, 'Owner did not sign correct message');
        require(!tokens[uint(_record)].exists);
        delete owner_sel;
        delete participant_sel;
        // Push the new NFT into this smart contract's token list and the owner's token list
        tokens[uint(_record)] = Token({
          owner: _owner,
          approved: 0,
          index: tokensByOwner[_owner].length,
          URI: bytes32(0),
          exists: true
        });
        tokensByOwner[_owner].push(uint(_record));
        registered.push(uint(_record));
        //Increment nonces
        nonces[_owner]++;
        nonces[_participant]++;
        // Emit a RecordCreated event
        emit RecordCreated(uint(_record), _owner, _participant);
      }

      function versionRecord(bytes32 _record, bytes32 _updated) external {
        address owner = tokens[uint(_record)].owner;
        require(owner == msg.sender, 'owner is not sender');
        require(!tokens[uint(_updated)].exists);
        tokens[uint(_updated)] = tokens[uint(_record)];
        tokens[uint(_updated)].URI = _record;
        tokens[uint(_record)].owner = 0;
        tokens[uint(_record)].approved = 0;
        emit RecordUpdated(uint(_record), uint(_updated), owner);
      }

      function versionRecordSigned(bytes32 _record, bytes32 _updated, address _owner, bytes _sig) external {
        require(tokens[uint(_record)].owner == _owner);

        bytes4 sel = version_signed_sel;
        uint owner_nonce = nonces[_owner];
        bytes32 message_hash;
        assembly {
          let free_ptr := mload(0x40)
          // Place the nonce, address of this contract, selector, _record, and _updated at the free memory pointer
          mstore(free_ptr, owner_nonce)
          mstore(add(free_ptr, 0x20), address)
          mstore(add(free_ptr, 0x40), sel)
          mstore(add(free_ptr, 0x44), _record)
          mstore(add(free_ptr, 0x64), _updated)
          // Compute the hash of the message
          message_hash := keccak256(free_ptr, 0x84)
          // Zero out the memory that was placed to compute the hash
          codecopy(free_ptr, codesize, 0x84)
        }
        message_hash = keccak256(abi.encodePacked(geth_string, message_hash));

        require(ecrecoverWithSig(message_hash, _sig) == _owner, 'Owner did not sign correct message');
        require(!tokens[uint(_updated)].exists);

        tokens[uint(_updated)] = tokens[uint(_record)];
        tokens[uint(_updated)].URI = _record;
        tokens[uint(_record)].owner = 0;
        tokens[uint(_record)].approved = 0;
        //Increment nonce
        nonces[_owner]++;
        emit RecordUpdated(uint(_record), uint(_updated), _owner);
      }

    function ecrecoverWithSig(bytes32 hash, bytes memory _sig) internal pure returns (address) {
      bytes32 r;
      bytes32 s;
      uint8 v;
      assembly {
        // If the signature doesn't have a length of 65, throw
        if iszero(eq(mload(_sig), 0x41)) {
          revert(0x0, 0x0)
        }
        s := mload(add(_sig, 0x20))
        r := mload(add(_sig, 0x40))
        v := mload(add(_sig, 0x41))
      }
      if(v < 27){
        v += 27;
      }
      return ecrecover(hash, v, s, r);
    }
    function getFormat(bytes32 hash) external pure returns(bytes32){
      return keccak256(abi.encodePacked(geth_string, hash));
    }
}
