const { ethers } = require("hardhat");
const fs = require('fs');

// scripts/deploy.js
async function main() {
    const Token = await ethers.getContractFactory("TokenR");
    const TokenFactory = await ethers.getContractFactory("TokenFactoryR");


    const token = await Token.deploy();
    const tokenFactory = await upgrades.deployProxy(TokenFactory, ['0.1'], { initializer: 'initialize' });

    fs.writeFileSync('addresses.json', JSON.stringify({
        "token": token.address,
        "factory": tokenFactory.address
    }), (err,res) => {
        if(err) {
            console.log(err);
        }
    })
    console.log('Done!');
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });