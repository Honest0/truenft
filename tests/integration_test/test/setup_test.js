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
    // Ensure that the `approve` target is properly set
    var target = await inst.getTarget.call("0x095ea7b3");
    checkTarget("0x095ea7b3", target, nft);
    return inst;
  })
  .then(async (inst) => {
    // Ensure that the `createRecord` target is properly set
    target = await inst.getTarget.call("0x4b3f0f73");
    checkTarget("0x4b3f0f73", target, nft);
    return inst;
  })
  .then(async (inst) => {
    // Ensure that the `safeTransferFrom` with data target is properly set
    target = await inst.getTarget.call("0xb88d4fde");
    checkTarget("0xb88d4fde", target, nft);
    return inst;
  })
  .then(async (inst) => {
    // Ensure that the `safeTransferFrom` without data target is properly set
    target = await inst.getTarget.call("0x42842e0e");
    checkTarget("0x42842e0e", target, nft);
    return inst;
  })
  .then(async (inst) => {
    // Ensure that the `setApprovalForAll` target is properly set
    target = await inst.getTarget.call("0xa22cb465");
    checkTarget("0xa22cb465", target, nft);
    return inst;
  })
  .then(async (inst) => {
    // Ensure that the `signedTransfer` target is properly set
    target = await inst.getTarget.call("0x185da2bf");
    checkTarget("0x185da2bf", target, nft);
    return inst;
  })
  .then(async (inst) => {
    // Ensure that the `transferFrom` target is properly set
    target = await inst.getTarget.call("0x23b872dd");
    checkTarget("0x23b872dd", target, nft);
    return inst;
  })
  .then(async (inst) => {
    // Ensure that the `versionRecord` target is properly set
    target = await inst.getTarget.call("0x8de37a84");
    checkTarget("0x8de37a84", target, nft);
    return inst;
  })
  .then(async (inst) => {
    // Ensure that the `versionRecordSigned` target is properly set
    target = await inst.getTarget.call("0x2855a1d5");
    checkTarget("0x2855a1d5", target, nft);
    return inst;
  })
  .then(async (inst) => {
    // Ensure that the `versionRecordSigned` target is properly set
    target = await inst.getTarget.call("0x11223344");
    checkTarget("0x11223344", target, nft);
  })
  .catch((e) => {
    throw e;
  });

function checkTarget(id, actual, expected) {
  if (actual === expected) {
    console.log(`Test Passed for ${id}: Target is properly set for id: ${id}`);
  } else {
    console.log(
      `Test Failure for ${id}: Expected ${actual} to equal ${expected}`
    );
  }
}

function getPath() {
  var path = __dirname;
  var arr = __dirname.split("/");
  arr = arr.slice(0, arr.length - 3);
  return arr.join("/") + "/";
}
