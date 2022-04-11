const { ethers } = require("hardhat");
const fs = require('fs');
// scripts/deploy.js
async function main() {
    let addr = readJson();

    const TokenFactoryV2 = await ethers.getContractFactory("TokenFactoryRV2");

    await upgrades.upgradeProxy(addr['factory'], TokenFactoryV2);
    console.log('Done');
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