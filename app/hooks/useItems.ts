import { useState, useEffect } from "react";
import { INFT } from "types/";
import { useWeb3Context } from "@context/Web3";
import { api } from "@lib/api";


export const useItems = () => {
  const { signer, contract } = useWeb3Context();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<INFT[]>([]);

  async function loadNFTs() {
    if (contract) {
      const items = await api.getAllNFT(contract);
      setIsLoading(true);

      if (data) {
        setData(items);
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    signer !== null && contract && loadNFTs();
  }, [signer, contract]);

  return {
    data,
    isLoading,
    isError,
  }
}
