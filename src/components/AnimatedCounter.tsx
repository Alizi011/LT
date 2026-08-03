import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedCounterProps {
  target: number
  suffix?: string
  duration?: number
  className?: string
}

export default function AnimatedCounter({
  target,
  suffix = '',
  duration = 1.5,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = useState(0)

  useGSAP(() => {
    if (!ref.current) return

    const obj = { value: 0 }

    gsap.to(obj, {
      value: target,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        setDisplayValue(Math.round(obj.value))
      },
    })
  }, { scope: ref })

  const formatNumber = (n: number) => {
    return n.toLocaleString('nb-NO')
  }

  return (
    <span ref={ref} className={className}>
      {formatNumber(displayValue)}{suffix}
    </span>
  )
}
