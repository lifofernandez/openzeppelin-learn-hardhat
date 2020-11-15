const { expect } = require("chai");
// optional
// const { ethers } = require("hardhat");

const {
  BN,
  expectEvent,
  expectRevert
} = require('@openzeppelin/test-helpers');

describe("Box", function() {

  before( async function() {
    this.Box = await ethers.getContractFactory("Box");
    this.accounts = await ethers.getSigners();
    this.owner  = this.accounts[0];
    this.other  = this.accounts[1];
  });

  const value = new BN('42')

  beforeEach(async function () {
    //this.box = await this.Box.new( { from: this.owner } );
    this.box = await this.Box.deploy();
    await this.box.deployed();
  });

  it(
    "Deployment should assign the total",
    async function() {
    const ownerBalance = '42';
    await this.box.connect(this.owner).store(42);
    expect(await this.box.retrieve()).to.equal(ownerBalance);
  });

  it('store emits an event', async function () {

  const receipt = this.box.store(7);
  // Test that a ValueChanged event was emitted with the new value
  await expect( receipt )
    .to.emit( this.box, 'ValueChanged' )
    .withArgs(7);

  // const receipt = await this.box.store( 7 );
  // // Test that a ValueChanged event was emitted with the new value
  // expectEvent(
  //   receipt,
  //   'ValueChanged',
  //   { newValue: 7}
  // );

  });
  it('non owner cannot store a value', async function () {
    // Test a transaction reverts
    //await expect(
    //  this.box.connect(this.other).store(4)
    //).to.be.reverted;
    await expectRevert(
      this.box.connect(this.other).store(41),
      'Ownable: caller is not the owner'
    );
  });
});








// it('retrieve returns a value previously stored', async function () {
//     await this.box.store(value, { from: owner });
// 
//     // Use large integer comparisons
//     expect(await this.box.retrieve()).to.be.bignumber.equal(value);
//   });
// 
//   it('store emits an event', async function () {
//     const receipt = await this.box.store(value, { from: owner });
// 
//     // Test that a ValueChanged event was emitted with the new value
//     expectEvent(receipt, 'ValueChanged', { newValue: value });
//   });
// 
//   it('non owner cannot store a value', async function () {
//     // Test a transaction reverts
//     await expectRevert(
//       this.box.store(value, { from: other }),
//       'Ownable: caller is not the owner'
//     );
//   });


	

