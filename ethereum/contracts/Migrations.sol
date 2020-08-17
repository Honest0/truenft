/* SPDX-License-Identifier: MPL-2.0
 * SPDXVersion: SPDX-2.2
 * SPDX-FileCopyrightText: Copyright 2020 (C) FreightTrust and Clearing Corporation
 * All Rights Reserved - https://freighttrust.com 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/ */
 
pragma solidity >=0.4.24 <0.7.0;

contract Migrations {
  address public owner;
  uint public last_completed_migration;

  constructor() public {
    owner = msg.sender;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }
}
