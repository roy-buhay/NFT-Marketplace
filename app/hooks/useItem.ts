import React from "react";
import axios from "axios";
import { ethers } from "ethers";
import { useWeb3Context } from "@context/Web3";
import { INFT } from "types";

export const useItem = (tokenId: string) => {
  const { signer, contract } = useWeb3Context();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [data, setData] = React.useState<INFT[]>([]);

  async function loadNFT() {
    setIsLoading(true);

    if (contract) {
      const data = await contract.fetchAllItems();
      const items = await Promise.all(
        data
          .filter((d) => parseInt(d.tokenId) === parseInt(tokenId))
          .map(async (i) => {
            const tokenURI = await contract.tokenURI(i.tokenId);
            let price = ethers.utils.formatUnits(i.price.toString(), "ether");
            const meta = await axios.get(tokenURI);
            let item = {
              tokenURI,
              price,
              tokenId: i.tokenId.toNumber(),
              seller: i.seller,
              owner: i.owner,
              isSold: i.sold,
              image: meta.data.image,
              name: meta.data.name,
              description: meta.data.description,
              category: meta.data?.category,
              collection: meta.data?.collection?.name,
              attributes: meta.data.attributes,
            };
            return item;
          })
      );
      setData(items);
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    signer !== null && contract && loadNFT();
  }, [signer, contract]);

  return {
    data,
    isLoading,
    isError,
  };
};
