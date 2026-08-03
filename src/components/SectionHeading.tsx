interface SectionHeadingProps {
  label: string
  title: string
  subtitle?: string
  light?: boolean
  accentLabel?: boolean
  center?: boolean
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  light = false,
  accentLabel = false,
  center = true,
}: SectionHeadingProps) {
  return (
    <div className={`${center ? 'text-center' : ''} ${center ? 'mx-auto max-w-2xl' : ''}`}>
      <span
        className={`text-xs font-medium uppercase tracking-[0.1em] ${
          accentLabel ? 'text-[#F2A900]' : 'text-[#0073C9]'
        }`}
      >
        {label}
      </span>
      <h2
        className={`mt-4 font-display text-3xl font-semibold leading-tight md:text-4xl lg:text-[42px] ${
          light ? 'text-white' : 'text-[#1A1A1A]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed md:text-lg ${
            light ? 'text-white/70' : 'text-[#5A6B78]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
