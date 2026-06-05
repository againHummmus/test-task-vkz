'use client'

import styles from './TestSection.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const TestSection = () => {
  const title = 'Plně responzivní aplikace'
  const description =
    'Okamžitě vidí, jak si vede ve srovnání s ostatními v rámci týmu nebo celé společnosti, a zároveň sleduje svůj pokrok.'

  const sectionRef = useRef(null)

  useGSAP(() => {
    const mediaQueries = gsap.matchMedia()

    mediaQueries.add('(min-width: 768px)', () => {
      const assembleTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top -5%',
          end: '+=5%',
          scrub: 2,
          invalidateOnRefresh: true,
          markers: true,
        },
        defaults: {
          ease: 'power1.inOut',
        },
      })

      assembleTimeline.to(
        `.${styles.mediaWrapper}`,
        {
          yPercent: -50,
          marginBottom: (_i, target) => -target.offsetHeight * 0.5,
        },
        0
      )

      assembleTimeline.fromTo(`.${styles.phone}`, { xPercent: -300 }, { xPercent: 0 }, 0)
      assembleTimeline.fromTo(
        `.${styles.desktop}`,
        { yPercent: 10, scale: 1.1 },
        { yPercent: 0, scale: 1 },
        0
      )

      assembleTimeline.fromTo(`.${styles.tablet}`, { xPercent: 300 }, { xPercent: 0 }, 0)

      assembleTimeline.fromTo(
        `.${styles.title}, .${styles.description}`,
        { yPercent: 0, opacity: 1, lineHeight: 1.2 },
        { yPercent: -10, opacity: 0, lineHeight: 1.4, ease: 'power2.out' },
        0
      )

      const exitTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: () => assembleTimeline.scrollTrigger!.end + 250,
          end: 'bottom center',
          scrub: 1,
        },
      })

      exitTimeline.to(`.${styles.phone}`, { yPercent: -150, ease: 'power1.outIn' }, 0)
      exitTimeline.to(`.${styles.tablet}`, { yPercent: -200, ease: 'power1.outIn' }, 0)
    })

    mediaQueries.add('(max-width: 767px)', () => {
      gsap.fromTo(
        `.${styles.title}, .${styles.description}`,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      const mobileRevealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: `.${styles.mediaWrapper}`,
          start: 'top bottom',
          end: 'bottom 60%',
          scrub: 1,
        },
      })

      mobileRevealTimeline.fromTo(
        `.${styles.phone}`,
        { xPercent: -200, yPercent: 20 },
        { xPercent: 0, yPercent: 0, ease: 'power1.out' },
        0.2
      )
      mobileRevealTimeline.fromTo(
        `.${styles.tablet}`,
        { xPercent: 200, yPercent: 20 },
        { xPercent: 0, yPercent: 0, ease: 'power1.out' },
        0.2
      )
    })
  })

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.mediaWrapper}>
          <img src='/images/phone.png' alt='Phone interface' className={styles.phone} />
          <img src='/images/desktop.png' alt='Laptop interface' className={styles.desktop} />
          <img src='/images/tablet.png' alt='Tablet interface' className={styles.tablet} />
        </div>
      </div>
    </section>
  )
}
