import React from "react";
import { ethers } from "ethers";
import { IHistory } from 'types'

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const useMyHistory = () => {
  const [transasctionLogs, setTransasctionLogs] = React.useState<IHistory[]>([]);
  const etherscanProvider = new ethers.providers.EtherscanProvider();
  // etherscanProvider.getHistory(contractAddress).then((logs) => {
  //   logs.forEach((tx) => {
  //     setTransasctionLogs((transasctionLogs) => [
  //       ...transasctionLogs,
  //       {
  //         event: "Sale",
  //         price: tx.value,
  //         from: tx.from,
  //         to: tx.to,
  //         date: tx.timestamp,
  //       },
  //     ]);
  //   });
  // });

  return { history };
};
