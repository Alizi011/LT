import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  x?: number
  duration?: number
  stagger?: number
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  y = 30,
  x = 0,
  duration = 0.6,
  stagger = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return
    const els = ref.current.children
    if (els.length === 0) return

    gsap.fromTo(
      els,
      { opacity: 0, y, x },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration,
        stagger,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: ref })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
