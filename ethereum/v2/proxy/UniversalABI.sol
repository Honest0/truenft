/* SPDX-License-Identifier: MPL-2.0
 * SPDXVersion: SPDX-2.2
 * SPDX-FileCopyrightText: Copyright 2020 (C) FreightTrust and Clearing Corporation
 * All Rights Reserved - https://freighttrust.com 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/ */

pragma solidity >=0.4.24 <0.7.0;

/**
 * @title UniversalABI
 * @dev The JSON ABI of this contract can be used to interface with
 *      the entire application through the UniversalProxy
 */
contract UniversalABI {

  // Admin interface
  function pause() external;
  function changeMaster(address) external;
  function changeController(address) external;
  function setTarget(bytes4, address) external;
  function getController() external view returns (address);
  function getTarget(bytes4) external view returns (address);
  function getMaster() external view returns (address);
  // TODO extend with all implemented NFT functions
}
