const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Factory token is upgradeable", function () {
    let TokenProxy, Token, TokenRV2, TokenFactory, TokenFactoryV2;
    let tokenProxy, token, tokenVR2, tokenFactory, tokenFactoryV2;
    let ownerContracts;

    before(async function () {
        const [owner] = await ethers.getSigners();
        ownerContracts = owner;

        Token = await ethers.getContractFactory("TokenR");
        TokenRV2 = await ethers.getContractFactory("TokenRV2");
        TokenFactory = await ethers.getContractFactory("TokenFactoryR");
        TokenFactoryV2 = await ethers.getContractFactory("TokenFactoryRV2");
        TokenProxy = await ethers.getContractFactory("TokenProxyR");

        token = await Token.deploy();
        tokenVR2 = await TokenRV2.deploy();

        tokenFactory = await upgrades.deployProxy(TokenFactory, ["0.1"], { initializer: 'initialize' });
    });

    it("checks the version of contract factory", async function () {
        const version = await tokenFactory.versionContract();

        expect(version).to.equal("0.1");
    });

    it("create an upgradeable token proxy contract from the factory", async function () {
        await tokenFactory.createProxyContract("Nicolas", "NICK");
        const getCounter = await tokenFactory.getCurrentCounter();

        expect(getCounter.toNumber()).to.equal(1);
    })

    it("check the name of the token created", async function () {
        const address = await tokenFactory.getProxyAddress(0);

        token = await Token.attach(address);
        const name = await token.name();

        expect(name).to.equal("Nicolas");
    })

    it("should upgrade implementation of the first token created from the factory", async function() {
        const address = await tokenFactory.getProxyAddress(0);

        tokenProxy = await TokenProxy.attach(address);
        tokenProxy.upgradeTo(tokenVR2.address);

        token = await TokenRV2.attach(address);

        expect(await token.sayHello()).to.equal("Hello");
    })

    it("should update the Factory contract", async function() {
        tokenFactoryV2 = await upgrades.upgradeProxy(tokenFactory.address, TokenFactoryV2);

        expect(await tokenFactoryV2.sayHello()).to.equal("Say hello");
    })

    it("should upgrade implementation of the first token created from the factory", async function() {
        const address = await tokenFactory.getProxyAddress(0);

        token = await TokenRV2.attach(address);

        expect(await token.sayHello()).to.equal("Hello");
    })
});