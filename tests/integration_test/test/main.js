const async = require("async");
const app = require("../../../src/app.js");
require("dotenv").config();
const fs = require("fs-extra");
const Web3 = require("web3");
app.web3 = new Web3(
	new Web3.providers.HttpProvider(
		"https://ropsten.infura.io/v3/13063608568848709ccbad6633f87fc8"
	)
);
const ethers = require("ethers");
const admin = new ethers.Wallet(
	"0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563",
	app.web3
);
const truffle_contract = require("truffle-contract");
const contract_endpoints = require("../../../src/contract_endpoints.js");
const controller = process.env.controller;
const master = process.env.master;
const nft = process.env.nft;
const universal = process.env.universal;

// Set the authentification nonce of the app -- this nonce should be kept private on a live server
app.nonce = "Authentification nonce";
app.authorized = "0xa433f323541CF82f97395076B5F83a7A06F1646c";
app.controller_address = controller;
app.master_address = master;
app.nft_address = nft;
app.universal_address = universal;

function getPath(directories_to_strip) {
	var path = __dirname;
	var arr = __dirname.split("/");
	arr = arr.slice(0, arr.length - directories_to_strip);
	return arr.join("/") + "/";
}

app.universal_contract = truffle_contract(
	require(getPath(3) + "ethereum/build/contracts/UniversalABI.json")
);
app.universal_contract.setProvider(app.web3.currentProvider);
if (typeof app.universal_contract.currentProvider.sendAsync !== "function") {
	app.universal_contract.currentProvider.sendAsync = function () {
		return app.universal_contract.currentProvider.send.apply(
			app.universal_contract.currentProvider,
			arguments
		);
	};
}

app.controller_contract = truffle_contract(
	require(getPath(3) + "ethereum/build/contracts/Controller.json")
);
app.controller_contract.setProvider(app.web3.currentProvider);
if (typeof app.controller_contract.currentProvider.sendAsync !== "function") {
	app.controller_contract.currentProvider.sendAsync = function () {
		return app.controller_contract.currentProvider.send.apply(
			app.controller_contract.currentProvider,
			arguments
		);
	};
}

app.changeController = contract_endpoints.changeController(admin, controller);
app.changeMaster = contract_endpoints.changeMaster(admin, controller);
app.setTarget = contract_endpoints.setTarget(admin, controller);
app.pause = contract_endpoints.pause(admin, controller);

// Set up the app's proxy contract functions
app.approve = contract_endpoints.approve(admin, universal);
app.createRecord = contract_endpoints.createRecord(admin, universal);
app.safeTransferFrom = contract_endpoints.safeTransferFrom(admin, universal);
app.setApprovalForAll = contract_endpoints.setApprovalForAll(admin, universal);
app.signedTransfer = contract_endpoints.signedTransfer(admin, universal);
app.transferFrom = contract_endpoints.transferFrom(admin, universal);
app.versionRecord = contract_endpoints.versionRecord(admin, universal);
app.versionRecordSigned = contract_endpoints.versionRecordSigned(
	admin,
	universal
);

app.listen(3000, () => {
	console.log("Server listening on port 3000");
});

function error_callback(callback) {
	return (error) => {
		if (error) console.log(error);
		else callback();
	};
}

const proxy_runner = require("../scripts/proxy_runner.js");
const nft_runner = require("../scripts/nft_runner.js");

async.series(
	[
		/******************** Proxy Tests ************************/
		(callback) => {
			console.log("Set Target Test in progress");
			proxy_runner("set_target", error_callback(callback));
		},
		(callback) => {
			console.log("Check Target Test in progress");
			setTimeout(proxy_runner, 30000, "check_target", error_callback(callback));
		},
		(callback) => {
			console.log("Change Master Test in progress");
			setTimeout(
				proxy_runner,
				20000,
				"change_master",
				error_callback(callback)
			);
		},
		(callback) => {
			console.log("Check Master Test in progress");
			setTimeout(proxy_runner, 20000, "check_master", error_callback(callback));
		},
		(callback) => {
			console.log("Change Controller Test in progress");
			setTimeout(
				proxy_runner,
				20000,
				"change_controller",
				error_callback(callback)
			);
		},
		(callback) => {
			console.log("Check Controller Test in progress");
			setTimeout(
				proxy_runner,
				20000,
				"check_controller",
				error_callback(callback)
			);
		},
		(callback) => {
			require("../scripts/reset_controller.js")(callback);
		},
		(callback) => {
			setTimeout(require("../scripts/reset_master.js"), 20000, admin, callback);
		},
		/******************* NFT Tests *********************/
		(callback) => {
			setTimeout(
				nft_runner,
				20000,
				"create_record_post",
				error_callback(callback)
			);
		},
		(callback) => {
			setTimeout(
				nft_runner,
				20000,
				"create_record_getters",
				error_callback(callback)
			);
		},
		(callback) => {
			setTimeout(
				nft_runner,
				20000,
				"owner_transfer_from",
				error_callback(callback)
			);
		},
		(callback) => {
			setTimeout(
				nft_runner,
				20000,
				"owner_transfer_getters",
				error_callback(callback)
			);
		},
	],
	(error) => {
		if (error) console.log(error);
		process.exit();
	}
);
