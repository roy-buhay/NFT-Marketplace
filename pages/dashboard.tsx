import { useState } from "react";
import Link from 'next/link'
import { useWeb3Context } from "@context/Web3";
import { NextPageWithLayout } from "types";
import Default from "@layout/Default/Default";
import Mint from "@template/Dashboard/Mint";
import Info from "@template/Dashboard/Info";
import Activity from "@template/Dashboard/Activity";
import MyCollection from "@template/Dashboard/Collection";
import { TabBtn } from "@module/Tab/Btn";

import { SiEthereum } from "react-icons/si";

const Dashboard: NextPageWithLayout<any> = () => {
  const { balance } = useWeb3Context();
  const [index, setIndex] = useState<number>(0);

  const formattedBalance = Math.round(balance * 1e4) / 1e4;

  return (
     <>
      <div className="mx-auto mt-32 md:mt-14">
      <div className="flex items-center justify-start space-x-6">
        <div>
          <h2 className="text-lg text-white mb-1"> Wallet balance </h2>
          <p className="flex items-center font-bold text-6xl text-white mb-2">
            <SiEthereum className="text-2xl mr-2" /> {formattedBalance}{" "}
          </p>
          <Link href="/profile">
            <a className="text-xs text-[#818181] underline"> Edit Profile </a>
          </Link>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-start space-x-8 mt-10 md:mt-16 border-b border-[#151515]">
          <TabBtn
            tabIndex={0}
            currentIndex={index}
            text="My NFTs"
            onSetIndex={setIndex}
          />
          <TabBtn
            tabIndex={1}
            currentIndex={index}
            text="Activities"
            onSetIndex={setIndex}
          />
          <TabBtn
            tabIndex={2}
            currentIndex={index}
            text="Mint NFT"
            onSetIndex={setIndex}
          />
          <TabBtn
            tabIndex={3}
            currentIndex={index}
            text="Collections"
            onSetIndex={setIndex}
          />
        </div>

        <div className="mt-8">
          {index === 0 && <Info />}
          {index === 1 && <Activity />}
          {index === 2 && <Mint />}
          {index === 3 && <MyCollection />}
        </div>
        </div>
      </div>
      </>
  );
}
export default Dashboard;

Dashboard.getLayout = (page) => {
  return <Default>{page}</Default>;
};
