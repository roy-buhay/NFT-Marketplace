import { useEffect, useState, useRef } from "react";
import useSWR from "swr";
import Link from "next/link";
import Router from "next/router";

import Blockies from 'react-blockies';
import { useWeb3Context } from "@context/Web3";
import Button from "./Button";


async function fetcher(url: string) {
  const res = await fetch(url)
  return res.json()
}

export const Web3:React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [ show, setShow ] = useState<boolean>(false);
  const [ userInfo, setUserInfo ] = useState<string>(null);
  const { web3Provider, connect, disconnect, address, balance } = useWeb3Context();
  const { data, error} = useSWR(`/api/user/${address}`, fetcher)

  const formattedBalance = balance ? Math.round(balance * 1e4) / 1e4 : 0;

  // useEffect(() => {
  //   data && setUserInfo(data[0].name)
  // }, [data])

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (show && ref.current && !ref.current.contains(e.target)) setShow(false);
    }
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    }
  }, [show]);

  const logout = () => {
    disconnect();
    Router.push("/");
  };

  return web3Provider ? (
    <div className="flex items-center justify-between space-x-4 relative">
      <div onClick={() => setShow(!show)} className="cursor-pointer flex items-center space-x-4">
        <div>
          <span className="text-white block leading-none">{`${address.substr(0,3)}...${address.substr(address.length - 3, address.length)}`}</span>
          {/* <span className="text-white block">{userInfo}</span> */}
          {/* <span className="flex items-center justify-end text-xs text-white font-light block">
            {formattedBalance}
          </span> */}
        </div>
        <Blockies
          seed={address}
          size={10}
          scale={3} 
          className="w-10 h-10 object-cover object-top rounded-sm grayscale hover:grayscale-0"
        />
      </div>
      <div
        ref={ref}
        className={`${
          show
            ? "visible -translate-y-2 z-auto "
            : "translate-y-0 invisible -z-50"
        } transition ease-out duration-50 drop-shadow-2xl rounded-lg overflow-hidden absolute right-0 top-16 backdrop-blur-xl bg-[#212121]`}
      >
        <Link href="/dashboard">
          <a className="block py-2.5 px-10 tracking-wider text-[13px] text-white font-semibold hover:bg-white/40">
            {" "}
            Dashboard{" "}
          </a>
        </Link>
        <button onClick={() => logout()}>
          <a className="block py-2.5 px-10 tracking-wider text-[13px] text-white font-semibold hover:bg-white/40">
            Disconnect
          </a>
        </button>
      </div>
    </div>
  ) : (
    <Button type={"Connect"} func={connect} />
  );
}
