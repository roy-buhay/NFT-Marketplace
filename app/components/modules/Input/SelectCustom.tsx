import { useEffect, useState, useRef, Key } from "react";
import Image from 'next/image'
import { useField } from "formik";
import { Error } from "@module/Input";

export function SelectCustom({
  name,
  label,
  data,
  activeCategory,
  activeCollection,
}: any) {
  let errMessage: string | any
  const [field, meta, helpers] = useField(name);
  const ref = useRef<any>(null);
  const [showCollections, setShowCollections] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState<boolean>(false);

  errMessage = meta.error ? meta.error : null

  useEffect(() => {
    const checkIfClickedOutside = (e: { target: any; }) => {
      if (showCollections && ref.current && !ref.current.contains(e.target)) {
        setShowCollections(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showCollections]);

  const List = ({item} : {item: any}) => {
    return (
      <li className={`flex items-center justify-start space-x-3 cursor-pointer active:opacity-50 hover:bg-[#eeeeee] ${data.name ? "px-2 py-1" : "px-4 py-2"}`}
        onClick={() => {
          if (item.logo) {
            helpers.setValue({
              name: item.name,
              logo: item.logo,
            });
          } else {
            helpers.setValue(item);
          }
          setShowCollections(false);
          setShowCategories(false);
        }}
      >
        {item.logo && (
          <Image 
            src={item.logo} 
            alt={item.name}
            width={40}
            height={40}
            objectFit="cover"
          />
        )}
        <span>{item.logo ? item.name : item}</span>
      </li>
    );
  };

  return (
    <div className="relative">
      <span className="block text-white mb-2"> 
        {label} {errMessage && <Error error={errMessage.name ? errMessage.name : errMessage} />}</span>
      <span
        className={`flex items-center bg-white min-h-[3rem] cursor-pointer border-[3px] border-red ${errMessage && "border-red-600"} ${activeCollection ? "px-2 py-1" : "px-4 py-2"
          }`}
        onClick={() => setShowCollections(!showCollections)}
      >
        {activeCollection && <span className="relative block w-10 h-10 mr-2 overflow-hidden">
            <Image
              src={activeCollection.logo}
              alt={activeCollection.name}
              layout="fill"
              objectFit="cover"
            />
          </span>
        }
        {activeCollection ? activeCollection.name : activeCategory}
      </span>
      <ul
        ref={ref}
        className={`${showCollections
          ? "visible -translate-y-1 z-50"
          : "translate-y-0 invisible -z-50"
          } transition ease-out duration-50 absolute left-0 top-[5.2rem] bg-white overflow-x-hidden overflow-y-auto max-h-[20rem] w-full`}
      >
        {data.map((itemData: any, idx: Key) => <List key={idx} item={itemData} />)}
      </ul>
    </div>
  );
}
