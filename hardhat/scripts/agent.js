// import dependencies
const dotenv = require("dotenv");
dotenv.config(); // setup dotenv

//this scripts is for mumbai Chain
const { ethers } = require("hardhat");
let srcAddr = "0xa86a7046800c57236B61d1587f4aBE9B38Ab6F5d";
let agentAddress = "0xAd84F848Efb88C7D2aC9e0e8181861a995041D71";

async function main() {
  const contractFactory = await ethers.getContractFactory("ERC721Drop");
  const contract = await contractFactory.attach(srcAddr);

  let tx = await (await contract.license(agentAddress)).wait()
  console.log(`✅ [${hre.network.name}] license(${agentAddress})`)
  console.log(` tx: ${tx.transactionHash}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });