// import dependencies
const dotenv = require("dotenv");
dotenv.config(); // setup dotenv

//this scripts is for mumbai Chain
const { ethers } = require("hardhat");
let srcAddr = process.env.CONTRACT_ADDRESS;
let agentAddress = "AGENT_ADDRESS";

async function main() {
  const contractFactory = await ethers.getContractFactory("MusicNFT");
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