import React from "react";
import { IPrice } from "types";
import { useWeb3Context } from "@context/Web3";

export const usePrice = (tokenId: string) => {
  const { signer, contract } = useWeb3Context();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [price, setPrice] = React.useState<IPrice[]>([]);

  async function loadData() {
    setIsLoading(true);

    if (contract) {
      const data = await contract.fetchMarketItems();
      const items = await Promise.all(
        data
          .filter((d) => parseInt(d.tokenId) === parseInt(tokenId))
          .map(async (i: { price: any }) => {
            return i.price;
          })
      );
      setPrice(items);
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    signer !== null && contract && loadData();
  }, [signer, contract]);

  return {
    price,
    isLoading,
    isError,
  };
};
