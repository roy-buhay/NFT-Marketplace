import React from "react";
import { ethers, Contract } from "ethers";
import { useWeb3Context } from "@context/Web3";
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

import NFTMarketplace from "../../artifacts/contracts/Marketplace.sol/Marketplace.json";

export function useContract() {
  const { signer } = useWeb3Context();
  const [contract, setContract] = React.useState<Contract>(null);

  function generateContract() {
    const contract = new ethers.Contract(
      contractAddress,
      NFTMarketplace.abi,
      signer
    );
    setContract(contract);
  }

  React.useEffect(() => {
    signer !== null && generateContract();
  }, [signer]);

  return { contract };
}
