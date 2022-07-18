import Image from "next/image";
import Link from "next/link";
import { INFT } from "types";

import { MdVerified } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";


interface IProps {
  data: INFT;
}

const RegularCard: React.FC<IProps> = ({data}) => {
  const { name, tokenId, tokenURI, image, price, collection } = data

  return (
    <>
      {Object.keys(data).length !== 0 ? (
        <Link
          href={{
            pathname: `/nft/${tokenId}`,
            query: { tokenUri: tokenURI },
          }}
        >
            <a className="relative block rounded-[1.1rem] overflow-hidden regular w-full shrink-0 p-[.3rem] transition ease-in-out duration-1000 active:scale-95 bg-[#2020206e]">
              <span className="block h-[18rem] w-full object-cover object-top overflow-hidden bg-black relative rounded-[1.05rem]">
                <Image
                  src={image}
                  alt={name}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                />
              </span>
              <span className="flex items-end justify-between px-4 pt-4 pb-3">
              <span className="block">
                <span className="block text-white font-medium tracking-wide">{name}</span>
                <span className="block text-[.7rem] text-[#5C6160] mt-1"> Highest Bid </span>
                <span className="block text-[.9rem] text-[#787878]"> {price}ETH</span>
              </span>

              <span className="w-12 h-12 object-cover overflow-hidden bg-black relative rounded-full">
                <Image
                  src={collection?.logo}
                  alt={collection?.name}
                  layout="fill"
                  objectFit="cover"
                />
                {/* <MdVerified className="ml-1 text-lg text-[#fde047]" /> */}
              </span>
              </span>
            </a>
        </Link>
      ) : (
        <p className="flex items-center justify-start space-x-2 text-sm">
          <ImSpinner8 className="animate-spin" />
          <span>Processing...</span>
        </p>
      )}
    </>
  );
};

export default RegularCard;
