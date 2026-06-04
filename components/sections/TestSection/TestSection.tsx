'use client'

import styles from './TestSection.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export const TestSection = () => {
  const title = 'Plně responzivní aplikace'
  const description =
    'Okamžitě vidí, jak si vede ve srovnání s ostatními v rámci týmu nebo celé společnosti, a zároveň sleduje svůj pokrok.'

  useGSAP(() => {
    gsap.from(`.${styles.title}`, {
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
    })
  })

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            {title}
          </h2>
          <p className={styles.description}>
            {description}
          </p>
        </div>

        <div className={styles.mediaWrapper}>
          <img
            src='/images/phone.png'
            alt='Phone interface'
            className={styles.phone}
          />

          <img
            src='/images/desktop.png'
            alt='Laptop interface'
            className={styles.desktop}
          />

          <img
            src='/images/tablet.png'
            alt='Tablet interface'
            className={styles.tablet}
          />
        </div>
      </div>
    </section>
  )
}
