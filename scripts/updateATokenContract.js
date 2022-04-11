const { ethers } = require("hardhat");
const fs = require('fs');
// scripts/deploy.js
async function main() {
    let addr = readJson();

    const NewToken = await ethers.getContractFactory("TokenRV2");
    const TokenFactory = await ethers.getContractFactory("TokenFactoryR");
    const TokenProxy = await ethers.getContractFactory("TokenProxyR");

    const token = await NewToken.deploy();
    
    const tokenFactory = TokenFactory.attach(addr['factory']);
    const addressOfProxy = await tokenFactory.getProxyAddress(0);
    
    const tokenProxy = TokenProxy.attach(addressOfProxy);
    await tokenProxy.upgradeTo(token.address);
}


readJson = () => {
    let data = fs.readFileSync('addresses.json');
    return JSON.parse(data);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });