import { Key, useState } from "react";
import { GetStaticProps } from "next";
import useSWR from "swr";
import { motion } from "framer-motion";

import { useItems } from "@hooks/index";
import { fetchWrapper } from "@util/fetchWrapper";
import { motionConfig } from "config";

import Default from "@layout/Default/Default";
import { RegularCard } from "@module/Card";
import { Tag } from "@module/Tag";

import { NextPageWithLayout } from "types";


export const category_endpoint = process.env.NEXT_PUBLIC_CATEGORIES

export const getStaticProps: GetStaticProps = async () => {
  const categories = await fetchWrapper(category_endpoint)
  return {
    props: {
      categories
    }
  }
}

export async function fetcher(url: string) {
  const res = await fetchWrapper(url)
  return res
}

interface IProps {
  categoryData: string;
}

const NFTs: NextPageWithLayout = (props: IProps) => {
  const { data, isLoading: isDataLoading } = useItems();
  const { data: categoryData, error: categoryError, } = useSWR(category_endpoint, fetcher,  {fallbackData: props.categoryData})
  const [filter, setFilter] = useState<string>("all");

  return <>
        <div className="relative z-10 w-10/12 mx-auto">
          <h3 className="text-white text-6xl text-center font-extrabold mb-6 mt-16">Explore NFTs</h3>
          <div className="flex items-center justify-center space-x-6 mb-12">
            {categoryError && <span>Something went wrong. Please refresh page.</span>}
            {categoryData && !categoryError && (
              <>
                <Tag category={"all"} active={filter} setFilter={setFilter} />
                {categoryData.map((category: string, idx: Key) => (
                  <Tag key={idx} category={category} active={filter} setFilter={setFilter} />
                ))}
              </>
            )}
          </div>
        </div>
        <div className="relative">
          <div className="gradient" />

          {isDataLoading && <span>Loading...</span>}
          {data && !isDataLoading && (
              <motion.ul
                variants={motionConfig.staggerParent}
                initial="hidden" animate="show"
                className="mix-blend-luminosity relative z-10 grid grid-cols md:grid-cols-3 gap-y-6 gap-x-4 items-start justify-start"
              >
                {filter !== "all" ? data
                  .filter(
                    (filteredItem: { category?: string; }) =>
                      filteredItem.category?.toLowerCase() === filter.toLowerCase()
                  )
                  .map((nft: any, idx: Key) => {
                    return <motion.li key={idx} variants={motionConfig.staggerChild}
                      transition={{ ease: 'easeIn', duration: 0.2 }}><RegularCard data={nft} /></motion.li>;
                  })
                  : data.map((nft: any, idx: number) => {
                    return <motion.li key={idx} variants={motionConfig.staggerChild}
                      transition={{ ease: 'easeIn', duration: 0.2 }}><RegularCard data={nft} /></motion.li>;
                  })}
              </motion.ul>
            )}
        </div>
    </>
}

export default NFTs

NFTs.getLayout = (page) => {
  return <Default>{page}</Default>;
};

