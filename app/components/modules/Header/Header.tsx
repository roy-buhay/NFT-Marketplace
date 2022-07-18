import React from "react";
import { Web3 } from "@module/Web3/";
import { Nav } from "./Nav";

export interface IHeader extends React.ComponentPropsWithoutRef<'header'> {}

export const Header:React.FC<IHeader> = ({ ...headerProps }) => {
  return (
    <header {...headerProps} className="relative left-0 top-0 w-full z-50 py-12">
      <div className="flex items-center justify-center">
          <Nav />
          <Web3 />
      </div>
    </header>
  );
};

