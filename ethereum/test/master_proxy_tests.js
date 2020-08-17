//let MasterProxy = artifacts.require('./mock/Mock_MasterProxy')
//let MockTarget = artifacts.require('./mock/MockTarget')
//
//contract('MasterProxy', (accounts) => {
//  let proxy
//  let target
//
//  let owner = accounts[0]
//  let other = accounts[1]
//
//
//  describe('#changeController', async () => {
//      before(async () => {
//        proxy = await MasterProxy.new(owner).should.be.fulfilled
//      })
//
//      describe('`sender` is not `controller`', async () => {
//        it('should throw', async () => {
//          await proxy.changeController(other, { from: other }).should.not.be.fulfilled
//        })
//      })
//
//      // FIXME - Should we allow changing this value to address zero?
//      describe('`sender` is `controller`', async () => {
//        it('should change the `controller` address correctly', async () => {
//          await proxy.changeController(other, { from: owner }).should.be.fulfilled
//          let controller = await proxy.controller.call().should.be.fulfilled
//          controller.should.be.eq(other)
//        })
//      })
//  })
//
//  describe('#fallback', async () => { //Truffle transaction objects don't include internal transactions so we have to use this wierd test.
//    it('Should Call the Right Target', async () => {
//      proxy = await MasterProxy.new(owner).should.be.fulfilled
//      target = await MockTarget.new().should.be.fulfilled
//      functionSelector = await web3.sha3("callMe()")
//      functionSelector = await functionSelector.slice(0,10)
//      await proxy.setTarget(functionSelector, target.address, {from : owner}).should.be.fulfilled
//
//      label = await MockTarget.at(proxy.address)
//      ret = await label.callMe({from: other}).should.be.fulfilled
//      assert.equal(ret, await target.callMe().should.be.fulfilled)
//    })
//  })
//
//  describe('#getTarget', async () => {
//    before(async () => {
//      proxy = await MasterProxy.new(owner).should.be.fulfilled
//    })
//
//    it('Should Return the Rigth Value', async () => {
//      await proxy.setTarget('0x11223344', accounts[2], {from : owner}).should.be.fulfilled
//      target = await proxy.getTarget('0x11223344').should.be.fulfilled
//      target.should.be.eql(accounts[2]);
//    })
//  })
//
//  describe('#setMaster', async () => {
//    before(async () => {
//      proxy = await MasterProxy.new(owner).should.be.fulfilled
//    })
//
//    describe('`sender` is not `controller`', async () => {
//      it('should throw', async () => {
//        await proxy.setMaster(other, {from: other }).should.not.be.fulfilled
//      })
//    })
//
//    describe('`sender` is `controller`', async () => {
//      it('should change the `master` address correctly', async () => {
//        await proxy.setMaster(other, {from: owner }).should.be.fulfilled
//        let master = await proxy.master.call().should.be.fulfilled
//        master.should.be.eq(other)
//      })
//    })
//  })
//
//  describe('#setTarget', async () => {
//    before(async () => {
//      proxy = await MasterProxy.new(owner).should.be.fulfilled
//    })
//    describe('`sender` is not `controller`', async () => {
//      it('should throw', async () => {
//        await proxy.setTarget('0x11223344', other, {from: other }).should.not.be.fulfilled
//      })
//    })
//    describe('`sender` is `controller`', async () => {
//      it('should change the `target` address correctly', async () => {
//        await proxy.setTarget('0x11223344', other, {from: owner }).should.be.fulfilled
//        let target = await proxy.targets.call('0x11223344').should.be.fulfilled
//        target.should.be.eq(other)
//      })
//    })
//  })
//})
