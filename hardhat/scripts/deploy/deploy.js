// import dependencies
const dotenv = require("dotenv");
dotenv.config(); // setup dotenv

const owner = "0xaDAcbA4Cae9471C26D613F7A94014549a647783C";

async function main() {
  const factory = await hre.ethers.getContractFactory("Sumple");
  const option = {
    gasPrice: 25 * 10**9
  }
  const contract = await factory.deploy(
    "WAGMI Music",
    "disc",
    owner
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