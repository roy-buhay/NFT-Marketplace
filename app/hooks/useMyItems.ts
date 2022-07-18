import React from "react";
import axios from "axios";
import { ethers } from "ethers";
import { useWeb3Context } from "@context/Web3";
import { INFT } from "types";

export function useMyItems() {
  const { provider, signer, contract } = useWeb3Context();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [data, setData] = React.useState<INFT[]>([]);

  async function loadNFTs() {
    setIsLoading(true);

    if (contract) {
      const data = await contract.fetchMyNFTs();
      const items = await Promise.all(
        data.map(async (i) => {
          const tokenURI = await contract.tokenURI(i.tokenId);
          const meta = await axios.get(tokenURI);
          let price = ethers.utils.formatUnits(i.price.toString(), "ether");
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
            category: meta.data.category,
            collection: meta.data.collection,
            tokenURI,
          };
          return item;
        })
      );
      setData(items);
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    signer !== null && contract && loadNFTs();
  }, [signer, contract]);

  React.useEffect(() => {
    const handleAccountsChanged = () => {
      loadNFTs();
    };
    provider !== null &&
      provider?.on &&
      provider.on("accountsChanged", handleAccountsChanged);
  }, [provider]);

  return {
    data,
    isLoading,
    isError,
  };
}
