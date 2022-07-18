import { ethers } from "ethers";

export type Web3ProviderState = {
  provider: any;
  web3Provider: ethers.providers.Web3Provider | null | undefined;
  signer: any | null | undefined;
  address: string | null | undefined;
  balance: number | null | undefined;
  network: ethers.providers.Network | null | undefined;
  contract: any;
  connect: () => void;
  disconnect: () => void;
};

export const web3InitialState: Web3ProviderState = {
  provider: null,
  web3Provider: null,
  signer: null,
  address: null,
  balance: 0,
  network: null,
  contract: null,
  connect: function (): void {
    throw new Error("Function not implemented.");
  },
  disconnect: function (): void {
    throw new Error("Function not implemented.");
  },
};

export type Web3Action =
  | {
      type: "SET_WEB3_PROVIDER";
      provider?: Web3ProviderState["provider"];
      web3Provider?: Web3ProviderState["web3Provider"];
      signer?: Web3ProviderState["signer"];
      address?: Web3ProviderState["address"];
      balance?: Web3ProviderState["balance"];
      network?: Web3ProviderState["network"];
      contract?: Web3ProviderState["contract"];
    }
  | {
      type: "SET_SIGNER";
      signer?: Web3ProviderState["signer"];
    }
  | {
      type: "SET_ADDRESS";
      address?: Web3ProviderState["address"];
    }
  | {
      type: "SET_BALANCE";
      balance?: Web3ProviderState["balance"];
    }
  | {
      type: "SET_NETWORK";
      network?: Web3ProviderState["network"];
    }
  | {
      type: "RESET_WEB3_PROVIDER";
    };

export function web3Reducer(
  state: Web3ProviderState,
  action: Web3Action
): Web3ProviderState {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        signer: action.signer,
        address: action.address,
        balance: action.balance,
        network: action.network,
        contract: action.contract,
      };
    case "SET_SIGNER":
      return {
        ...state,
        address: action.signer,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "SET_BALANCE":
      return {
        ...state,
        balance: action.balance,
      };
    case "SET_NETWORK":
      return {
        ...state,
        network: action.network,
      };
    case "RESET_WEB3_PROVIDER":
      return web3InitialState;
    default:
      throw new Error();
  }
}
