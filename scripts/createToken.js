const { ethers } = require("hardhat");
const fs = require('fs');

// scripts/deploy.js
async function main() {
  const Token = await ethers.getContractFactory("Token");
  const TokenFactory = await ethers.getContractFactory("TokenFactory");
  const TokenBeacon = await ethers.getContractFactory("TokenBeacon");
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

  const addresses = readAddresses();
  const addressOfFactory = addresses['factoryToken'];

  const factory = TokenFactory.attach(addressOfFactory);

  const trx = await factory.createToken(
    "Promethium_v1",
    "PRM2",
    1
  );

  const address = await factory.getTokenAddress(0);
  console.log(address);
}

function readAddresses() {
  const data = fs.readFileSync('../addresses.json', {
    encoding: 'utf-8'
  })
  return JSON.parse(data);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });