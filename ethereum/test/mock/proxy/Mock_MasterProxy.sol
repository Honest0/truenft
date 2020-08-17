pragma solidity ^0.4.24;

contract Mock_MasterController {
  function changeController(address proxy, address newController) external {
    Mock_MasterProxy(proxy).changeController(newController);
  }

  function setTarget(address proxy, bytes4 functionSel, address newTarget) external {
    Mock_MasterProxy(proxy).setTarget(functionSel, newTarget);
  }

  function setMaster(address proxy, address newMaster) external {
    Mock_MasterProxy(proxy).setMaster(newMaster);
  }
}

contract Mock_MasterProxy{
    address public master;
    address public controller;
    mapping(bytes4 => address) public targets;

    bool paused;

    modifier onlyController {
        require(msg.sender == controller);
        _;
    }

    //Controller Functions
    function changeController(address newController) external onlyController {
        controller = newController;
    }
    function setTarget(bytes4 functionSel, address newTarget) external onlyController {
        targets[functionSel] = newTarget;
    }
    function setMaster(address newMaster) external onlyController {
        master = newMaster;
    }

    //Util functions

    function getTarget(bytes4 functionSel) external view returns(address) {
        return targets[functionSel];
    }

    function () external payable {
      require(!paused, "Contract is paused");

      // Get target from msg.sig
      address target = targets[msg.sig];
      require(target != 0, "Invalid execution target");

      assembly {
        // Copy all calldata to mem @ 0x00
        calldatacopy(0, 0, calldatasize)

        // Delegatecall the target. Copy its returndata
        let res := delegatecall(gas, target, 0, calldatasize, 0, 0)
        returndatacopy(0, 0, returndatasize)

        // If we got an error, revert data to sender. Otherwise, return data
        switch res
        case 0 { revert(0, returndatasize) }
        default { return(0, returndatasize) }
      }
    }
    constructor(address _controller) public {
      controller = _controller;
    }
}
