import { useState } from "react";
import useSWR from "swr";
import { GetStaticProps } from 'next'
import { motion } from "framer-motion";

import { fetchWrapper } from "@util/fetchWrapper";
import { motionConfig } from "config";

import Default from "@layout/Default/Default";
import { CategoryCard } from "@module/Card";
import { Tag } from "@module/Tag";

import { ICollection, NextPageWithLayout } from "types";

const collection_endpoint = process.env.NEXT_PUBLIC_COLLECTIONS
const category_endpoint = process.env.NEXT_PUBLIC_CATEGORIES

export interface IProps {
  collections: ICollection[],
  categories: string[]
}

export const getStaticProps: GetStaticProps = async () => {
  const collections = await fetchWrapper(collection_endpoint)
  const categories = await fetchWrapper(category_endpoint)
  return {
    props: {
      collections,
      categories
    }
  }
}

async function fetcher(url: string) {
  const res = await fetchWrapper(url)
  return res
}

const Collections: NextPageWithLayout = (props : IProps ) => {
  const [filter, setFilter] = useState<string>("all");
  const { data: collectionData, error: collectionError, } = useSWR(collection_endpoint, fetcher,  {fallbackData: props.collections})
  const { data: categoryData, error: categoryError, } = useSWR(category_endpoint, fetcher,  {fallbackData: props.categories})

  return (
      <> 
        <div className="relative z-10">
        <h3 className="text-white text-6xl text-center font-extrabold mb-6 mt-16">All Collections</h3>
          <div className="flex items-center justify-center space-x-6 mb-12">
            {categoryError && <span>Something went wrong. Please refresh page.</span>}
            {categoryData && !categoryError && (
              <>
                <Tag category={"all"} active={filter} setFilter={setFilter} />
                {categoryData.map((category: string, idx: any) => (
                  <Tag key={idx} category={category} active={filter} setFilter={setFilter} />
                ))}
              </>
            )}
          </div>
        </div>
        <div className="relative">
            <div className="gradient gradient-subpage" />
            {collectionError && <span>Something went wrong. Please refresh page.</span>}
            {
              collectionData && <motion.ul
                variants={motionConfig.staggerParent}
                initial="hidden" animate="show"
                className="mix-blend-luminosity relative z-10 grid grid-cols md:grid-cols-3 gap-y-6 gap-x-4 items-start justify-start"
              >
                {filter !== "all" ? collectionData
                  .filter((selectedCategory: { category: string; }) => selectedCategory.category.toLocaleLowerCase() === filter)
                  .map((data: ICollection, idx: number) => {
                    return <motion.li key={idx} variants={motionConfig.staggerChild}
                      transition={{ ease: 'easeIn', duration: 0.2 }}><CategoryCard data={data} /></motion.li>;
                  })
                  : collectionData && collectionData.map((data: ICollection, idx: number) => {
                    return <motion.li key={idx} variants={motionConfig.staggerChild}
                      transition={{ ease: 'easeOut', duration: 0.2 }} className="relative z-10"> <CategoryCard data={data} /> </motion.li>;
                  })}
              </motion.ul>
            }
        </div>
      </>
  );
}

export default Collections

Collections.getLayout = (page) => {
  return <Default>{page}</Default>;
};
