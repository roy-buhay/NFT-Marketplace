import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Router from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";

import { api } from "@lib/api";
import { useItem, useContract } from "@hooks/index";
import { fetchWrapper } from "@util/fetchWrapper";

import Default from "@layout/Default/Default";
import { TabBtn } from "@module/Tab/Btn";
import History from "@template/NFT/History";
import Details from "@template/NFT/Details";

import { MdVerified } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";

import { IAttribute, INFT, NextPageWithLayout } from "types";

import ETH_logo from '../../public/ethereum-eth-logo.svg'

const collection_endpoint = process.env.NEXT_PUBLIC_COLLECTIONS

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const id = params.id;
  return {
    props: {
      id
    },
  };
};

interface NFTData {
  image: string,
  name: string,
  price: string,
  collection: string,
  description: string,
  isSold: boolean
}

const NFTItem: NextPageWithLayout = ({id}: {id: string}) => {
  const { data } = useItem(id);
  const { contract } = useContract();
  const [index, setIndex] = useState<number>(0);
  const [owner, setOwner] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [price, setPrice] = useState<string>("0");

  const [NFTData, setNFTData] = useState<INFT>();
  const [logo, setLogo] = useState<string>("");

  async function buyNft(data: INFT) {
    const buy = await api.buyNFT(data, contract);
    buy.status === 1 && Router.push("/dashboard");
  }

  async function listNFTForSale() {
    const sale = await api.sellNFT(id, price, contract);
    sale.status === 1 && Router.push("/");
  }

  useEffect(() => {
    async function getLogo(name: string) {
      let logo = await fetchWrapper(`${collection_endpoint}/${name}`)
      setLogo(logo[0].logo)
    }

    if (data !== undefined && data.length > 0) {
      getLogo(data[0].collection)
      setNFTData(data[0])
    }

  }, [data])


  return <>
    {NFTData ? <>
        <h3 className="text-5xl text-white text-center font-bold break-words mb-3 mt-10">{NFTData.name}</h3>
        <div className="flex items-center justify-center space-x-2 relative">
          <span className="flex items-end justify-start">
            {
              logo && <> <span className="w-10 h-10 object-cover overflow-hidden bg-black relative rounded-full">
                <Image
                  src={logo}
                  alt={NFTData.collection}
                  layout="fill"
                  objectFit="cover"
                /> 
              </span>
              <MdVerified className="relative z-[2] text-xl text-[#fde047] -ml-2" />
              </>
            }
          </span>
          <div>
            <small className="block text-xs text-gray-500 font-light">
              Collection
            </small>
            <Link href={`/collection/${NFTData.collection}`}>
              <a className="text-sm text-white font-medium">
                {NFTData.collection}
              </a>
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-start mt-10">
          <div className="md:w-7/12">
            <div className="gradientBorder relative mt-6 h-[40rem] md:h-[40rem] w-full">
              <div className="relative z-10 w-8/12 h-full rounded-lg overflow-hidden object-cover rounded-lg perspective mx-auto">
                <Image
                  src={NFTData.image}
                  layout='fill'
                  objectFit="cover"
                  alt={NFTData.name}
                />
              </div>
            </div>
          </div>

          <div className="md:w-4/12 relative mt-10">
            <div className="max-h-[70vh] overflow-x-hidden overflow-y-auto">
              <div className="bg-[#131313] rounded-3xl p-6">
                <p className="text-sm text-white mb-2"> Current Price </p>
                <h4 className="flex items-center justify-start space-x-3 text-3xl text-white font-semibold">
                  <span  className="flex items-center justify-center bg-white rounded-full w-8 h-8 mr-3 p-1">
                    <Image src={ETH_logo} width={25} height={25} alt="ETH Logo" />
                  </span>
                  {NFTData.price}
                </h4>
                <div className="flex items-center justify-start space-x-10 my-8">
                  <div className="flex items-center justify-start space-x-2">
                    <div>
                      <small className="block text-xs text-gray-500 font-light">
                        Owner
                      </small>
                      <span className="text-sm text-white font-medium">
                        {`${owner.substr(0, 3)}...${owner.substr(
                          owner.length - 4,
                          owner.length
                        )}`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-11/12">
                  <p
                    id="readMoreContent"
                    className="text-sm text-white font-medium transition ease-in-out duration-200 overflow-hidden"
                  >
                    {NFTData.description}
                  </p>
                  {NFTData.description.length > 100 && (
                    <>
                      <input type="checkbox" id="readMore" />
                      <label
                        htmlFor="readMore"
                        className="cursor-pointer text-sm text-gray-500 font-light"
                      >
                        Read more
                      </label>
                    </>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-start space-x-6 mt-16 border-b border-[#151515]">
                  <TabBtn
                    tabIndex={0}
                    currentIndex={index}
                    text="Details"
                    onSetIndex={setIndex}
                  />
                  <TabBtn
                    tabIndex={1}
                    currentIndex={index}
                    text="History"
                    onSetIndex={setIndex}
                  />
                </div>
                <div className="mt-6 mb-4">
                  {index === 0 && <Details data={data} />}
                  {index === 1 && <History />}
                </div>
              </div>
            </div>

            <div className="absolute -bottom-24 left-0 w-full">
              {NFTData.isSold ? (
                <button
                  className="bg-red-600 text-white font-semibold w-full rounded-full p-4 mt-4 transition ease-in-out duration-300 hover:scale-95 active:scale-105"
                  onClick={() => setShowModal(!showModal)}
                >
                  Sell Item
                </button>
              ) : (
                <button
                  className="bg-yellow-300 font-semibold w-full rounded-full p-4 mt-4 transition ease-in-out duration-300 hover:scale-95 active:scale-105"
                  onClick={() => buyNft(NFTData)}
                >
                  Buy Item
                </button>
              )}

              <div
                className={`${showModal ? "-translate-y-4" : "invisible"
                  } absolute -top-32 right-0 z-10 w-9/12 bg-[#dddddd] border-2 border-black py-3 px-6 drop-shadow-2xl transition ease-out duration-300`}
              >
                <p className="mb-2 text-sm"> Selling Price </p>
                <input
                  type="text"
                  className="w-full px-4 py-2"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <div className="mt-2 mb-1 flex items-center justify-end space-x-4">
                  <button
                    className="text-sm text-white font-semibold bg-black hover:bg-gray-900 active:scale-95 px-3 py-2"
                    onClick={() => listNFTForSale()}
                  >
                    Confirm
                  </button>
                  <button
                    className="text-sm text-gray-600 font-light  active:scale-95"
                    onClick={() => setShowModal(!showModal)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>
          {`
          .gradientBorder::before {
            background-image: url(${NFTData.image})
          }
        `}
        </style>
      </> : <p> Loading... </p>
      } 
  </> 
}

export default NFTItem;

NFTItem.getLayout = (page) => {
  return <Default>{page}</Default>;
};

