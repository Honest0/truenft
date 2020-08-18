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
 * @dev Returns the ERC721 token name through which records are owned
 */
router.get("/nft/name", (req, res) => {
  req.app.nft_contract
    .at(req.app.nft_address)
    .then(function (inst) {
      return inst.name.call();
    })
    .then(function (name) {
      res.json({ name: name });
    })
    .catch(function (err) {
      res.status(425).send(err);
    });
});

/**
 * @dev Returns the ERC721 token symbol
 */
router.get("/nft/symbol", (req, res) => {
  req.app.nft_contract
    .at(req.app.nft_address)
    .then(function (inst) {
      return inst.symbol.call();
    })
    .then(function (symbol) {
      res.json({ symbol: symbol });
    })
    .catch(function (err) {
      res.status(425).send(err);
    });
});

/**
 * @dev Returns the total number of records that have been created as NFT tokens
 */
router.get("/nft/totalSupply", (req, res) => {
  req.app.nft_contract
    .at(req.app.nft_address)
    .then(function (inst) {
      return inst.totalSupply.call();
    })
    .then(function (supply) {
      res.json({ totalSupply: supply });
    })
    .catch(function (err) {
      res.status(425).send(err);
    });
});

/**
 * @dev Returns the URI metadata associated with a token
 */
router.get("/nft/tokenURI", (req, res) => {
  // Validate input - must be 256-bit unsigned
  if (utils.bytesVerify(req.query.tokenId, 32)) {
    req.app.nft_contract
      .at(req.app.nft_address)
      .then(function (inst) {
        return inst.tokenURI.call(req.query.tokenId);
      })
      .then(function (tokenURI) {
        res.json({ tokenURI: tokenURI });
      })
      .catch(function (err) {
        res.status(425).send(err);
      });
  } else {
    res.status(400).send(Messages.INVALID_INPUT);
  }
});

/**
 * @dev Returns whether or not the nft contract supports a given interface
 */
router.get("/nft/supportsInterface", (req, res) => {
  // Validate input - must be a 4 byte hex
  if (utils.bytesVerify(req.query.interfaceId, 4)) {
    req.app.nft_contract
      .at(req.app.nft_address)
      .then(function (inst) {
        return inst.supportsInterface.call(req.query.interfaceId);
      })
      .then(function (supported) {
        res.json({ supported: supported });
      })
      .catch(function (err) {
        console.log(err);
        res.status(425).send(err);
      });
  } else {
    res.status(400).send(Messages.INVALID_INPUT);
  }
});

/**
 * @dev Returns the ERC721 token id, given the index for a record
 */
router.get("/nft/tokenByIndex", (req, res) => {
  // Validate input - must be a 256-bit unsigned
  if (utils.bytesVerify(req.query.index, 32)) {
    req.app.nft_contract
      .at(req.app.nft_address)
      .then(function (inst) {
        return inst.tokenByIndex.call(req.query.index);
      })
      .then(function (tokenId) {
        res.json({ tokenId: tokenId });
      })
      .catch(function (err) {
        res.status(425).send(err);
      });
  } else {
    res.status(400).send(Messages.INVALID_INPUT);
  }
});

/**
 * @dev Returns record id owned by the owner at the given index
 */
router.get("/nft/tokenOfOwnerByIndex", (req, res) => {
  // Validate input - owner must be address, index must be 256-bit unsigned
  if (
    utils.bytesVerify(req.query.owner, 20) &&
    utils.bytesVerify(req.query.index, 32)
  ) {
    req.app.nft_contract
      .at(req.app.nft_address)
      .then(function (inst) {
        return inst.tokenOfOwnerByIndex.call(req.query.owner, req.query.index);
      })
      .then(function (tokenId) {
        res.json({ tokenId: tokenId });
      })
      .catch(function (err) {
        res.status(425).send(err);
      });
  } else {
    res.status(400).send(Messages.INVALID_INPUT);
  }
});

/**
 * @dev Returns the number of records owned by the account
 */
router.get("/nft/balanceOf", (req, res) => {
  // Validate input - owner must be an address
  if (utils.bytesVerify(req.query.owner, 20)) {
    req.app.nft_contract
      .at(req.app.nft_address)
      .then(function (inst) {
        return inst.balanceOf.call(req.query.owner);
      })
      .then(function (balance) {
        res.json({ balance: balance });
      })
      .catch(function (err) {
        res.status(425).send(err);
      });
  } else {
    res.status(400).send(Messages.INVALID_INPUT);
  }
});

/**
 * @dev Returns owner of a given token id or record
 */
router.get("/nft/ownerOf", (req, res) => {
  // Validate input - must be 256-bit unsigned
  if (utils.bytesVerify(req.query.tokenId, 32)) {
    req.app.nft_contract
      .at(req.app.nft_address)
      .then(function (inst) {
        return inst.ownerOf.call(req.query.tokenId);
      })
      .then(function (owner) {
        res.json({ owner: owner });
      })
      .catch(function (err) {
        res.status(425).send(err);
      });
  } else {
    res.status(400).send(Messages.INVALID_INPUT);
  }
});

/**
 * @dev Returns the addresses approved to transfer a record, given by its token id
 */
router.get("/nft/getApproved", (req, res) => {
  // Validate input - must be 256-bit unsigned
  if (utils.bytesVerify(req.query.tokenId, 32)) {
    req.app.nft_contract
      .at(req.app.nft_address)
      .then(function (inst) {
        return inst.getApproved.call(req.query.tokenId);
      })
      .then(function (approved) {
        res.json({ approved: approved });
      })
      .catch(function (err) {
        res.status(425).send(err);
      });
  } else {
    res.status(400).send(Messages.INVALID_INPUT);
  }
});

/**
 * @dev Returns whether or not the operator is approved to transfer all records held by the given owner
 */
router.get("/nft/isApprovedForAll", (req, res) => {
  // Validate input - both must be Ethereum addresses
  if (
    utils.bytesVerify(req.query.owner, 20) &&
    utils.bytesVerify(req.query.operator, 20)
  ) {
    req.app.nft_contract
      .at(req.app.nft_address)
      .then(function (inst) {
        return inst.isApprovedForAll.call(req.query.owner, req.query.operator);
      })
      .then(function (isApprovedForAll) {
        res.json({ isApprovedForAll: isApprovedForAll });
      })
      .catch(function (err) {
        res.status(425).send(err);
      });
  } else {
    res.status(400).send(Messages.INVALID_INPUT);
  }
});

/**
 * @dev Access the ERC721 safeTransferFrom function from the admin address. safeTransferFrom
 *      checks that the recipient supports the correct interface before sending.
 */
router.post("/nft/safeTransferFrom", (req, res) => {
  utils.authVerify(req.app, req.body.auth.sig, (error, invalid_message) => {
    if (error) {
      res.status(425).send(error);
    } else if (invalid_message) {
      res.status(400).send(invalid_message);
    } else {
      req.app.safeTransferFrom(
        req.query.from,
        req.query.to,
        req.query.tokenId,
        req.query.extraData,
        (res_code, res_msg) => {
          res.status(res_code).send(res_msg);
        }
      );
    }
  });
});

/**
 * @dev Access the ERC721 transferFrom function from the admin address. transferFrom will
 *      move a record's ownership to another address, assuming the admin has permission to access the record
 */
router.post("/nft/transferFrom", (req, res) => {
  utils.authVerify(req.app, req.body.auth.sig, (error, invalid_message) => {
    if (error) {
      res.status(425).send(error);
    } else if (invalid_message) {
      res.status(400).send(invalid_message);
    } else {
      req.app.transferFrom(
        req.query.from,
        req.query.to,
        req.query.tokenId,
        (res_code, res_msg) => {
          res.status(res_code).send(res_msg);
        }
      );
    }
  });
});

/**
 * @dev Approve records held by the admin address for transfer by another address
 */
router.post("/nft/approve", (req, res) => {
  utils.authVerify(req.app, req.body.auth.sig, (error, invalid_message) => {
    if (error) {
      res.status(425).send(error);
    } else if (invalid_message) {
      res.status(400).send(invalid_message);
    } else {
      req.app.approve(
        req.query.approved,
        req.query.tokenId,
        (res_code, res_msg) => {
          res.status(res_code).send(res_msg);
        }
      );
    }
  });
});

/**
 * @dev Approve all records held by the admin address for transfer by another address
 */
router.post("/nft/setApprovalForAll", (req, res) => {
  utils.authVerify(req.app, req.body.auth.sig, (error, invalid_message) => {
    if (error) {
      res.status(425).send(error);
    } else if (invalid_message) {
      res.status(400).send(invalid_message);
    } else {
      // Validate input - operator must be an address
      req.app.setApprovalForAll(
        req.query.operator,
        req.query.status,
        (res_code, res_msg) => {
          res.status(res_code).send(res_msg);
        }
      );
    }
  });
});

/**
 * @dev Belongs to extended interface for the BOL dapp. Executes a transfer of a record from one
 *      address to another by providing a valid signature of the owner. Allows Block Array to
 *      move records on behalf of users, given permission to do so
 */
router.post("/nft/signedTransfer", (req, res) => {
  utils.authVerify(
    req.app,
    req.body.auth.freightTrustAuth.sig,
    (error, invalid_message) => {
      if (error) {
        res.status(425).send(error);
      } else if (invalid_message) {
        res.status(400).send(invalid_message);
      } else {
        req.app.signedTransfer(
          req.query.from,
          req.query.to,
          req.query.tokenId,
          req.body.auth.senderAuth.sig,
          (res_code, res_msg) => {
            res.status(res_code).send(res_msg);
          }
        );
      }
    }
  );
});

/**
 * @dev Allows the admin address to create a new record as a new NFT token. As the record
 *      represents a bill of lading, signatures of both parties (owner of BOL and other party)
 *      are required
 */
router.post("/nft/createRecord", (req, res) => {
  utils.authVerify(
    req.app,
    req.body.auth.freightTrustAuth.sig,
    (error, invalid_message) => {
      if (error) {
        res.status(425).send(error);
      } else if (invalid_message) {
        res.status(400).send(invalid_message);
      } else {
        req.app.createRecord(
          req.query.recordId,
          req.query.owner,
          req.query.participant,
          req.body.auth.ownerAuth.sig,
          req.body.auth.partAuth.sig,
          (res_code, res_msg) => {
            res.status(res_code).send(res_msg);
          }
        );
      }
    }
  );
});

/**
 * @dev Allows the admin address to version an existing record
 */
router.post("/nft/versionRecord", (req, res) => {
  utils.authVerify(req.app, req.body.auth.sig, (error, invalid_message) => {
    if (error) {
      res.status(425).send(error);
    } else if (invalid_message) {
      res.status(400).send(invalid_message);
    } else {
      req.app.versionRecord(
        req.query.currentHash,
        req.query.newHash,
        (res_code, res_msg) => {
          res.status(res_code, res_msg);
        }
      );
    }
  });
});

/**
 * @dev Similar to /nft/signedTransfer, versionRecord/signed allows records to be versioned
 *      on behalf of their current owner, as long as the owner provides a valid signature
 */
router.post("/nft/versionRecord/signed", (req, res) => {
  utils.authVerify(
    req.app,
    req.body.auth.freightTrustAuth.sig,
    (error, invalid_message) => {
      if (error) {
        res.status(425).send(error);
      } else if (invalid_message) {
        res.status(400).send(invalid_message);
      } else {
        req.app.versionRecordSigned(
          req.query.currentHash,
          req.query.newHash,
          req.query.owner,
          req.body.auth.ownerAuth.sig,
          (res_code, res_msg) => {
            res.status(res_code).send(res_msg);
          }
        );
      }
    }
  );
});

module.exports = router;
