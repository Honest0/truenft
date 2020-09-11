/* SPDX-License-Identifier: MPL-2.0
 * SPDXVersion: SPDX-2.2
 * SPDX-FileCopyrightText: Copyright 2020 (C) FreightTrust and Clearing Corporation
 * All Rights Reserved - https://freighttrust.com 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/ */

pragma solidity >=0.4.24 <0.7.0;

import "./ProxyBase.sol";

/**
 * @title UniversalProxy
 * @dev Interface for all functions implemented in this application.
 *      Delegates all execution to the default target, the MasterProxy
 */
contract UniversalProxy is ProxyBase {

  /**
   * @dev Constructor
   * @param pMaster The default delegate target for the contract
   * @param pController The permissioned controller address
   */
  constructor (address pMaster, address pController) public {
    master = pMaster;
    controller = pController;
  }


  /**
   * @dev Fallback function. Delegates execution to the master contract
   */
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
      case 0 { revert(0, returndatasize) }
      default { return(0, returndatasize) }
    }
  }
}
