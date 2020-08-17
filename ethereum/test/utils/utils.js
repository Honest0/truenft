exports.ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
exports.BYTES_12 = "000000000000000000000000";
exports.BYTES_28 = "0000000000000000000000000000000000000000000000000000000";
function pad(hex_string, length) {
	/*
  var arr = hex_string.split('')
  arr = arr.slice(2, arr.length)
  hex_string = arr.join('') 
  */
	hex_string = hex_string.slice(2, hex_string.length);
	while (hex_string.length < 2 * length) {
		hex_string = "0" + hex_string;
	}
	return hex_string;
}
exports.pad = pad;

function signTransfer(account, nonce, address, selector, from, to, tokenId) {
	let tx = {
		nonce: nonce,
		chainId: 0,
		to: address,
		data: selector + pad(from, 32) + pad(to, 32) + pad(tokenId, 32),
		value: 0,
		gasprice: 0,
		gas: 1,
	};
	return web3.eth.sign(
		selector + pad(from, 32) + pad(to, 32) + pad(tokenId, 32),
		account
	);
}
exports.signTransfer = signTransfer;
