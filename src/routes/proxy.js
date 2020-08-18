/* SPDX-License-Identifier: MPL-2.0
 * SPDXVersion: SPDX-2.2
 * SPDX-FileCopyrightText: Copyright 2020 (C) FreightTrust and Clearing Corporation
 * All Rights Reserved - https://freighttrust.com
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/ */

const express = require("express");
const router = express.Router();
const Messages = require("../consts.js");
const utils = require("../utils.js");

/**
 * @dev Returns the target address the proxy contract will redirect to, given a function selector
 */
router.get("/proxy/getTarget", (req, res) => {
  // Validate input - must be 4 bytes hex
  if (utils.bytesVerify(req.query.id, 4)) {
    req.app.universal_contract
      .at(req.app.universal_address)
      .then(function (inst) {
        return inst.getTarget.call(req.query.id);
      })
      .then(function (target) {
        res.json({ target: target });
      })
      .catch(function (err) {
        res.status(425).send(err);
      });
  } else {
    res.status(400).send(Messages.INVALID_INPUT);
  }
});

/**
 * @dev Returns the address of the MasterProxy contract
 */
router.get("/proxy/getMaster", (req, res) => {
  req.app.universal_contract
    .at(req.app.universal_address)
    .then(function (inst) {
      return inst.getMaster.call();
    })
    .then(function (master) {
      res.json({ master: master });
    })
    .catch(function (err) {
      res.status(425).send(err);
    });
});

/**
 * @dev Returns the proxy's controller address
 */
router.get("/proxy/getController", (req, res) => {
  req.app.universal_contract
    .at(req.app.universal_address)
    .then(function (inst) {
      return inst.getController.call();
    })
    .then(function (controller) {
      res.json({ controller: controller });
    })
    .catch(function (err) {
      res.status(425).send(err);
    });
});

/**
 * @dev Returns the UniversalProxy address
 */
router.get("/proxy/getUniversalProxy", (req, res) => {
  res.json({ universalProxy: req.app.universal_address });
});

/**
 * @dev Allows the admin address to set the target address for a provided function selector.
 *      This function is analogous to a contract upgrade, allowing BA to alter the implementation
 *      of all contract functions.
 */
router.post("/proxy/setTarget", (req, res) => {
  utils.authVerify(
    req.app,
    req.body.auth.sig,
    (auth_error, invalid_message) => {
      if (auth_error) {
        res.status(425).send(auth_error);
      } else if (invalid_message) {
        res.status(400).send(invalid_message);
      } else {
        // Validate input - id is 4 bytes hex, target is an address
        req.app.setTarget(
          req.query.id,
          req.query.target,
          (res_code, res_msg) => {
            res.status(res_code).send(res_msg);
          }
        );
      }
    }
  );
});

/**
 * @dev Allows the admin address to change the master contract address to a new address.
 *      The MasterProxy contains the administrative interface, and handles routing of all
 *      calls to the contract.
 */
router.post("/proxy/changeMaster", (req, res) => {
  utils.authVerify(
    req.app,
    req.body.auth.sig,
    (auth_error, invalid_message) => {
      if (auth_error) {
        res.status(425).send(auth_error);
      } else if (invalid_message) {
        res.status(400).send(invalid_message);
      } else {
        req.app.changeMaster(req.query.newMaster, (res_code, res_msg) => {
          res.status(res_code).send(res_msg);
        });
      }
    }
  );
});

/**
 * @dev Allows the admin address to change the controller address to a new address. The
 *      controller address has permissions to access these administrative functions.
 */
router.post("/proxy/changeController", (req, res) => {
  utils.authVerify(
    req.app,
    req.body.auth.sig,
    (auth_error, invalid_message) => {
      if (auth_error) {
        res.status(425).send(auth_error);
      } else if (invalid_message) {
        res.status(400).send(invalid_message);
      } else {
        req.app.changeController(
          req.query.newController,
          (res_code, res_msg) => {
            res.status(res_code).send(res_msg);
          }
        );
      }
    }
  );
});

/**
 * @dev Allows the admin address to pause and unpause all execution in the application
 */
router.post("/proxy/pause", (req, res) => {
  utils.authVerify(
    req.app,
    req.body.auth.sig,
    (auth_error, invalid_message) => {
      if (auth_error) {
        res.status(425).send(auth_error);
      } else if (invalid_message) {
        res.status(400).send(invalid_message);
      } else {
        req.app.pause((res_code, res_msg) => {
          res.status(res_code).send(res_msg);
        });
      }
    }
  );
});

module.exports = router;
