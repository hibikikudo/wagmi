import React from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";

const GetTokenSupply = () => {
  const { native } = useMoralisWeb3Api();

  // const contractAddress = process.env.CONTRACT_ADDRESS
  const contractAddress = "0xECc866f9D76ef66A92D3BDb61F558582b56Cdeb1";

  const options = {
    chain: "rinkeby",
    address: contractAddress,
    function_name: "tokenSupply",
    abi: [{"inputs":[],"name":"tokenSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],
    params: {}
  };

  const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(native.runContractFunction,{...options});

  return (
    // Use your custom error component to show errors
    <div style={{ height: "100vh", overflow: "auto" }}>
      <div>
        <button
          onClick={() => {
            fetch({ params: options });
          }}
        >
          Fetch data
        </button>
        {data}
      </div>
    </div>
  );
};

export default GetTokenSupply;