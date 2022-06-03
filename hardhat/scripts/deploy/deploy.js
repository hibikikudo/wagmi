// import dependencies
const dotenv = require("dotenv");
dotenv.config(); // setup dotenv

async function main() {
  const factory = await hre.ethers.getContractFactory("OONTRACT_NAME");
  const option = {
    gasPrice: 25 * 10**9
  }
  const contract = await factory.deploy(
    "WAGMI Music",
    "disc",
    option
  );
  await contract.deployed();
  console.log("NFT deployed to:", contract.address);
  const gasPrice = contract.deployTransaction.gasPrice;
  const gasLimit = contract.deployTransaction.gasLimit;

  console.log("GasPrice(gwei):", gasPrice / 10**9);
  console.log("GasLimit:", gasLimit);
  console.log("GasFee:", ethers.utils.formatEther(gasPrice) * gasLimit)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });