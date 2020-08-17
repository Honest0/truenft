const util = require("util");
const { exec } = require("child_process");
const app = require("../../src/app.js");
const truffle_contract = require("truffle-contract");
const Web3 = require("web3");
const ganache = require("ganache-cli");
const ganache_web3 = new Web3(ganache.provider());
const fs = require("fs-extra");
const expect = require("chai").expect;
const ethers = require("ethers");
const contract_utils = require("../../src/contract_endpoints.js");
const owner = new ethers.Wallet(
	"0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563",
	ganache_web3
);

let Nft = artifacts.require("./NFTExtended");
let Master = artifacts.require("./MasterProxy");
let Universal = artifacts.require("./UniversalProxy");
let Controller = artifacts.require("./Controller");
let UniversalABI = artifacts.require("./UniversalABI");
let utils = require("./utils/utils.js");

app.listen(3000, () => {});

// Initialize app with the correct information from the .env file and the currently executing rpc client
app.web3 = web3;
app.web3.eth = ganache_web3.eth;
app.pk = process.env.ROPSTEN_PK;
app.key = process.env.INFURA_KEY;
app.secret = process.env.INFURA_SECRET;
// Initialize app's contract fields so that the server has access to the contract ABIs
setContractABI(app, "controller_contract", "Controller.json");
setContractABI(app, "master_contract", "MasterProxy.json");
setContractABI(app, "nft_contract", "NFTExtended.json");
setContractABI(app, "universal_contract", "UniversalABI.json");
app.nonce = 0;

function getPath() {
	var path = __dirname;
	var arr = __dirname.split("/");
	arr = arr.slice(0, arr.length - 2);
	return arr.join("/") + "/";
}

function setContractABI(_app, _contract, _abi_filename) {
	_app[_contract] = truffle_contract(
		require(getPath() + "ethereum/build/contracts/" + _abi_filename)
	);
	_app[_contract].setProvider(_app.web3.currentProvider);
	// FIXME -- This is not correct
	if (typeof _app[_contract].currentProvider.sendAsync !== "function") {
		_app[_contract].currentProvider.send.apply(
			_app[_contract].currentProvider,
			arguments
		);
	}
}

// This is NOT the configuration that a live app should have. This configuration is set up this
// way so that our tests remain independent
function setPostFunctions(_app, _wallet, _controller, _universal) {
	// Controller Functions
	_app.changeController = contract_utils.changeController(_wallet, _controller);
	_app.changeMaster = contract_utils.changeMaster(_wallet, _controller);
	_app.pause = contract_utils.pause(_wallet, _controller);
	_app.setTarget = contract_utils.setTarget(_wallet, _controller);
	// NFT Functions
	_app.approve = contract_utils.approve(_wallet, _universal);
	_app.createRecord = contract_utils.createRecord(_wallet, _universal);
	_app.safeTransferFrom = contract_utils.safeTransferFrom(_wallet, _universal);
	_app.setApprovalForAll = contract_utils.setApprovalForAll(
		_wallet,
		_universal
	);
	_app.signedTransfer = contract_utils.signedTransfer(_wallet, _universal);
	_app.transferFrom = contract_utils.transferFrom(_wallet, _universal);
	_app.versionRecord = contract_utils.versionRecord(_wallet, _universal);
	_app.versionRecordSigned = contract_utils.versionRecordSigned(
		_wallet,
		_universal
	);
}

contract("API Testing", (accounts) => {
	let controller;
	let master;
	let nft;
	let universal;
	let admin = accounts[0];

	let newman_string =
		getPath() +
		"node_modules/.bin/newman run " +
		getPath() +
		"tests/postmanTest/BlockArray.postman_collection.json --folder ";
	let nft_output_path = getPath() + "ethereum/test/logs/nft_output";
	let nft_error_path = getPath() + "ethereum/test/logs/nft_error";
	let proxy_output_path = getPath() + "ethereum/test/logs/proxy_output";
	let proxy_error_path = getPath() + "ethereum/test/logs/proxy_error";

	before(async () => {
		// Set the app's master field to be equal to the newly created Master address
		master = await Master.new().should.be.fulfilled;
		app.master_address = master.address;
		// Set the app's universal field to be equal to the newly created Universal address
		universal = await Universal.new(master.address, admin).should.be.fulfilled;
		app.universal_address = universal.address;
		universal = await UniversalABI.at(universal.address);
		// Set the app's controller field to be equal to the newly created Controller address
		controller = await Controller.new(universal.address, owner.address).should
			.be.fulfilled;
		app.controller_address = controller.address;
		// Change the controller of the universal proxy to be the controller address
		await universal.changeController(controller.address, { from: admin }).should
			.be.fulfilled;
		// Set the app's nft field to be equal to the newly created NFT address
		nft = await Nft.new().should.be.fulfilled;
		app.nft_address = nft.address;
		// Set the Post functions for the app
		// FIXME - NFT should be changed to universal eventually
		setPostFunctions(app, owner, controller.address, nft.address);
	});

	it("Postman NFT Tests", (done) => {
		exec(
			newman_string + "nft -d " + getPath() + "tests/postmanTest/nftTests.csv",
			(stderr, stdout) => {
				fs.outputFile(nft_output_path, stdout, (err) => {
					if (err) throw err;
					fs.writeFile(nft_error_path, stderr, (err) => {
						if (err) throw err;
						expect(stderr).to.be.eq(null);
						done();
					});
				});
			}
		);
	});

	it("Postman Proxy Tests", (done) => {
		exec(
			newman_string +
				"proxy -d " +
				getPath() +
				"tests/postmanTest/proxyTests.csv",
			(stderr, stdout) => {
				fs.writeFile(proxy_output_path, stdout, (err) => {
					if (err) throw err;
					fs.writeFile(proxy_error_path, stderr, (err) => {
						if (err) throw err;
						expect(stderr).to.be.eq(null);
						done();
					});
				});
			}
		);
	});
});
