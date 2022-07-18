
import { Key } from 'react'
import { motion } from "framer-motion";
import { motionConfig } from "config";
import { INFT } from 'types';
import { useMyItems } from "@hooks/index";
import { RegularCard } from "@module/Card";

export interface IProps {
  data: INFT,
  idx: number,
  key: Key
}

const Info:React.FC = () => {
  const { data } = useMyItems();

  return <>
      {data.length < 1 && <p className="text-white"> No items to display </p>}
      <motion.ul
        variants={motionConfig.staggerParent}
        initial="hidden"
        animate="show"
        whileInView={"show"}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 nft w-full"
      >
        {data ? (
          data.map((data, key) => {
            return (
              <motion.li key={key} variants={motionConfig.staggerParent}
                transition={{ ease: 'easeOut', duration: 0.8 }}>
                <RegularCard key={key} data={data} />
              </motion.li>
            );
          })
        ) : (
          <p> Loading nfts... </p>
        )}
      </motion.ul>
    </>
}

export default Info