/* SPDX-License-Identifier: MPL-2.0
 * SPDXVersion: SPDX-2.2
 * SPDX-FileCopyrightText: Copyright 2020 (C) FreightTrust and Clearing Corporation
 * All Rights Reserved - https://freighttrust.com
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/ */
const Messages = require("./consts.js");

function bytesVerify(proposed, bytes) {
	//proposed is the string to be checked, bytes is the byte size of the encoded data
	return (
		typeof proposed == "string" &&
		proposed.length == 2 * bytes + 2 &&
		isHexStrict(proposed)
	);
}
exports.bytesVerify = bytesVerify;

function uintVerify(proposed) {
	if (typeof proposed == "undefined") {
		return false;
	}
	proposed = parseInt(proposed, 10);
	return (
		proposed >= 0 &&
		proposed <
			115792089237316195423570985008687907853269984665640564039457584007913129639935
	);
}
exports.uintVerify = uintVerify;

function isHexStrict(proposed) {
	//I wrote a clone of web3.isHexStrict, so we don't have to run a node to test code
	proposed = proposed.toLowerCase();
	flag = proposed.slice(0, 2) == "0x";
	for (i = 2; i < proposed.length; i++) {
		test = proposed.charAt(i);
		flag = flag && (test <= "9" || (test >= "a" && test <= "f"));
	}
	return flag;
}

exports.isHexStrict = isHexStrict;

function authVerify(app, signature, callback) {
	if (!bytesVerify(signature, 65)) {
		callback(null, Messages.INVALID_SIGNATURE);
		return;
	}

	let recovered_address;
	try {
		recovered_address = app.web3.eth.accounts.recover(
			getNonce(app)["toBeSigned"],
			signature
		);
	} catch (error) {
		callback(error);
		return;
	}

	if (recovered_address != app.authorized)
		callback(null, Messages.INVALID_SIGNER);
	else callback();
}

exports.authVerify = authVerify;

function signatureParse(hash, signature) {
	//message, r, s, v
	return [
		hash,
		signature.slice(0, 66),
		"0x" + signature.slice(66, 110),
		"0x" + signature.slice(110),
	];
}

exports.signatureParse = signatureParse;

/**
 * @dev Return the nonce from the contract
 */
function getNonce(app) {
	return {
		toBeSigned: app.nonce,
	};
}

exports.getNonce = getNonce;
