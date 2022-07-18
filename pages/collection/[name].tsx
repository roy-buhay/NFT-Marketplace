import { useEffect, useState, useRef } from "react";
import { GetServerSideProps } from "next";
import Image from 'next/image'
import useSWR from 'swr';

import { useItems } from "@hooks/index";
import { sortItems } from "@util/sortItems";
import { fetchWrapper } from "@util/fetchWrapper";

import { SiEthereum } from "react-icons/si";
import { BiSortAlt2 } from "react-icons/bi";

import Default from "@layout/Default/Default";
import { Items, Activity } from "@template/Collection/";
import { TabBtn } from "@module/Tab/Btn";
import { Collections } from "@element/SVG";

import { ICollection, INFT, NextPageWithLayout } from "types";

{/* Endpoint URLs */}
const collection_endpoint = process.env.NEXT_PUBLIC_COLLECTIONS

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { name } = ctx.query
  const collection = await fetchWrapper(`${collection_endpoint}/${name}`)
  return {
    props: {
      collection,
      name
    }
  }
}

async function fetcher(url: string) {
  const res = await fetchWrapper(url)
  return res
}

const Collection: NextPageWithLayout<any> = (props: { name: any; props: any; }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [sortData, setSortData] = useState<INFT[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<number>(0);
  
  const { data: itemData } = useItems();
  const { data, error } = useSWR(`${collection_endpoint}/${props.name}`, fetcher, {fallbackData: props.props})


  const SORT_ITEM = [
    {
      label: "Sort: Ordering",
      func: sortItems(itemData, "name"),
    },
    {
      label: "Sort: Price",
      func: sortItems(itemData, "price"),
    },
  ];

  const onSort = (index: number) => {
    const sort = SORT_ITEM[index].func;
    setActiveFilter(index);
    setSortData(sort);
  };

  const DropdownFilter = ({ index }) => {
    return (
      <li className="py-2 text-[13px]">
        <button onClick={() => {
          onSort(index)
          setShow(!show)
        }}> {SORT_ITEM[index].label} </button>
      </li>
    );
  };

  useEffect(() => {
    itemData && onSort(activeFilter)
  }, [itemData]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (show && ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [show]);

  return <div className="relative">
          {error && <span>Something went wrong.</span>}
          {data &&
            data
              .map(({ banner, name, logo, description}: ICollection) => {
                return (
                  <>
                    <div className="relative top-0 left-0 mt-4">
                      <div className="absolute top-0 left-0 w-full h-40 gradient gradient-innerpage" />

                      <div className='w-full h-[23rem] overflow-hidden rounded-lg mix-blend-luminosity'>
                        <Image
                          src={banner}
                          alt={name}
                          layout='fill'
                          objectFit='cover'
                        />
                      </div>
                  
                      <div className="absolute top-[-4rem] left-[5rem] rotate-[-25deg] w-[15rem] h-[15rem]">
                        <div className='w-[9.5rem] h-[9.5rem] drop-shadow-2xl rounded-full overflow-hidden'>
                          <Image
                            src={logo}
                            alt={name}
                            layout='fill'
                            objectFit='cover'
                          />
                        </div>
                        <Collections />
                      </div>
                    </div>
                    <div className="w-full mx-auto mt-[5rem]">
                      <div className="text-center">
                        <h2 className="text-2xl md:text-5xl text-white font-semibold">
                          {name}
                        </h2>
                        <span className="inline-flex items-center space-x-4 font-semibold py-1 px-4 bg-yellow-300 rounded-full mt-2">
                          {" "}
                          <SiEthereum className="text-sm mr-1" /> 0x49...a28b
                        </span>
                        <p className="text-[#525252] font-light leading-6 w-9/12 mt-10 mx-auto">
                          {description}
                        </p>
                        <div className="grid grid-cols-3 md:grid-cols-6 w-8/12 border border-[#808080] divide-x divide-[#808080] rounded-xs mx-auto mt-10">
                          <div className="flex flex-col justify-between items-center text-center py-2 px-2 md:px-4">
                            <small className="block text-[#4f4f4f] font-light leading-[1.4]">
                              Highest Sale
                            </small>
                            <p className="text-md md:text-xl text-white font-semibold">
                              $1.4M
                            </p>
                          </div>
                          <div className="flex flex-col justify-between items-center text-center py-2 px-2 md:px-4">
                            <small className="block text-[#4f4f4f] font-light leading-[1.4]">
                              Floor price
                            </small>
                            <p className="text-md md:text-xl text-white font-semibold">$36K</p>
                          </div>
                          <div className="flex flex-col justify-between items-center text-center py-2 px-2 md:px-4">
                            <small className="block text-[#4f4f4f] font-light leading-[1.4]">
                              Market Cap
                            </small>
                            <p className="text-md md:text-xl text-white font-semibold">
                              $688.9M
                            </p>
                          </div>
                          <div className="flex flex-col justify-between items-center text-center py-2 px-2 md:px-4">
                            <small className="block text-[#4f4f4f] font-light leading-[1.4]">
                              Items
                            </small>
                            <p className="text-md md:text-xl text-white font-semibold">
                              19.1K
                            </p>
                          </div>
                          <div className="flex flex-col justify-between items-center text-center py-2 px-2 md:px-4">
                            <small className="block text-[#4f4f4f] font-light leading-[1.4]">
                              Owners
                            </small>
                            <p className="text-md md:text-xl text-white font-semibold">8.6K</p>
                          </div>
                          <div className="flex flex-col justify-between items-center text-center py-2 px-2 md:px-4">
                            <small className="block text-[#4f4f4f] font-light leading-[1.4]">
                              Total Volume
                            </small>
                            <p className="text-md md:text-xl text-white font-semibold">
                              $48.2M
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          <div className="w-full mb-24">
            <div className="flex items-center justify-center space-x-6 mt-16 border-b border-[#151515] mt-16 md:mt-24">
              <TabBtn
                tabIndex={0}
                currentIndex={index}
                text="Items"
                onSetIndex={setIndex}
              />
              <TabBtn
                tabIndex={1}
                currentIndex={index}
                text="Activity"
                onSetIndex={setIndex}
              />
            </div>
            <div className="flex items-center justify-end mt-6 mb-4">
              <div ref={ref} className="relative">
                <button
                  className="relative border border-[#909090] py-2 px-5 rounded-full"
                  onClick={() => setShow(!show)}
                >
                  <span className="absolute -top-2 left-4 text-[11px] text-[#575757] bg-[#090909] font-bold">
                    Sort
                  </span>
                  <p className="flex items-center font-semibold text-sm text-white tracking-wide">
                    <BiSortAlt2 className="text-base md:text-lg mr-1" />
                    {SORT_ITEM[activeFilter].label}
                  </p>
                </button>
                <ul
                  className={`${show
                    ? "visible -translate-y-4 z-10"
                    : "translate-y-0 invisible -z-50"
                    } transition ease-out duration-50 drop-shadow-2xl rounded-lg overflow-hidden absolute right-0 top-16 backdrop-blur-xl bg-[#212121] text-left text-white font-semibold tracking-wider py-4 px-6 w-52`}
                >
                  <li className="text-[11px] text-[#848484]">Sort by:</li>
                  {SORT_ITEM.map((_, idx) => (
                    <DropdownFilter key={idx} index={idx} />
                  ))}
                </ul>
              </div>
            </div>
            {index === 0 && <Items data={sortData} />}
            {index === 1 && <Activity />}
          </div>
      </div>
}

export default Collection;

Collection.getLayout = (page) => {
  return <Default>{page}</Default>;
};
