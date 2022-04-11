const { ethers } = require("hardhat");
const fs = require('fs');
// scripts/deploy.js
async function main() {
    let addr = readJson();

    const Token = await ethers.getContractFactory("TokenRV2");
    const TokenFactory = await ethers.getContractFactory("TokenFactoryR");
    
    const tokenFactory = TokenFactory.attach(addr['factory']);
    const addressOfToken = await tokenFactory.getProxyAddress(0);
    
    const token = Token.attach(addressOfToken);
    console.log('What does this contract say? ' + await token.sayHello());
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