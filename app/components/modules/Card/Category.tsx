import Image from 'next/image'
import Link from "next/link";
import { ICollection } from 'types';

export interface ICategoryProps {
  data: ICollection
}

const CategoryCard: React.FC<ICategoryProps> = ({data}) => {
  const { name, banner, description } = data
  return (
    <Link
      href={{
        pathname: `/collection/${name}`,
        query: { name: name },
      }}
      >

      <a className="relative block rounded-[1.1rem] overflow-hidden regular w-full shrink-0 p-[.3rem] transition ease-in-out duration-1000 active:scale-95 bg-[#2020206e]">
        <span className="relative block w-full h-[18rem] object-cover overflow-hidden rounded-[1.05rem]">
          <Image
            src={banner}
            alt={name}
            layout='fill'
            objectFit='cover'
          />
        </span>
        <span className="block px-3 py-4">
          <span className="block text-white font-medium tracking-wide"> {name} </span>
          <span className="flex items-center justify-between">
            <span>
              <span className="block text-[.7rem] text-[#5C6160] mt-1"> Volume </span>
              <span className="block text-[.9rem] text-[#787878]"> 354.18ETH </span>
            </span>
            <span>
              <span className="block text-[.7rem] text-[#5C6160] mt-1"> Floor Price </span>
              <span className="block text-[.9rem] text-[#787878]"> 33ETH </span>
            </span>   
          </span>  
        </span>
      </a>


    </Link>
  );
};

export default CategoryCard;
