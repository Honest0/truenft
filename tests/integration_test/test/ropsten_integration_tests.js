require("dotenv").config();
const contract = require("truffle-contract");
const Web3 = require("web3");
const universal = process.env.universal;
const nft = process.env.nft;
const universal_contract = contract(
  require(getPath() + "ethereum/build/contracts/UniversalABI.json")
);
universal_contract.setProvider(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/13063608568848709ccbad6633f87fc8"
  )
);
if (typeof universal_contract.currentProvider.sendAsync !== "function") {
  universal_contract.currentProvider.sendAsync = function () {
    return universal_contract.currentProvider.send.apply(
      universal_contract.currentProvider,
      arguments
    );
  };
}

universal_contract
  .at(universal)
  .then(async (inst) => {
    let controller = await inst.getController.call();
    if (
      controller.toUpperCase() ===
      "0x217Dc6A3130a6ab45942219DC4258d680BA5e160".toUpperCase()
    )
      console.log(`Test 1 Passed: The controller address is ${controller}`);
    else
      console.log(
        `Test 1 Failed: Expected ${controller} to equal 0x217Dc6A3130a6ab45942219DC4258d680BA5e160`
      );
    return inst;
  })
  .then(async (inst) => {
    let master = await inst.getMaster.call();
    if (master.toUpperCase() === process.env.mock_master.toUpperCase())
      console.log(`Test 2 Passed: The master address is ${master}`);
    else
      console.log(
        `Test 2 Failed: Expected ${master} to equal ${process.env.mock_master}`
      );
  })
  .catch((error) => {
    throw error;
  });

function getPath() {
  var path = __dirname;
  var arr = __dirname.split("/");
  arr = arr.slice(0, arr.length - 3);
  return arr.join("/") + "/";
}
