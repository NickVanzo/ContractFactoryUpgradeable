// scripts/prepare_upgrade.js
async function main() {
    const proxyAddress = '0xd73341413d72C45FE3173045Dd2bb37dCd4521b1';
   
    const BoxV2 = await ethers.getContractFactory("BoxV2");
    console.log("Preparing upgrade...");
    const boxV2Address = await upgrades.upgradeProxy(proxyAddress, BoxV2);
    console.log("Transaction hash:", boxV2Address.deployTransaction.hash);
  }
   
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });