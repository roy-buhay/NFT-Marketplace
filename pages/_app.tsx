import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { NextPageWithLayout } from 'types';
import { Web3ContextProvider } from "../app/context/Web3";

import "swiper/css/bundle";
import "../app/styles/globals.css";


interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}
interface Coordinate {
  x: number,
  y: number
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  const [ mousePosition, setMousePosition ] = useState<Coordinate>({x: 0, y: 0})
  const cursorVariant = {
    default: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6
    }
  }

  useEffect(() => {
    const mouseMove = (e: { clientX: any; clientY: any; }) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }
    window.addEventListener('mousemove', mouseMove)
    return () => {
      window.removeEventListener('mousemove', mouseMove)
    }    
  }, [])

  return (
    <>
      <Web3ContextProvider>
        <>{getLayout(<Component {...pageProps} />)}</>
      </Web3ContextProvider>
      <motion.div className="cursor" variants={cursorVariant} animate='default' />
    </>
  )
}

export default MyApp;
