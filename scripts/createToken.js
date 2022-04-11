const { ethers } = require("hardhat");
const fs = require('fs');
// scripts/deploy.js
async function main() {
    let addr = readJson();
    const Token = await ethers.getContractFactory("TokenR");
    const TokenFactory = await ethers.getContractFactory("TokenFactoryR");
    
    const tokenFactory = await TokenFactory.attach(addr['factory']);
    await tokenFactory.createProxyContract('Nick', 'Nick2');
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