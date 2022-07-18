import Head from 'next/head'
import { motion } from "framer-motion";
import { Header } from "@module/Header/";
import { Footer } from "@module/Footer/";
import { motionConfig } from "config";

export interface ILayout extends React.ComponentPropsWithoutRef<'div'> {}

const pageFadeUp = {
  hidden: { opacity: 0, x: 0, y: 100 },
  enter: { opacity: 1, x: 0, y: 0 },
}

const Default = ({
  children
}: ILayout) => <>
  <Head>
      <title> NFT Marketplace </title>
  </Head>
  <motion.main
    variants={pageFadeUp}
    initial="hidden"
    animate="enter"
    transition={{ ease: 'easeOut', duration: 0.6 }}
  >
    <div className="container mx-auto min-h-[100vh]">
      <Header />
      {children}
      <Footer />
    </div>
  </motion.main>
</>

export default Default;
