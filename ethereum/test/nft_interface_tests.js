//// NFTInterface
//let Mock_NFTInterface = artifacts.require('./mock/nft/Mock_NFTInterface')
//// NFTERC721TokenReceiver
//let Mock_ERC721TokenReceiver = artifacts.require('./mock/nft/Mock_ERC721TokenReceiver')
//// Empty
//let Mock_Empty = artifacts.require('./mock/Mock_Empty')
//// Utils
//let utils = require('./utils/utils.js')
//
//function hexStrEquals(hex, expected) {
//  return web3.toAscii(hex).substring(0, expected.length) == expected;
//}
//
//contract('NFTInterface', function (accounts) {
//
//  let nft
//  let nft_owner = accounts[0]
//  let nft_approved = accounts[1]
//  let new_approved = accounts[2]
//  let nft_operator = accounts[3]
//  let not_authorized = accounts[4]
//  let URI = 'This is the tokenURI'
//
//  describe('ERC721Metadata', async () => {
//
//    let tokenId = 0
//
//    before(async () => {
//      nft = await Mock_NFTInterface.new().should.be.fulfilled
//    })
//
//
//    describe('#tokenURI', async () => {
//      before(async () => {
//        await nft.createNFT(nft_owner, nft_approved, URI)
//      })
//
//      it('should return the correct tokenURI', async () => {
//        let tokenURI = await nft.tokenURI.call(0).should.be.fulfilled
//        hexStrEquals(tokenURI, URI)
//      })
//    })
//
//    describe('#name', async () => {
//      it('should return the correct name', async () => {
//        let name = await nft.name.call().should.be.fulfilled
//        hexStrEquals(name, 'Bill of Lading')
//      })
//    })
//
//    describe('#symbol', async () => {
//      it('should return the correct symbol', async () => {
//        let symbol = await nft.symbol.call().should.be.fulfilled
//        hexStrEquals(symbol, 'BOL')
//      })
//    })
//  })
//
//  describe('ERC165', async () => {
//    describe('#supportsInterface', async () => {
//      let supported
//
//      before(async () => {
//        nft = await Mock_NFTInterface.new().should.be.fulfilled
//      })
//
//
//      describe('`interfaceId` references an unsupported interface', async () => {
//        it('should return false', async () => {
//          supported = await nft.supportsInterface.call('0x00000000').should.be.fulfilled
//          supported.should.be.eq(false)
//        })
//      })
//
//      describe('`interfaceId` references a supported interface', async () => {
//        let interfaceId = '0xaabbccdd'
//
//        before(async () => {
//          await nft.addInterface(interfaceId).should.be.fulfilled
//        })
//
//        it('should return true for supported interfaces', async () => {
//          supported = await nft.supportsInterface.call('0xaabbccdd').should.be.fulfilled
//          supported.should.be.eq(true)
//        })
//      })
//    })
//  })
//
//  describe('ERC721Enumerable', async () => {
//
//
//    describe('#totalSupply', async () => {
//      let totalSupply
//
//      before(async () => {
//        nft = await Mock_NFTInterface.new().should.be.fulfilled
//      })
//
//      it('should be zero before tokens have been added', async () => {
//        totalSupply = await nft.totalSupply.call().should.be.fulfilled
//        totalSupply.toNumber().should.be.eq(0)
//      })
//
//      it('should be one after one token has been added', async () => {
//        await nft.createNFT(nft_owner, nft_approved, URI)
//        totalSupply = await nft.totalSupply.call().should.be.fulfilled
//        totalSupply.toNumber().should.be.eq(1)
//      })
//
//    })
//
//    describe('#tokenByIndex', async () => {
//
//      before(async () => {
//        nft = await Mock_NFTInterface.new().should.be.fulfilled
//      })
//
//      describe('`_index` is equal to `totalSupply()`', async () => {
//        it('should throw', async () => {
//          await nft.tokenByIndex(0).should.not.be.fulfilled
//        })
//      })
//
//      describe('`_index` is greater than `totalSupply()`', async () => {
//        it('should throw', async () => {
//          await nft.tokenByIndex(1).should.not.be.fulfilled
//        })
//      })
//
//      describe('`_index` is less than `totalSupply()`', async () => {
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//        })
//
//        it('should return the correct `tokenId`', async () => {
//          let tokenId = await nft.tokenByIndex.call(0).should.be.fulfilled
//          tokenId.toNumber().should.be.eq(0)
//        })
//      })
//    })
//
//    describe('#tokenOfOwnerByIndex', async () => {
//
//      let tokenId
//
//      before(async () => {
//        nft = await Mock_NFTInterface.new().should.be.fulfilled
//      })
//
//      describe('`_owner` is the zero address', async () => {
//        before(async () => {
//          await nft.createNFT(utils.ADDRESS_ZERO, nft_approved, URI).should.be.fulfilled
//        })
//
//        it('should throw', async () => {
//          await nft.tokenOfOwnerByIndex(utils.ADDRESS_ZERO, 0).should.not.be.fulfilled
//        })
//      })
//
//      describe('`_index` is equal to `balanceOf(_owner)`', async () => {
//        it('should throw', async () => {
//          await nft.tokenOfOwnerByIndex(nft_owner, 0).should.not.be.fulfilled
//        })
//      })
//
//      describe('`_index` is greater than `balanceOf(_owner)`', async () => {
//        it('should throw', async () => {
//          await nft.tokenOfOwnerByIndex(nft_owner, 1).should.not.be.fulfilled
//        })
//      })
//
//      describe('`_index` is less than `balanceOf(_owner)`', async () => {
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//        })
//
//        it('should return the correct `tokenId`', async () => {
//          let tokenId = await nft.tokenOfOwnerByIndex.call(nft_owner, 0).should.be.fulfilled
//          tokenId.toNumber().should.be.eq(1)
//        })
//      })
//
//    })
//
//  })
//
//  describe('ERC721', async () => {
//
//    describe('#approve', async () => {
//
//      let approved
//      let events
//
//      before(async () => {
//        nft = await Mock_NFTInterface.new().should.be.fulfilled
//        let events = await nft.setApprovalForAll(
//          nft_operator,
//          true,
//          { from: nft_owner }
//        ).should.be.fulfilled.then((tx) => {
//          return tx.logs
//        })
//        events.length.should.be.eq(1)
//        events[0].event.should.be.eq('ApprovalForAll')
//        events[0].args['_owner'].should.be.eq(nft_owner)
//        events[0].args['_operator'].should.be.eq(nft_operator)
//        events[0].args['_approved'].should.be.eq(true)
//      })
//
//
//      describe('`from` address isn\'t authorized', async () => {
//        before(async () => {
//          await nft.createNFT(nft_owner, utils.ADDRESS_ZERO, URI)
//        })
//
//        it('should throw', async () => {
//          await nft.approve(new_approved, 0, { from: not_authorized }).should.not.be.fulfilled
//        })
//      })
//
//      describe('`from` address is operator', async () => {
//
//        before(async () => {
//          await nft.createNFT(nft_owner, utils.ADDRESS_ZERO, URI)
//          events = await nft.approve(
//            new_approved,
//            1,
//            { from: nft_operator }
//          ).should.be.fulfilled.then((tx) => {
//            return tx.logs
//          })
//        })
//
//        it('should emit one Approval event', async () => {
//          events.length.should.be.eq(1)
//          events[0].event.should.be.eq('Approval')
//        })
//
//        it('should match `_owner`', async () => {
//          events[0].args['_owner'].should.be.eq(nft_owner)
//        })
//
//        it('should match `_approved`', async () => {
//          events[0].args['_approved'].should.be.eq(new_approved)
//        })
//
//        it('should match `_tokenId`', async () => {
//          events[0].args['_tokenId'].toNumber().should.be.eq(1)
//        })
//      })
//
//      describe('`from` address is owner', async () => {
//        before(async () => {
//          await nft.createNFT(nft_owner, utils.ADDRESS_ZERO, URI)
//          events = await nft.approve(
//            new_approved,
//            2,
//            { from: nft_owner }
//          ).should.be.fulfilled.then((tx) => {
//            return tx.logs
//          })
//        })
//
//        it('should emit one Approval event', async () => {
//          events.length.should.be.eq(1)
//          events[0].event.should.be.eq('Approval')
//        })
//
//        it('should match `_owner`', async () => {
//          events[0].args['_owner'].should.be.eq(nft_owner)
//        })
//
//        it('should match `_approved`', async () => {
//          events[0].args['_approved'].should.be.eq(new_approved)
//        })
//
//        it('should match `_tokenId`', async () => {
//          events[0].args['_tokenId'].toNumber().should.be.eq(2)
//        })
//      })
//
//    })
//
//    describe('#balanceOf', async () => {
//
//      let balance
//
//      before(async () => {
//        nft = await Mock_NFTInterface.new().should.be.fulfilled
//      })
//
//      describe('`owner` is the zero address', async () => {
//        it('should throw', async () => {
//          await nft.balanceOf(utils.ADDRESS_ZERO).should.not.be.fulfilled
//        })
//      })
//
//      describe('`owner` isn\'t zero address', async () => {
//
//        it('should return zero if owner does not hold NFT tokens', async () => {
//          balance = await nft.balanceOf.call(nft_owner).should.be.fulfilled
//          balance.toNumber().should.be.eq(0)
//        })
//
//        it('should return one if the owner has one NFT token', async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//          balance = await nft.balanceOf.call(nft_owner).should.be.fulfilled
//          balance.toNumber().should.be.eq(1)
//        })
//
//      })
//    })
//
//    describe('#getApproved', async () => {
//
//      before(async () => {
//        nft = await Mock_NFTInterface.new().should.be.fulfilled
//      })
//
//      describe('`tokenId` references an invalid token', async () => {
//
//        let invalidId = 0
//
//        it('should throw', async () => {
//          await nft.getApproved(invalidId).should.not.be.fulfilled
//        })
//
//      })
//
//      describe('`tokenId` references a valid token', async () => {
//
//        let tokenId = 0
//
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//        })
//
//        it('should return the correct `approved` address', async () => {
//          let approved = await nft.getApproved.call(tokenId).should.be.fulfilled
//          approved.should.be.eq(nft_approved)
//        })
//
//      })
//
//    })
//
//    describe('#isApprovedForAll', async () => {
//
//      before(async () => {
//        nft = await Mock_NFTInterface.new().should.be.fulfilled
//      })
//
//      describe('`operator` is not approved for all', async () => {
//        it('should return false', async () => {
//          let isApprovedForAll = await nft.isApprovedForAll.call(nft_owner, nft_operator).should.be.fulfilled
//          isApprovedForAll.should.be.eq(false)
//        })
//      })
//
//      describe('`operator` is approved for all', async () => {
//
//        before(async () => {
//          await nft.setApprovalForAll(nft_operator, true, { from: nft_owner }).should.be.fulfilled
//        })
//
//        it('should return true', async () => {
//          let isApprovedForAll = await nft.isApprovedForAll.call(nft_owner, nft_operator).should.be.fulfilled
//          isApprovedForAll.should.be.eq(true)
//        })
//      })
//
//    })
//
//    describe('#ownerOf', async () => {
//
//      before(async () => {
//        nft = await Mock_NFTInterface.new().should.be.fulfilled
//      })
//
//      describe('`tokenId` references an invalid token', async () => {
//        it('should throw', async () => {
//          await nft.ownerOf(0).should.not.be.fulfilled
//        })
//      })
//
//      describe('`tokenId` references a valid token', async () => {
//        let tokenId = 0
//
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//        })
//
//        it('should return the correct `owner` address', async () => {
//          let owner = await nft.ownerOf.call(tokenId).should.be.fulfilled
//          owner.should.be.eq(nft_owner)
//        })
//      })
//
//    })
//
//    describe('#safeTransferFrom', async () => {
//      let empty
//      let nft_receiver
//
//      before(async () => {
//        empty = await Mock_Empty.new().should.be.fulfilled
//        nft = await Mock_NFTInterface.new().should.be.fulfilled
//        nft_receiver = await Mock_ERC721TokenReceiver.new().should.be.fulfilled
//        let events = await nft.setApprovalForAll(
//          nft_operator,
//          true,
//          { from: nft_owner }
//        ).should.be.fulfilled.then((tx) => {
//          return tx.logs
//        })
//        events.length.should.be.eq(1)
//        events[0].event.should.be.eq('ApprovalForAll')
//        events[0].args['_owner'].should.be.eq(nft_owner)
//        events[0].args['_operator'].should.be.eq(nft_operator)
//        events[0].args['_approved'].should.be.eq(true)
//      })
//
//      describe('`from` is not owner', async () => {
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//        })
//
//        it('should throw', async () => {
//          await nft.safeTransferFrom(nft_approved, nft_receiver, 0, { from: nft_owner }).should.not.be.fulfilled
//        })
//      })
//
//      describe('`sender` is not owner, approved, or operator', async () => {
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//        })
//
//        it('should throw', async () => {
//          await nft.safeTransferFrom(nft_owner, nft_receiver, 1, { from: not_authorized }).should.not.be.fulfilled
//        })
//      })
//
//      describe('`to` is the zero address', async () => {
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//        })
//
//        it('should throw', async () => {
//          await nft.safeTransferFrom(nft_owner, utils.ADDRESS_ZERO, 2, { from: nft_owner }).should.not.be.fulfilled
//        })
//      })
//
//      describe('`to` is a contract but not an ERC721TokenReceiver', async () => {
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//        })
//
//        it('should throw', async () => {
//          await nft.safeTransferFrom(nft_owner, empty.address, 3, { from: nft_owner }).should.not.be.fulfilled
//        })
//      })
//
//      describe('`tokenId` references an invalid NFT token', async () => {
//        it('should throw', async () => {
//          await nft.safeTransferFrom(nft_owner, nft_approved, 4, { from: nft_owner }).should.not.be.fulfilled
//        })
//      })
//
//      describe('`from` is owner, `sender` is owner, `to` is an ERC721TokenReceiver', async () => {
//        let events
//
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//          events = await nft.safeTransferFrom(
//            nft_owner,
//            nft_receiver.address,
//            4,
//            { from: nft_owner }
//          ).should.be.fulfilled.then((tx) => {
//            return tx.logs
//          })
//        })
//
//        it('should emit one Transfer event', async () => {
//          events.length.should.be.eq(1)
//          events[0].event.should.be.eq('Transfer')
//        })
//
//        it('should match `_from`', async () => {
//          events[0].args['_from'].should.be.eq(nft_owner)
//        })
//
//        it('should match `_to`', async () => {
//          events[0].args['_to'].should.be.eq(nft_receiver.address)
//        })
//
//        it('should match `_tokenId`', async () => {
//          events[0].args['_tokenId'].toNumber().should.be.eq(4)
//        })
//      })
//
//      describe('`from` is owner, `sender` is owner, `to` is not a contract', async () => {
//        let events
//
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//          events = await nft.safeTransferFrom(
//            nft_owner,
//            not_authorized,
//            5,
//            { from: nft_owner }
//          ).should.be.fulfilled.then((tx) => {
//            return tx.logs
//          })
//        })
//
//        it('should emit one Transfer event', async () => {
//          events.length.should.be.eq(1)
//          events[0].event.should.be.eq('Transfer')
//        })
//
//        it('should match `_from`', async () => {
//          events[0].args['_from'].should.be.eq(nft_owner)
//        })
//
//        it('should match `_to`', async () => {
//          events[0].args['_to'].should.be.eq(not_authorized)
//        })
//
//        it('should match `_tokenId`', async () => {
//          events[0].args['_tokenId'].toNumber().should.be.eq(5)
//        })
//      })
//
//      describe('`from` is owner, `sender` is approved, `to` is an ERC721TokenReceiver', async () => {
//        let events
//
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//          events = await nft.safeTransferFrom(
//            nft_owner,
//            nft_receiver.address,
//            6,
//            { from: nft_approved }
//          ).should.be.fulfilled.then((tx) => {
//            return tx.logs
//          })
//        })
//
//        it('should emit one Transfer event', async () => {
//          events.length.should.be.eq(1)
//          events[0].event.should.be.eq('Transfer')
//        })
//
//        it('should match `_from`', async () => {
//          events[0].args['_from'].should.be.eq(nft_owner)
//        })
//
//        it('should match `_to`', async () => {
//          events[0].args['_to'].should.be.eq(nft_receiver.address)
//        })
//
//        it('should match `_tokenId`', async () => {
//          events[0].args['_tokenId'].toNumber().should.be.eq(6)
//        })
//
//      })
//
//      describe('`from` is owner, `sender` is approved, `to` is not a contract', async () => {
//        let events
//
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//          events = await nft.safeTransferFrom(
//            nft_owner,
//            not_authorized,
//            7,
//            { from: nft_approved }
//          ).should.be.fulfilled.then((tx) => {
//            return tx.logs
//          })
//        })
//
//        it('should emit one Transfer event', async () => {
//          events.length.should.be.eq(1)
//          events[0].event.should.be.eq('Transfer')
//        })
//
//        it('should match `_from`', async () => {
//          events[0].args['_from'].should.be.eq(nft_owner)
//        })
//
//        it('should match `_to`', async () => {
//          events[0].args['_to'].should.be.eq(not_authorized)
//        })
//
//        it('should match `_tokenId`', async () => {
//          events[0].args['_tokenId'].toNumber().should.be.eq(7)
//        })
//
//      })
//
//      describe('`from` is owner, `sender` is operator, `to` is an ERC721TokenReceiver', async () => {
//        let events
//
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//          events = await nft.safeTransferFrom(
//            nft_owner,
//            nft_receiver.address,
//            8,
//            { from: nft_operator }
//          ).should.be.fulfilled.then((tx) => {
//            return tx.logs
//          })
//        })
//
//        it('should emit one Transfer event', async () => {
//          events.length.should.be.eq(1)
//          events[0].event.should.be.eq('Transfer')
//        })
//
//        it('should match `_from`', async () => {
//          events[0].args['_from'].should.be.eq(nft_owner)
//        })
//
//        it('should match `_to`', async () => {
//          events[0].args['_to'].should.be.eq(nft_receiver.address)
//        })
//
//        it('should match `_tokenId`', async () => {
//          events[0].args['_tokenId'].toNumber().should.be.eq(8)
//        })
//
//      })
//
//      describe('`from` is owner, `sender` is operator, `to` is not a contract', async () => {
//        let events
//
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//          events = await nft.safeTransferFrom(
//            nft_owner,
//            not_authorized,
//            9,
//            { from: nft_operator }
//          ).should.be.fulfilled.then((tx) => {
//            return tx.logs
//          })
//        })
//
//        it('should emit one Transfer event', async () => {
//          events.length.should.be.eq(1)
//          events[0].event.should.be.eq('Transfer')
//        })
//
//        it('should match `_from`', async () => {
//          events[0].args['_from'].should.be.eq(nft_owner)
//        })
//
//        it('should match `_to`', async () => {
//          events[0].args['_to'].should.be.eq(not_authorized)
//        })
//
//        it('should match `_tokenId`', async () => {
//          events[0].args['_tokenId'].toNumber().should.be.eq(9)
//        })
//
//      })
//
//    })
//
//    describe('#setApprovalForAll', async () => {
//
//      before(async () => {
//        nft = await Mock_NFTInterface.new().should.be.fulfilled
//      })
//
//      describe('`_approved` is false', async () => {
//        let events
//
//        before(async () => {
//          events = await nft.setApprovalForAll(
//            nft_operator,
//            false,
//            { from: nft_owner }
//          ).should.be.fulfilled.then((tx) => {
//            return tx.logs
//          })
//        })
//
//        it('should emit one ApprovalForAll event', async () => {
//          events.length.should.be.eq(1)
//          events[0].event.should.be.eq('ApprovalForAll')
//        })
//
//        it('should match `_owner`', async () => {
//          events[0].args['_owner'].should.be.eq(nft_owner)
//        })
//
//        it('should match `_operator`', async () => {
//          events[0].args['_operator'].should.be.eq(nft_operator)
//        })
//
//        it('should match `_approved`', async () => {
//          events[0].args['_approved'].should.be.eq(false)
//        })
//
//        it('should set `operator`\'s status to `_approved`', async () => {
//          let isApprovedForAll = await nft.isApprovedForAll.call(nft_owner, nft_operator).should.be.fulfilled
//          isApprovedForAll.should.be.eq(false)
//        })
//
//      })
//
//      describe('`_approved` is true', async () => {
//        let events
//
//        before(async () => {
//          events = await nft.setApprovalForAll(
//            nft_operator,
//            true,
//            { from: nft_owner }
//          ).should.be.fulfilled.then((tx) => {
//            return tx.logs
//          })
//        })
//
//        it('should emit one ApprovalForAll event', async () => {
//          events.length.should.be.eq(1)
//          events[0].event.should.be.eq('ApprovalForAll')
//        })
//
//        it('should match `_owner`', async () => {
//          events[0].args['_owner'].should.be.eq(nft_owner)
//        })
//
//        it('should match `_operator`', async () => {
//          events[0].args['_operator'].should.be.eq(nft_operator)
//        })
//
//        it('should match `_approved`', async () => {
//          events[0].args['_approved'].should.be.eq(true)
//        })
//
//        it('should set `operator`\'s status to `_approved`', async () => {
//          let isApprovedForAll = await nft.isApprovedForAll.call(nft_owner, nft_operator).should.be.fulfilled
//          isApprovedForAll.should.be.eq(true)
//        })
//
//      })
//
//    })
//
//    describe('#transferFrom', async () => {
//      let empty
//
//      before(async () => {
//        empty = await Mock_Empty.new().should.be.fulfilled
//        nft = await Mock_NFTInterface.new().should.be.fulfilled
//        let approvalEvents = await nft.setApprovalForAll(
//          nft_operator,
//          true,
//          { from: nft_owner }
//        ).should.be.fulfilled.then((tx) => {
//          return tx.logs
//        })
//        approvalEvents.length.should.be.eq(1)
//        approvalEvents[0].event.should.be.eq('ApprovalForAll')
//        approvalEvents[0].args['_owner'].should.be.eq(nft_owner)
//        approvalEvents[0].args['_operator'].should.be.eq(nft_operator)
//        approvalEvents[0].args['_approved'].should.be.eq(true)
//      })
//
//      describe('`from` is not owner', async () => {
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//        })
//
//        it('should throw', async () => {
//          await nft.safeTransferFrom(nft_approved, nft_approved, 0, { from: nft_owner }).should.not.be.fulfilled
//        })
//      })
//
//      describe('`sender` is not owner, approved, or operator', async () => {
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//        })
//
//        it('should throw', async () => {
//          await nft.transferFrom(nft_owner, nft_approved, 1, { from: not_authorized }).should.not.be.fulfilled
//        })
//      })
//
//      describe('`to` is the zero address', async () => {
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//        })
//
//        it('should throw', async () => {
//          await nft.transferFrom(nft_owner, utils.ADDRESS_ZERO, 2, { from: nft_owner }).should.not.be.fulfilled
//        })
//      })
//
//      describe('`tokenId` references an invalid NFT token', async () => {
//        it('should throw', async () => {
//          await nft.transferFrom(nft_owner, nft_approved, 3, { from: nft_owner }).should.not.be.fulfilled
//        })
//      })
//
//      describe('`from` is owner, `sender` is owner, `to` is not a contract or the zero address', async () => {
//        let events
//
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//          events = await nft.transferFrom(
//            nft_owner,
//            nft_approved,
//            3,
//            { from: nft_owner }
//          ).should.be.fulfilled.then((tx) => {
//            return tx.logs
//          })
//        })
//
//        it('should emit one Transfer event', async () => {
//          events.length.should.be.eq(1)
//          events[0].event.should.be.eq('Transfer')
//        })
//
//        it('should match `_from`', async () => {
//          events[0].args['_from'].should.be.eq(nft_owner)
//        })
//
//        it('should match `_to`', async () => {
//          events[0].args['_to'].should.be.eq(nft_approved)
//        })
//
//        it('should match `_tokenId`', async () => {
//          events[0].args['_tokenId'].toNumber().should.be.eq(3)
//        })
//
//      })
//
//      describe('`from` is owner, `sender` is owner, `to` is a contract', async () => {
//        let events
//
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//          events = await nft.transferFrom(
//            nft_owner,
//            empty.address,
//            4,
//            { from: nft_owner }
//          ).should.be.fulfilled.then((tx) => {
//            return tx.logs
//          })
//        })
//
//        it('should emit one Transfer event', async () => {
//          events.length.should.be.eq(1)
//          events[0].event.should.be.eq('Transfer')
//        })
//
//        it('should match `_from`', async () => {
//          events[0].args['_from'].should.be.eq(nft_owner)
//        })
//
//        it('should match `_to`', async () => {
//          events[0].args['_to'].should.be.eq(empty.address)
//        })
//
//        it('should match `_tokenId`', async () => {
//          events[0].args['_tokenId'].toNumber().should.be.eq(4)
//        })
//
//      })
//
//      describe('`from` is owner, `sender` is approved, `to` is not a contract or the zero address', async () => {
//        let events
//
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//          events = await nft.transferFrom(
//            nft_owner,
//            nft_approved,
//            5,
//            { from: nft_approved }
//          ).should.be.fulfilled.then((tx) => {
//            return tx.logs
//          })
//        })
//
//        it('should emit one Transfer event', async () => {
//          events.length.should.be.eq(1)
//          events[0].event.should.be.eq('Transfer')
//        })
//
//        it('should match `_from`', async () => {
//          events[0].args['_from'].should.be.eq(nft_owner)
//        })
//
//        it('should match `_to`', async () => {
//          events[0].args['_to'].should.be.eq(nft_approved)
//        })
//
//        it('should match `_tokenId`', async () => {
//          events[0].args['_tokenId'].toNumber().should.be.eq(5)
//        })
//
//      })
//
//      describe('`from` is owner, `sender` is approved, `to` is a contract', async () => {
//        let events
//
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//          events = await nft.transferFrom(
//            nft_owner,
//            empty.address,
//            6,
//            { from: nft_approved }
//          ).should.be.fulfilled.then((tx) => {
//            return tx.logs
//          })
//        })
//
//        it('should emit one Transfer event', async () => {
//          events.length.should.be.eq(1)
//          events[0].event.should.be.eq('Transfer')
//        })
//
//        it('should match `_from`', async () => {
//          events[0].args['_from'].should.be.eq(nft_owner)
//        })
//
//        it('should match `_to`', async () => {
//          events[0].args['_to'].should.be.eq(empty.address)
//        })
//
//        it('should match `_tokenId`', async () => {
//          events[0].args['_tokenId'].toNumber().should.be.eq(6)
//        })
//
//      })
//      describe('`from` is owner, `sender` is operator, `to` is not a contract or the zero address', async () => {
//        let events
//
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//          events = await nft.transferFrom(
//            nft_owner,
//            nft_approved,
//            7,
//            { from: nft_operator }
//          ).should.be.fulfilled.then((tx) => {
//            return tx.logs
//          })
//        })
//
//        it('should emit one Transfer event', async () => {
//          events.length.should.be.eq(1)
//          events[0].event.should.be.eq('Transfer')
//        })
//
//        it('should match `_from`', async () => {
//          events[0].args['_from'].should.be.eq(nft_owner)
//        })
//
//        it('should match `_to`', async () => {
//          events[0].args['_to'].should.be.eq(nft_approved)
//        })
//
//        it('should match `_tokenId`', async () => {
//          events[0].args['_tokenId'].toNumber().should.be.eq(7)
//        })
//
//      })
//
//      describe('`from` is owner, `sender` is operator, `to` is a contract', async () => {
//        let events
//
//        before(async () => {
//          await nft.createNFT(nft_owner, nft_approved, URI).should.be.fulfilled
//          events = await nft.transferFrom(
//            nft_owner,
//            empty.address,
//            8,
//            { from: nft_operator }
//          ).should.be.fulfilled.then((tx) => {
//            return tx.logs
//          })
//        })
//
//        it('should emit one Transfer event', async () => {
//          events.length.should.be.eq(1)
//          events[0].event.should.be.eq('Transfer')
//        })
//
//        it('should match `_from`', async () => {
//          events[0].args['_from'].should.be.eq(nft_owner)
//        })
//
//        it('should match `_to`', async () => {
//          events[0].args['_to'].should.be.eq(empty.address)
//        })
//
//        it('should match `_tokenId`', async () => {
//          events[0].args['_tokenId'].toNumber().should.be.eq(8)
//        })
//
//      })
//    })
//  })
//})
