ContractFactoryUpgradeable
How does this structure work?

- deploy TokenR.sol;
- deploy with the openzeppelin plugins the TokenFactory;
- call the "createProxyContract" of TokenFactory to create new tokens;
- to update a token contract implementation do this:
    1 - deploy a new TokenR.sol (in my case it's TokenRV2.sol); 
    2 - get the address of the contract to upgrade from the map in the factory;
    3 - call the 'upgradeTo' function of the proxy and pass the new address implementation to it;
- to update the Factory just use the plugin provided by openzeppelin;


In hardhat: 
- use the command "npx hardhat node" in a terminal
- open another terminal
- use the scripts with this command
    "npx hardhat run script/<name-of-script>.js --network localhost"
- the exact order of the scripts is:
    1 - deploy.js
    2 - createToken.js
    3 - ...your choice from here
