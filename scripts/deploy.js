const { ethers } = require("hardhat");
const fs = require('fs');

// scripts/deploy.js
async function main() {
  const Token = await ethers.getContractFactory("Token");
  const TokenFactory = await ethers.getContractFactory("TokenFactory");
  const TokenBeacon = await ethers.getContractFactory("TokenBeacon");

  console.log("Deploying blueprint...");
  const token = await Token.deploy();

  const addressToken = token.address;

  console.log("Blueprint deployed to:", token.address);
  console.log("Deploying token factory...");

  const tokenFactory = await TokenFactory.deploy(addressToken);
  console.log("Token factory deployed to: ", tokenFactory.address);
  const beaconAddress = await tokenFactory.getBeacon();
  console.log("Beacon address: ", beaconAddress);

  const beacon = await TokenBeacon.attach(beaconAddress);
  console.log("Beacon contract setup done!");

  writeJson(token.address, tokenFactory.address, beacon.address);
}

function writeJson(token, factory, beacon) {
  const dir = 'addresses.json';
  const obj = JSON.stringify({
    "token": token,
    "factoryToken": factory,
    "beacon": beacon
  });

  fs.writeFileSync(dir, obj, (err, res) => {
    if(err) {
      console.log(err);
    }
  });
}
  

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });