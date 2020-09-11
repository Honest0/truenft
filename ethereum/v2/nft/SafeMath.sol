/* SPDX-License-Identifier: MPL-2.0
 * SPDXVersion: SPDX-2.2
 * SPDX-FileCopyrightText: Copyright 2020 (C) FreightTrust and Clearing Corporation
 * All Rights Reserved - https://freighttrust.com 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/ */

pragma solidity >=0.4.24 <0.7.0;

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
