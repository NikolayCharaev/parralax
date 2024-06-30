
'use client'
import { useRef, useEffect } from "react";
import Image from "next/image";
import styles from './page.module.scss'
import { useTransform, useScroll, motion } from "framer-motion";
import Lenis from 'lenis'
import useDimension from "./useDimension";

const images  = [
  '1.jpeg',
  '2.jpeg',
  '3.jpeg',
  '4.jpeg',
  '5.jpeg',
  '6.jpeg',
]

export default function Home() {
  const container = useRef(null)

  const {height} = useDimension()
  const {scrollYProgress} = useScroll({
    target : container,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0,1], [0,height * 2])
  const y2 = useTransform(scrollYProgress, [0,1], [0,height * 1.5])
  const y3 = useTransform(scrollYProgress, [0,1], [0,height * 0.7])
  const y4 = useTransform(scrollYProgress, [0,1], [0,height * 1])

useEffect(() => { 
  const lenis = new Lenis()

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  
  requestAnimationFrame(raf)
},[])

  return (
   <main className={styles.main}>
    <div className={styles.spacer}></div>
    <div ref={container} className={styles.gallery}>
      <Column images={[images[0],images[1], images[2]]} y={y} />
      <Column images={[images[3],images[4], images[5]]} y={y2}/>
      <Column images={[images[0],images[1], images[2]]} y={y3} />
      <Column images={[images[3],images[4], images[5]]} y={y4} />
    </div>
    <div className={styles.spacer}></div>
   </main>
  );
}




const Column = ({images,y}) => { 
  return(
    <motion.div style={{y}} className={styles.column}>
      {
        images.map((src, index) => { 
          return(
            <div  key={index} className={styles.imageContainer}>
              <Image src={'/' + src} fill alt="image"/>
            </div>
          )
        })
      }
    </motion.div>
  )
}