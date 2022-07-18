const pageFadeUp = {
  hidden: { opacity: 0, x: 0, y: 100 },
  enter: { opacity: 1, x: 0, y: 0 },
}

const staggerParent = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
}
const staggerChild = {
    hidden: { opacity: 0, y: 5 },
    show: { opacity: 1, y: 0, },
}

export const motionConfig = {
    staggerParent,
    staggerChild,
    pageFadeUp
}