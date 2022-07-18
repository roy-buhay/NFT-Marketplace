import Image from 'next/image'
import Link from "next/link";
import { ICollection } from 'types';

export interface IProps {
  data: ICollection
}

const MiniCard: React.FC<IProps> = ({data}) => {
  const { name, logo } = data
  return <>
      <Link
          href={{
            pathname: `/collection/${name}`,
            query: { name: name },
          }}
        >
        <a className='transition ease-in-out duration-100 active:scale-95 flex items-center justify-start space-x-4 rounded-lg hover:bg-black/40 pr-4'
        >
          <span className='shrink-0 grow-0 relative block bg-black rounded-lg w-[6rem] h-[6rem] overflow-hidden'>
            <Image
              src={logo}
              alt={name}
              layout='fill'
              objectFit='cover'
            />
          </span>
          <span className="w-full">
            <p className="text-[1.1rem] text-white mb-1">{name}</p>
            <p className="flex items-end justify-between mt-2">
              <span className="text-gray-400 text-sm">
                {/* <small className="font-light text-gray-500 text-[0.75rem] block leading-tight">Floor Price</small>  */}
                17ETH
              </span>
              <span className="text-green-500 text-sm">
                $1.6m +5%
              </span>
            </p>
          </span>
        </a>
      </Link>
    </>
}

export default MiniCard;
