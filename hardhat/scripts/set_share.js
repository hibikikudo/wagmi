// import dependencies
const dotenv = require("dotenv");
dotenv.config(); // setup dotenv

//this scripts is for mumbai Chain
const { ethers } = require("hardhat");
let srcAddr = process.env.CONTRACT_ADDRESS;
let stakeHolders = [
    // stakeHolders addresses here
];
let share = [
    // share distributions here
];

async function main() {
  const contractFactory = await ethers.getContractFactory("MusicNFT");
  const contract = await contractFactory.attach(srcAddr);

  let tx = await (await contract.setShare(stakeHolders, share)).wait()
  console.log(`✅ [${hre.network.name}] setShare(${stakeHolders}, ${share})`)
  console.log(` tx: ${tx.transactionHash}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });