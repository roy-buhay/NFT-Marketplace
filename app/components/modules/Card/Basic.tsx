import Image from "next/image";
import Link from "next/link";
import { INFT } from "types";

interface IProps {
  data: INFT,
  key: number,
  index: number,
}
const BasicCard: React.FC<IProps> = (data) => {
  let size: string
  const { name, tokenId, tokenURI, image, price } = data.data
  switch (data.index) {
      case 1:
        size = 'w-[90%] h-[15rem]'
        break 
      case 2:
        size = 'w-[80%] h-[16rem] top-[4rem]'
        break 
      case 3:
        size = 'w-[95%] h-[17rem] top-[-2rem]'
        break 
      case 4:
        size = 'w-[105%] h-[20rem] top-[3rem]'
        break 
      default:
        size = 'w-[110%] h-[21rem] top-[5rem]'
        break 
  }

  return <>
       <Link
          href={{
            pathname: `/nft/${tokenId}`,
            query: { tokenUri: tokenURI },
          }}
        >
        <a className={`${size} scale-[1.1] relative block regular w-full transition ease-in-out duration-100 active:scale-[.95] mix-blend-luminosity hover:mix-blend-normal rounded-xl`}>
            <span className="block h-full w-full object-cover overflow-hidden bg-black relative rounded-lg">
              <Image
                src={image}
                alt={name}
                layout="fill"
                objectFit="cover"
                objectPosition="top"
              />              
            </span>
            <span className="block mt-2">
              <span className="block text-white"> {name} </span>
              <span className="block text-sm text-gray-500"> {price}ETH</span>
            </span>
        </a>
      </Link> 
    </>
}

export default BasicCard;
