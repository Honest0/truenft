pragma solidity ^0.4.24;

contract Mock_UniversalProxy {
    address public master;
    address public controller;

    bool public paused;

    constructor(address _master) public {
      controller = msg.sender;
      master = _master;
    }

    //Admin Functions
    function pause() external onlyController{
        paused = !paused; //Flips the bool on or off
    }
    function changeController(address newController) external onlyController{
        controller = newController;
    }
    modifier onlyController{
        require(msg.sender == controller);
        _;
    }

    function () external payable {
       address target = master;
       assembly {
         // Copy all calldata to mem @ 0x00
         calldatacopy(0, 0, calldatasize)

         // Delegatecall the target. Copy its returndata
         let res := delegatecall(gas, target, 0, calldatasize, 0, 0)
         returndatacopy(0, 0, returndatasize)

         // If we got an error, revert data to sender. Otherwise, return data
         switch res
         case 0 { return(0, returndatasize) }
         default { return(0, returndatasize) }
       }
   }

}
