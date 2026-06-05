'use client'

import styles from './MockSection.module.scss'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const MockSection = () => {
  return <section className={styles.section}></section>
}
