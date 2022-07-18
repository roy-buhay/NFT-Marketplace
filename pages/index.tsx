import { Key } from "react";
import { GetStaticProps } from "next";
import Image from 'next/image'
import useSWR from "swr";
import { motion } from "framer-motion";

import { ICollection, INFT, NextPageWithLayout } from 'types';

import { useItems } from "@hooks/index";
import { fetchWrapper } from "@util/fetchWrapper";
import { motionConfig } from "config";

import Default from "@layout/Default/Default";
import { MiniCard, BasicCard } from "@module/Card";
import { Hero } from "@module/Hero/Hero";
import Explore from "@template/Home/Explore";
import { ViewAll, Stonks } from "@element/SVG";

import arrow from '../public/arrow.png'


const collection_endpoint = process.env.NEXT_PUBLIC_COLLECTIONS

export const getStaticProps: GetStaticProps = async () => {
  const collections = await fetchWrapper(collection_endpoint)
  return {
    props: {
      collections
    }
  }
}

async function fetcher(url: string) {
  const res = await fetch(url)
  return res.json()
}

interface IProps {
  collections: ICollection[]
}

const App: NextPageWithLayout = (props: IProps) => {
  const { data, isLoading: isDataLoading, isError: isDataError } = useItems();
  const { data: collectionData, error: collectionError, } = useSWR(collection_endpoint, fetcher, { fallbackData: props.collections })
  
  return <div className="mt-16">
    <Hero />

     {/* All Featured NFTs */}
    <div className="relative">
      <div className="gradient" />
      { isDataLoading &&  <p className="flex items-center justify-start"> Loading... </p> }
      { isDataError && <p className="flex items-center justify-start"> Something went wrong. Please reload browser. </p> }
      <div className="flex items-center justify-center space-x-10 mb-14 mt-12">
        {
          data && data.map((nft: INFT, idx: number) => {
            return <BasicCard key={idx} index={idx} data={nft} />
          })
        }
      </div>
    </div>

    <div className="w-11/12 mx-auto mt-[14rem]">
      {/* Explore */}
      <Explore />

      {/* Top Collections List */}
      <div className="flex items-start justify-between mt-32 mb-6">
        <div className="w-8/12">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl text-white font-semibold tracking-wide"> Top Collections </h4>
            <button className="bg-[#151515] rounded-full text-white py-3 px-6"> Recently Listed </button>
          </div>
        </div>
      </div>  
      <div className="flex items-start justify-between space-x-10">
        <div className="w-8/12">
          {collectionError && <span> No items to display </span>}
          {collectionData && (
            <motion.ul
              variants={motionConfig.staggerParent}
              initial="hidden"
              animate="show"
              whileInView={"show"}
              viewport={{ once: true }}
              className="bg-[#151515] rounded-3xl grid grid-cols-2 gap-y-8 gap-x-10 p-6"
            >
              {collectionData.map((data: ICollection, idx: number, key: Key) => {
                return <motion.li key={idx} variants={motionConfig.staggerChild}
                  transition={{ ease: 'easeOut', duration: 0.8 }} className="relative z-10"><MiniCard key={key} data={data} /></motion.li>;
              })}
            </motion.ul>
          )}
        </div> 
        <div className="w-4/12">
          <div className="relative">
            <Stonks />
            <div className="absolute top-1/2 left-1/2 translate-x-[-60%] translate-y-[-60%] w-[10rem] h-[10rem] z-10">
              <Image
                src={arrow}
                alt='Stonks'
                layout="fill"
              />
            </div>
            <ViewAll link={'/collection'} />
          </div>
        </div>
      </div>
    </div>          
  </div>
};

export default App;

App.getLayout = (page) => {
  return <Default>{page}</Default>;
};
