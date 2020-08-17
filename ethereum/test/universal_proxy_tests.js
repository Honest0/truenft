//// Universal Proxy
//let UniversalProxy = artifacts.require('./mock/Mock_UniversalProxy')
//let MockTarget = artifacts.require('./mock/MockTarget')
//let MasterProxy = artifacts.require('./mock/Mock_MasterProxy')
//
//contract('UniversalProxy', (accounts) => {
//  let proxy
//
//  let owner = accounts[0]
//  let other = accounts[1]
//
//  describe('#changeController', async () => {
//    before(async () => {
//      proxy = await UniversalProxy.new(other, {from:owner}).should.be.fulfilled
//    })
//
//    describe('`sender` is not `controller`', async () => {
//      it('should throw', async () => {
//        await proxy.changeController(other, { from: other }).should.not.be.fulfilled
//      })
//    })
//
//    describe('`sender` is `controller`', async () => {
//      it('should change the `controller` address correctly', async () => {
//        await proxy.changeController(other, { from: owner }).should.be.fulfilled
//        let controller = await proxy.controller.call().should.be.fulfilled
//        controller.should.be.eq(other)
//      })
//    })
//  })
//
//  describe('#fallback', async () => {
//    it('Should Call the Right Target', async () => {
//      target = await MockTarget.new().should.be.fulfilled
//      master = await MasterProxy.new(owner).should.be.fulfilled
//      proxy = await UniversalProxy.new(master.address, {from: owner}).should.be.fulfilled
//      assert.equal(await proxy.master.call(), master.address)
//
//      functionSelector = await web3.sha3("callMe()")
//      functionSelector = await functionSelector.slice(0,10)
//      proxyMaster = MasterProxy.at(proxy.address);
//      await proxyMaster.setTarget(functionSelector, target.address, {from:owner}).should.be.fulfilled
//      assert.equal(await proxyMaster.getTarget(functionSelector), target.address)
//
//
//      label = await MockTarget.at(proxy.address)
//      ret = await label.callMe({from: other}).should.be.fulfilled
//      assert.equal(ret, await target.callMe().should.be.fulfilled)
//    })
//  })
//
//  describe('#pause', async () => {
//    before(async () => {
//      proxy = await UniversalProxy.new(other, {from : owner}).should.be.fulfilled
//    })
//
//    describe('`sender` is not `controller`', async () => {
//      it('should throw', async () => {
//        await proxy.pause({ from: other }).should.not.be.fulfilled
//      })
//    })
//
//    describe('`sender` is `controller`', async () => {
//      it('should change `paused`', async () => {
//        await proxy.pause({ from: owner }).should.be.fulfilled
//        let paused = await proxy.paused.call().should.be.fulfilled
//        paused.should.be.eq(true)
//      })
//    })
//  })
//
//})
