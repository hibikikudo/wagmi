import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";

const EstimateGas = () => {

  const { isAuthenticated, account, chainId } = useMoralis();

  const [ ToETH, setToETH ] = useState();
  const getContractAddress = () => {
    if(ToETH){
      // Polygon Contract
      return "0xb4fa9FEe7B4f359a4C805b27932bca017D78bfeb";
    }else{
      // Ethereum Contract
      return "0xC6891cB0CBC7D2d98F7e68c5ACd6549C64089f1C";
    }
  }

  const options = {
    chain: chainId,
    address: getContractAddress(),
  }
}

export default EstimateGas;