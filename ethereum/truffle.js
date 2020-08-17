/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

require("dotenv").config();
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = process.env.WALLET_MNEMONIC;

module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// to customize your Truffle configuration!
	networks: {
		ropsten: {
			provider: function () {
				return new HDWalletProvider(
					mnemonic,
					process.env.INFURA_ROPSTEN_ENDPOINT
				);
			},
			network_id: "3",
		},
	},
};
