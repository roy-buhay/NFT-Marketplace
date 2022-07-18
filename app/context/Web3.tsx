import React from "react";
import { useWeb3 } from "@hooks/Web3Client";
import { Web3ProviderState, web3InitialState } from "@reducers/index";

const Web3Context = React.createContext<Web3ProviderState>(web3InitialState);

interface Props {
  children: React.ReactChild;
}

export const Web3ContextProvider = ({ children }: Props) => {
  const web3ProviderState = useWeb3();
  return (
    <Web3Context.Provider value={web3ProviderState}>
      {children}
    </Web3Context.Provider>
  );
};

export function useWeb3Context() {
  return React.useContext(Web3Context);
}
