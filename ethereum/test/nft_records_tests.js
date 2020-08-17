//// NFTRecords
//let Mock_NFTRecords = artifacts.require('./mock/nft/Mock_NFTRecords')
//// Utils
//let utils = require('./utils/utils.js')
//// Web3
//var ethers = require('ethers')
//
//function hexStrEquals(hex, expected) {
//  return web3.toAscii(hex).substring(0, expected.length) == expected;
//}
//
//function constructTxData(selector, owner, participant, tokenId) {
//  if(tokenId == null){
//    return selector.slice(2, selector.length) + utils.pad(owner, 32) + utils.pad(participant, 32)
//  }
//  else{
//    return selector.slice(2, selector.length) + utils.pad(owner, 32) + utils.pad(participant, 32) + utils.pad(tokenId, 32)
//  }
//}
//function constructRaw(nonce, to, data) {
//  return '0x' + utils.pad(nonce, 32) + utils.pad(to, 32) + data
//}
//function toHex(str) {
//	var hex = '';
//	for(var i=0;i<str.length;i++) {
//		hex += ''+str.charCodeAt(i).toString(16);
//	}
//	return hex;
//}
//
//
//contract('NFTRecords', (accounts) => {
//  let nft
//  let create_owner_sel = '0x09d4d724'
//  let create_part_sel = '0x38b2768c'
//  let transfer_sel = '0xddf252ad'
//  let version_signed_sel = '0x94d689c3'
//  // Pk is keccak256(uint(0))
//  let owner = new ethers.Wallet('0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563')
//  // Pk is keccak256(uint(1))
//  let participant = new ethers.Wallet('0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6')
//  let URI = 'This is the tokenURI'
//
//  truffleOwner  = accounts[0]
//  trufflePart = accounts[1]
//
//  before(async () => {
//    nft = await Mock_NFTRecords.new().should.be.fulfilled
//  })
//
//  describe('#signedTransfer', async () => {
//    let signature
//    let tx
//    let data
//    let messageHash
//
//    describe('`_token` specifies an invalid token', async () => {
//
//      it('should throw', async () => {
//        data = await constructTxData(transfer_sel, owner.address, participant.address, '0x0')
//        tx = await constructRaw('0x0', nft.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        signature = await owner.signMessage(ethers.utils.arrayify(messageHash))
//        await nft.signedTransfer(owner.address, participant.address, 0, signature).should.not.be.fulfilled
//      })
//
//    })
//
//    describe('`_from` address is not owner', async () => {
//      before(async () => {
//        await nft.createNFT(owner.address, participant.address, URI).should.be.fulfilled
//      })
//
//      it('should throw', async () => {
//        data = await constructTxData(transfer_sel, owner.address, participant.address, '0x0')
//        tx = await constructRaw('0x0', nft.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        signature = await owner.signMessage(ethers.utils.arrayify(messageHash))
//        await nft.signedTransfer(participant.address, owner.address, 0, signature).should.not.be.fulfilled
//      })
//    })
//
//    describe('`_to` address is address zero', async () => {
//      before(async () => {
//        await nft.createNFT(owner.address, participant.address, URI).should.be.fulfilled
//      })
//
//      it('should throw', async () => {
//        data = await constructTxData(transfer_sel, owner.address, participant.address, '0x1')
//        tx = await constructRaw('0x0', nft.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        signature = await owner.signMessage(ethers.utils.arrayify(messageHash))
//        await nft.signedTransfer(owner.address, utils.ADDRESS_ZERO, 1, signature).should.not.be.fulfilled
//      })
//    })
//
//    describe('`_sig` was not signed by the owner.address', async () => {
//      before(async () => {
//        await nft.createNFT(owner.address, participant.address, URI).should.be.fulfilled
//      })
//
//      it('should throw', async () => {
//        data = await constructTxData(transfer_sel, owner.address, participant.address, '0x2')
//        tx = await constructRaw('0x0', nft.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        signature = await participant.signMessage(ethers.utils.arrayify(messageHash))
//        await nft.signedTransfer(owner.address, participant.address, 2, signature).should.not.be.fulfilled
//      })
//    })
//
//    describe('`_sig` has incorrect `nonce`', async () => {
//      before(async () => {
//        await nft.createNFT(owner.address, participant.address, URI).should.be.fulfilled
//      })
//
//      it('should throw', async () => {
//        data = await constructTxData(transfer_sel, owner.address, participant.address, '0x3')
//        tx = await constructRaw('0x1', nft.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        signature = await owner.signMessage(ethers.utils.arrayify(messageHash))
//        await nft.signedTransfer(owner.address, participant.address, 3, signature).should.not.be.fulfilled
//      })
//    })
//
//    describe('`_sig` has incorrect contract address', async () => {
//      before(async () => {
//        await nft.createNFT(owner.address, participant.address, URI).should.be.fulfilled
//      })
//
//      it('should throw', async () => {
//        data = await constructTxData(transfer_sel, owner.address, participant.address, '0x4')
//        tx = await constructRaw('0x0', participant.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        signature = await owner.signMessage(ethers.utils.arrayify(messageHash))
//        await nft.signedTransfer(owner.address, participant.address, 4, signature).should.not.be.fulfilled
//      })
//    })
//
//    describe('`_sig` has incorrect `selector`', async () => {
//      before(async () => {
//        await nft.createNFT(owner.address, participant.address, URI).should.be.fulfilled
//      })
//
//      it('should throw', async () => {
//        data = await constructTxData(create_owner_sel, owner.address, participant.address, '0x5')
//        tx = await constructRaw('0x0', nft.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        signature = await owner.signMessage(ethers.utils.arrayify(messageHash))
//        await nft.signedTransfer(owner.address, participant.address, 5, signature).should.not.be.fulfilled
//      })
//    })
//
//    describe('`_sig` has incorrect `owner` address', async () => {
//      before(async () => {
//        await nft.createNFT(owner.address, participant.address, URI).should.be.fulfilled
//      })
//
//      it('should throw', async () => {
//        data = await constructTxData(transfer_sel, participant.address, participant.address, '0x6')
//        tx = await constructRaw('0x0', nft.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        signature = await owner.signMessage(ethers.utils.arrayify(messageHash))
//        await nft.signedTransfer(owner.address, participant.address, 6, signature).should.not.be.fulfilled
//      })
//    })
//
//    describe('`_sig` has incorrect `participant.address` address', async () => {
//      before(async () => {
//        await nft.createNFT(owner.address, participant.address, URI).should.be.fulfilled
//      })
//
//      it('should throw', async () => {
//        data = await constructTxData(transfer_sel, owner.address, owner.address, '0x7')
//        tx = await constructRaw('0x0', nft.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        signature = await owner.signMessage(ethers.utils.arrayify(messageHash))
//        await nft.signedTransfer(owner.address, participant.address, 7, signature).should.not.be.fulfilled
//      })
//    })
//
//    describe('`_sig` has incorrect `tokenId`', async () => {
//      before(async () => {
//        await nft.createNFT(owner.address, participant.address, URI).should.be.fulfilled
//      })
//
//      it('should throw', async () => {
//        data = await constructTxData(transfer_sel, owner.address, participant.address, '0x7')
//        tx = await constructRaw('0x0', nft.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        signature = await owner.signMessage(ethers.utils.arrayify(messageHash))
//        await nft.signedTransfer(owner.address, participant.address, 8, signature).should.not.be.fulfilled
//      })
//    })
//
//    describe('Valid input', async () => {
//      let events
//
//      before(async () => {
//        await nft.createNFT(owner.address, participant.address, URI).should.be.fulfilled
//        data = await constructTxData(transfer_sel, owner.address, participant.address, '0x9')
//        tx = await constructRaw('0x0', nft.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        signature = await owner.signMessage(ethers.utils.arrayify(messageHash))
//        events = await nft.signedTransfer(owner.address, participant.address, 9, signature).should.be.fulfilled.then((tx) => {
//          return tx.logs
//        })
//      })
//
//      it('should emit one Transfer event', async () => {
//        events.length.should.be.eq(1)
//        events[0].event.should.be.eq('Transfer')
//      })
//
//      it('should match `from` address', async () => {
//        hexStrEquals(events[0].args['_from'], owner.address)
//      })
//
//      it('should match `to` address', async () => {
//        hexStrEquals(events[0].args['_to'], participant.address)
//      })
//
//      it('should match `tokenId` address', async () => {
//        events[0].args['_tokenId'].toNumber().should.be.eq(9)
//      })
//    })
//  })
//
//  describe('#createRecord', async () => {
//    before(async () =>{
//      let owner = new ethers.Wallet('0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e567')
//      let participant = new ethers.Wallet('0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e863')
//    })
//
//    describe('Owner Signs the Incorrect Hash', async () => {
//      it("Should Revert", async () => {
//        hash = await ethers.utils.keccak256("0x1");
//
//        data = await constructTxData(create_owner_sel, owner.address, participant.address, ethers.utils.keccak256("0x57726f6e67"))
//        tx = await constructRaw('0x0', nft.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        signature_owner = await owner.signMessage(ethers.utils.arrayify(messageHash))
//
//        data = await constructTxData(create_part_sel, owner.address, participant.address, hash)
//        tx = await constructRaw('0x0', nft.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        signature_participant = await participant.signMessage(ethers.utils.arrayify(messageHash))
//
//        await nft.createRecord(hash, owner.address, participant.address, signature_owner, signature_participant).should.not.be.fulfilled
//      })
//    })
//    describe('Participant Signs the Incorrect Hash', async () => {
//      it("Should Revert", async () => {
//        hash = await ethers.utils.keccak256("0x1");
//
//        data = await constructTxData(create_owner_sel, owner.address, participant.address, hash)
//        tx = await constructRaw('0x0', nft.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        signature_owner = await owner.signMessage(ethers.utils.arrayify(messageHash))
//
//        data = await constructTxData(create_part_sel, owner.address, participant.address, ethers.utils.keccak256("0x57726f6e67"))
//        tx = await constructRaw('0x0', nft.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        signature_participant = await participant.signMessage(ethers.utils.arrayify(messageHash))
//
//        await nft.createRecord(hash, owner.address, participant.address, signature_owner, signature_participant).should.not.be.fulfilled
//      })
//    })
//    describe('All Data Valid', async () => {
//      it("Should Succed and Create Token", async () => {
//        nft = await Mock_NFTRecords.new().should.be.fulfilled;
//        hash = await ethers.utils.keccak256("0x1");
//
//        data = await constructTxData(create_owner_sel, owner.address, participant.address, hash)
//        tx = await constructRaw('0x0', nft.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        ownerHash = messageHash;
//        signature_owner = await owner.signMessage(ethers.utils.arrayify(messageHash))
//
//        data = await constructTxData(create_part_sel, owner.address, participant.address, hash)
//        tx = await constructRaw('0x0', nft.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        signature_participant = await participant.signMessage(ethers.utils.arrayify(messageHash))
//
//        await nft.createRecord(hash, owner.address, participant.address, signature_owner, signature_participant).should.be.fulfilled
//        assert.equal(await nft.ownerOf(hash).should.be.fulfilled , owner.address.toLowerCase())
//      })
//    })
//  })
//
//  describe('#versionRecord', async () => {
//
//    before(async () => {
//      nft = await Mock_NFTRecords.new().should.be.fulfilled
//      await nft.createNFT(truffleOwner, trufflePart, URI).should.be.fulfilled
//      await nft.createNFT(truffleOwner, trufflePart, URI).should.be.fulfilled
//    })
//    describe('Not from Owner', async () => {
//        it('Should Revert', async () => {
//          nft.versionRecord("0x0", "0x12", {from : accounts[3]}).should.be.not.fulfilled
//        })
//    })
//    describe('From Owner with invalid hash', async () => {
//      it('Should Revert', async () => {
//
//        await nft.versionRecord("0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", {from : truffleOwner}).should.not.be.fulfilled
//      })
//    })
//    describe('From Owner with valid new hash', async () => {
//        it('Transaction should execute and set owner properly', async () => {
//          await nft.versionRecord("0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000004", {from : truffleOwner})
//          let data = await nft.ownerOf("0x0000000000000000000000000000000000000000000000000000000000000001").should.be.fulfilled
//          assert.equal(data, utils.ADDRESS_ZERO);
//          owner = await nft.ownerOf("0x0000000000000000000000000000000000000000000000000000000000000004").should.be.fulfilled
//          await owner.should.be.eq(truffleOwner)
//          let newURI = await nft.tokenURI(0x0000000000000000000000000000000000000000000000000000000000000004)
//          await newURI.should.be.equal("0000000000000000000000000000000000000000000000000000000000000001")
//        })
//    })
//  })
//
//  describe('#versionRecordSigned', async (accounts) => {
//    describe('Record doesn\'t exist', async () => {
//      it("Should Revert", async () => {
//        nft = await Mock_NFTRecords.new().should.be.fulfilled
//        let owner = new ethers.Wallet('0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563')
//
//        let data = await constructTxData(version_signed_sel, "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", null)
//        let tx = await constructRaw('0x0', nft.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        sig = await owner.signMessage(ethers.utils.arrayify(messageHash))
//
//        ret = await nft.versionRecordSigned("0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", owner.address, sig).should.not.be.fulfilled
//      })
//    })
//    describe('New Record already exists', async () => {
//      it("Should Revert", async () => {
//        nft = await Mock_NFTRecords.new().should.be.fulfilled
//        let owner = new ethers.Wallet('0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563')
//        await nft.createNFT(owner.address, participant.address, URI)
//        await nft.createNFT(owner.address, participant.address, URI)
//
//        let data = await constructTxData(version_signed_sel, "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", null)
//        let tx = await constructRaw('0x0', nft.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        sig = await owner.signMessage(ethers.utils.arrayify(messageHash))
//
//        ret = await nft.versionRecordSigned("0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", owner.address, sig).should.not.be.fulfilled
//      })
//    })
//    describe('Wrong Person Signs', async () => {
//      it("Should Revert", async () => {
//        nft = await Mock_NFTRecords.new().should.be.fulfilled
//        let owner = new ethers.Wallet('0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563')
//        await nft.createNFT(owner.address, participant.address, URI)
//
//        let data = await constructTxData(version_signed_sel, "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", null)
//        let tx = await constructRaw('0x0', nft.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        sig = await participant.signMessage(ethers.utils.arrayify(messageHash))
//
//        ret = await nft.versionRecordSigned("0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", owner.address, sig).should.not.be.fulfilled
//      })
//    })
//    describe('Signed with incorrect nonce', async () => {
//      it("Should Revert", async () => {
//        nft = await Mock_NFTRecords.new().should.be.fulfilled
//        let owner = new ethers.Wallet('0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563')
//        await nft.createNFT(owner.address, participant.address, URI)
//
//        let data = await constructTxData(version_signed_sel, "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", null)
//        let tx = await constructRaw('0x1', nft.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        sig = await owner.signMessage(ethers.utils.arrayify(messageHash))
//
//        ret = await nft.versionRecordSigned("0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", owner.address, sig).should.not.be.fulfilled
//      })
//    })
//    describe('Signed with incorrect contract address', async () => {
//      it("Should Revert", async () => {
//        nft = await Mock_NFTRecords.new().should.be.fulfilled
//        let owner = new ethers.Wallet('0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563')
//        await nft.createNFT(owner.address, participant.address, URI)
//
//        let data = await constructTxData(version_signed_sel, "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", null)
//        let tx = await constructRaw('0x0', owner.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        sig = await owner.signMessage(ethers.utils.arrayify(messageHash))
//
//        ret = await nft.versionRecordSigned("0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", owner.address, sig).should.not.be.fulfilled
//      })
//    })
//    describe('Valid Data', async () => {
//      it("Should Version Record", async () => {
//        nft = await Mock_NFTRecords.new().should.be.fulfilled
//        let owner = new ethers.Wallet('0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563')
//        await nft.createNFT(owner.address, participant.address, URI)
//        await nft.createNFT(owner.address, participant.address, URI)
//
//        let data = await constructTxData(version_signed_sel, "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002", null)
//        let tx = await constructRaw('0x0', nft.address, data)
//        messageHash = await ethers.utils.keccak256(tx)
//        sig = await owner.signMessage(ethers.utils.arrayify(messageHash))
//
//        events = await nft.versionRecordSigned("0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002", owner.address, sig).then( (tx) => {
//          return tx.logs
//        })
//        events[0].event.should.be.equal("RecordUpdated");
//        data = await nft.ownerOf("0x0000000000000000000000000000000000000000000000000000000000000001").should.be.fulfilled;
//        assert.equal(data, utils.ADDRESS_ZERO);
//        let ret = await nft.ownerOf("0x0000000000000000000000000000000000000000000000000000000000000002").should.be.fulfilled;
//        assert.equal(ret, owner.address.toLowerCase());
//
//        let newURI = await nft.tokenURI(0x0000000000000000000000000000000000000000000000000000000000000002)
//        await newURI.should.be.equal("0000000000000000000000000000000000000000000000000000000000000001")
//      })
//    })
//    // describe('Valid Data', async (accounts) => {
//    //   it("Should Version Record", async () => {
//    //      nft = await Mock_NFTRecords.new().should.be.fulfilled
//    //      await nft.createNFT(truffleOwner, trufflePart, URI);
//    //
//    //      let data = await constructTxData(version_signed_sel, "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", null)
//    //      let tx = await constructRaw('0x0', nft.address, data);
//    //      let messageHash = await ethers.utils.keccak256(tx)
//    //      let sig = web3.eth.sign(owner, messageHash)
//    //      console.log(sig)
//    //
//    //      assert.equal(await nft.versionRecordSigned("0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000001", owner, sig), owner)
//    //   })
//    // })
//  })
//})
