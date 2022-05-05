import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./abi.json"; // Abi code for parsing tx and logs

// Change below address to your contract from Remix IDE
const CONTRACT_ADDR = "0xe2D2D4DC4b71D27d78B668cbbd86b2d40ab47A02";

const web3Provider = new ethers.providers.Web3Provider(window.ethereum)

const contract = new ethers.Contract(CONTRACT_ADDR, abi, web3Provider);
const filterFrom = contract.filters.TransferSingle(null, null, null);

export default function EventListener2() {
  const [txs, setTxs] = useState([]);

  const handleTransferSingle = (operator, from, to, id, amount) => {
    let type;

    if (from === ethers.constants.AddressZero) {
      type = "mint";
    } else {
      type = "transfer";
    }

    setTxs((prev) => [
      {
        type,
        from,
        to,
        id: id.toString(),
        amount: amount.toString()
      },
      ...prev
    ]);
  };

  useEffect(() => {
    const fetchOldEvents = async () => {
      const items = await contract.queryFilter(filterFrom, 6833340, 6833400);
      items.forEach((item) => {
        handleTransferSingle(
          item.args[0],
          item.args[1],
          item.args[2],
          item.args[3],
          item.args[4]
        );
      });
    };

    fetchOldEvents();
    contract.on("TransferSingle", handleTransferSingle);
    return () => {
      contract.removeAllListeners("TransferSingle");
      setTxs([]);
    };
  }, []);

  return (
    <form className="m-4">
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            NFT Events
          </h1>
          <h2 className="text-xs text-gray-400 text-center mb-6 mt-2">
            {CONTRACT_ADDR}
          </h2>

          <div>
            {txs.map((log) => (
              <div className="flex flex-row">
                <div className="text-xs w-16 mr-2">
                  {log.type === "mint" && (
                    <span className="mr-2 bg-green-400 px-3">{log.type}</span>
                  )}
                  {log.type === "transfer" && (
                    <span className="mr-2 bg-yellow-400 px-3">{log.type}</span>
                  )}
                </div>
                {log.type === "transfer" && (
                  <div className="text-xs w-32">
                    {log.from.slice(0, 6)} ➡️ {log.to.slice(0, 6)}
                  </div>
                )}
                {log.type === "mint" && (
                  <div className="text-xs w-32">{log.to.slice(0, 6)}</div>
                )}
                <div className="text-xs w-32">
                  #{log.id} ({log.amount})
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </form>
  );
}
