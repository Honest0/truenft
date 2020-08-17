/* SPDX-License-Identifier: MPL-2.0
 * SPDXVersion: SPDX-2.2
 * SPDX-FileCopyrightText: Copyright 2020 (C) FreightTrust and Clearing Corporation
 * All Rights Reserved - https://freighttrust.com
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/ */
const ethers = require("ethers");
const Messages = require("./consts.js");
const utils = require("./utils.js");

module.exports = {
	/* Controller Functions */

	changeController: (wallet, controller) => {
		return (newController, callback) => {
			if (utils.bytesVerify(newController, 20))
				createAndSendTx(
					wallet,
					controller,
					"0x3cebb823",
					padLeft(newController, 32),
					callback
				);
			else callback(400, Messages.INVALID_INPUT);
		};
	},

	changeMaster: (wallet, controller) => {
		return (newMaster, callback) => {
			if (utils.bytesVerify(newMaster, 20))
				createAndSendTx(
					wallet,
					controller,
					"0xf4ff78bf",
					padLeft(newMaster, 32),
					callback
				);
			else callback(400, Messages.INVALID_INPUT);
		};
	},

	pause: (wallet, controller) => {
		return (callback) => {
			createAndSendTx(wallet, controller, "0x8456cb59", "", callback);
		};
	},

	setTarget: (wallet, controller) => {
		return (id, target, callback) => {
			if (utils.bytesVerify(id, 4) && utils.bytesVerify(target, 20))
				createAndSendTx(
					wallet,
					controller,
					"0x08af4b45",
					padRight(id, 32) + padLeft(target, 32),
					callback
				);
			else callback(400, Messages.INVALID_INPUT);
		};
	},

	/* NFT Functions */

	approve: (wallet, universal) => {
		return (approved, tokenId, callback) => {
			createAndSendTx(
				wallet,
				universal,
				"0x095ea7b3",
				padLeft(approved, 32) + padLeft(tokenId, 32),
				callback
			);
		};
	},

	createRecord: (wallet, universal) => {
		return (
			record,
			owner,
			participant,
			owner_signature,
			participant_signature,
			callback
		) => {
			// The calldata is created this way because this format is more
			// maintainable than the alternative (using lots of padLeft and padRight calls)
			let data = [
				[record, 32, true],
				[owner, 32, true],
				[participant, 32, true],
				["0xa0", 32, true],
				["0x120", 32, true],
				["0x41", 32, true],
				[owner_signature, 96, false],
				["0x41", 32, true],
				[participant_signature, 96, false],
			]
				.map((arr) => {
					if (arr[2]) {
						return padLeft(arr[0], arr[1]);
					} else {
						return padRight(arr[0], arr[1]);
					}
				})
				.join("");
			// Validate the input
			if (
				utils.bytesVerify(participant_signature, 65) &&
				utils.bytesVerify(owner_signature, 65) &&
				utils.bytesVerify(record, 32) &&
				utils.bytesVerify(owner, 20) &&
				utis.bytesVerify(participant, 20)
			)
				createAndSendTx(wallet, universal, "0x4b3f0f73", data, callback);
			else callback(400, Messages.INVALID_INPUT);
		};
	},

	safeTransferFrom: (wallet, universal) => {
		return (from, to, tokenId, extra_data, callback) => {
			let data, selector;
			// This if-else statement creates the calldata for the call to safeTransferFrom
			// FIXME - This has to go
			if (extra_data && extra_data.length - 2) {
				extra_data = extra_data.slice(2, extra_data.length);
				selector = "0xb88d4fde";
				data = [from, to, tokenId, "0x80", extra_data.length / 2]
					.map((val) => {
						return padLeft(val, 32);
					})
					.join("");
				if (extra_data.length % 64) {
					data += padRight(extra_data, (extra_data.length / 64 + 1) * 32);
				} else {
					data += extra_data;
				}
			} else {
				data = [from, to, tokenId]
					.map((val) => {
						return padLeft(val, 32);
					})
					.join("");
				selector = "0x42842e0e";
			}
			if (
				utils.bytesVerify(extra_data, extra_data.length / 2 - 1) &&
				utils.bytesVerify(tokenId, 32) &&
				utils.bytesVerify(to, 20) &&
				utils.bytesVerify(from, 20)
			)
				createAndSendTx(wallet, universal, selector, data, callback);
			else callback(400, Messages.INVALID_INPUT);
		};
	},

	setApprovalForAll: (wallet, universal) => {
		return (operator, approved, callback) => {
			// FIXME - Is this necessary?
			let approved_boolean = approved ? "0x01" : "0x00";
			if (
				utils.bytesVerify(operator, 32) &&
				utils.bytesVerify(approved_boolean, 1)
			)
				createAndSendTx(
					wallet,
					universal,
					"0xa22cb465",
					padLeft(operator, 32) + padLeft(approved_boolean, 32),
					callback
				);
			else callback(400, Messages.INVALID_INPUT);
		};
	},

	signedTransfer: (wallet, universal) => {
		return (from, to, tokenId, signature, callback) => {
			let data = [from, to, tokenId, "0x80", "0x41"]
				.map((val) => {
					return padLeft(val, 32);
				})
				.join("");
			data += padRight(signature, 96);
			if (
				utils.bytesVerify(from, 20) &&
				utils.bytesVerify(to, 20) &&
				utils.bytesVerify(tokenId, 32) &&
				utils.bytesVerify(signature, 65)
			)
				createAndSendTx(wallet, universal, "0x185da2bf", data, callback);
			else callback(400, Messages.INVALID_INPUT);
		};
	},

	transferFrom: (wallet, universal) => {
		return (from, to, tokenId, callback) => {
			let data = [from, to, tokenId].map((val) => {
				return padLeft(val, 32);
			});
			if (
				utils.bytesVerify(from, 20) &&
				utils.bytesVerify(to, 20) &&
				utils.bytesVerify(tokenId, 32)
			)
				createAndSendTx(wallet, universal, "0x23b872dd", data, callback);
			else callback(400, Messages.INVALID_INPUT);
		};
	},

	versionRecord: (wallet, universal) => {
		return (record, updated, callback) => {
			if (utils.bytesVerify(record, 32) && utils.bytesVerify(updated, 32))
				createAndSendTx(
					wallet,
					universal,
					"0x8de37a84",
					padLeft(record, 32) + padLeft(updated, 32),
					callback
				);
			else callback(400, Messages.INVALID_INPUT);
		};
	},

	versionRecordSigned: (wallet, universal) => {
		return (record, updated, owner, signature, callback) => {
			let data =
				[record, updated, owner, "0x80", "0x41"]
					.map((val) => {
						return padLeft(val, 32);
					})
					.join("") + padRight(signature, 96);
			if (
				utils.bytesVerify(record, 32) &&
				utils.bytesVerify(updated, 32) &&
				utils.bytesVerify(owner, 20) &&
				utils.bytesVerify(signature, 65)
			)
				createAndSendTx(wallet, universal, "0x2855a1d5", data, callback);
			else callback(400, Messages.INVALID_INPUT);
		};
	},
};

/*************** Ethers Helpers ****************/

function newWallet(private_key, provider) {
	return new ethers.Wallet(private_key, provider);
}

function getTransactionCount(wallet, address, callback) {
	wallet.provider.eth.getTransactionCount(address, callback);
}

function getGasPrice(wallet, callback) {
	wallet.provider.eth
		.getGasPrice()
		.then((price) => {
			callback(null, price);
		})
		.catch((error) => {
			callback(error);
		});
}

function createTx(wallet, to, function_selector, calldata, callback) {
	getGasPrice(wallet, (error, price) => {
		if (error) {
			callback(error);
		} else {
			if (wallet.nonce === undefined) {
				getTransactionCount(wallet, wallet.address, (err, nonce) => {
					wallet.nonce = nonce;
					callback(null, {
						to: to,
						gas: "0x" + toHex(5000000),
						gasPrice: "0x" + toHex(Number(price) * 2),
						gasLimit: "0x" + toHex(5000000),
						nonce: "0x" + toHex(wallet.nonce),
						value: "0x0",
						data: function_selector + calldata,
					});
				});
			} else {
				callback(null, {
					to: to,
					gas: "0x" + toHex(5000000),
					gasPrice: "0x" + toHex(Number(price) * 2),
					gasLimit: "0x" + toHex(5000000),
					nonce: "0x" + toHex(wallet.nonce),
					value: "0x0",
					data: function_selector + calldata,
				});
			}
		}
	});
}

function signTx(wallet, tx, callback) {
	wallet
		.sign(tx)
		.then((signed) => {
			callback(null, signed);
		})
		.catch((error) => {
			callback(error);
		});
}

function sendTx(wallet, tx, callback) {
	signTx(wallet, tx, (error, signed) => {
		if (error) {
			callback(425, error);
		} else {
			wallet.provider.eth.sendSignedTransaction(signed, (e, hash) => {
				if (e) {
					callback(425, e);
				} else {
					wallet.nonce++;
					callback(200, Messages.SUCCESS, hash);
				}
			});
		}
	});
}

// If I add an abi slot, this function will effectively encapsulate the process of making transactions
function createAndSendTx(wallet, to, function_selector, calldata, callback) {
	createTx(wallet, to, function_selector, calldata, (error, tx) => {
		if (error) {
			callback(425, error);
		} else {
			sendTx(wallet, tx, callback);
		}
	});
}

/*************** Hex Helpers ****************/

function toNibble(val) {
	if (val < 10) {
		return String.fromCharCode(val + 48);
	} else {
		return String.fromCharCode(val + 87);
	}
}

function toHex(val) {
	if (val < 16) {
		return toNibble(val);
	} else {
		return toHex(val / 16) + toNibble(val % 16);
	}
}

function padLeft(hex, length) {
	hex = hex.slice(2, hex.length);
	while (hex.length < 2 * length) {
		hex = "0" + hex;
	}
	return hex;
}

function padRight(hex, length) {
	hex = hex.slice(2, hex.length);
	while (hex.length < 2 * length) {
		hex = hex + "0";
	}
	return hex;
}
