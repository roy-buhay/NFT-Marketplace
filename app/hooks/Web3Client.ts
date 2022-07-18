import { useEffect, useReducer, useCallback } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import NFTMarketplace from "../../artifacts/contracts/Marketplace.sol/Marketplace.json";
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

import {
  Web3ProviderState,
  Web3Action,
  web3InitialState,
  web3Reducer,
} from "../reducers";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID
    },
  },
};

let web3Modal: Web3Modal | null;

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    // network: "hardhat",
    cacheProvider: true,
    providerOptions,
  });
}

type Web3Client = Web3ProviderState & {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

export const useWeb3 = () => {
  const [state, dispatch] = useReducer(web3Reducer, web3InitialState);
  const {
    provider,
    web3Provider,
    signer,
    address,
    balance,
    network,
    contract,
  } = state;

  const connect = useCallback(async () => {
    if (web3Modal) {
      try {
        const provider = await web3Modal.connect();
        const web3Provider = new ethers.providers.Web3Provider(provider, "any");
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        const bal = await web3Provider.getBalance(address);
        const balance = ethers.utils.formatEther(bal);
        const network = await web3Provider.getNetwork();
        const contract =
          signer &&
          new ethers.Contract(contractAddress, NFTMarketplace.abi, signer);

        dispatch({
          type: "SET_WEB3_PROVIDER",
          provider,
          web3Provider,
          signer,
          address,
          balance,
          network,
          contract,
        } as unknown as Web3Action);
      } catch (e) {
        console.log("connect error", e);
      }
    } else {
      console.error("No Web3Modal");
    }
  }, []);

  const disconnect = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      dispatch({
        type: "RESET_WEB3_PROVIDER",
      } as Web3Action);
    } else {
      console.error("No Web3Modal");
    }
  }, [provider]);

  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connect();
    }
  }, [connect]);

  useEffect(() => {
    if (provider?.on) {
      const getAccountBalance = async (add) => {
        const bal = await web3Provider.getBalance(add);
        const formatted = ethers.utils.formatUnits(bal.toString(), "ether");
        dispatch({
          type: "SET_BALANCE",
          balance: formatted,
        } as unknown as Web3Action);
      };

      const handleAccountsChanged = (accounts: string[]) => {
        getAccountBalance(accounts[0]);
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        } as Web3Action);
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        if (typeof window !== "undefined") {
          console.log("switched to chain...", _hexChainId);
          window.location.reload();
        } else {
          console.log("window is undefined");
        }
      };

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  return {
    provider,
    web3Provider,
    address,
    signer,
    balance,
    network,
    contract,
    connect,
    disconnect,
  } as Web3Client;
};
