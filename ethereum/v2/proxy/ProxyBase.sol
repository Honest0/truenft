/* SPDX-License-Identifier: MPL-2.0
 * SPDXVersion: SPDX-2.2
 * SPDX-FileCopyrightText: Copyright 2020 (C) FreightTrust and Clearing Corporation
 * All Rights Reserved - https://freighttrust.com 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/ */

pragma solidity >=0.4.24 <0.7.0;

contract ProxyBase {

  // Key for function selector -> address mapping for proxy contracts
  bytes32 constant PROXY_TARGETS = keccak256("PROXY_TARGETS");

  // Master contract - default target for all delegatecall forwarding
  address master;
  // Controller - can perform administrative functions
  address controller;

  // Whether or not the contract is paused
  bool paused;

  // Function selector -> delegate address map
  mapping (bytes32 => mapping(bytes4 => address)) targets;
}
