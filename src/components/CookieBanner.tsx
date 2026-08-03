import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#C8DCF0] bg-white p-4 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <p className="text-sm text-[#5A6B78]">
          Vi bruker cookies for å gi deg en bedre opplevelse.
        </p>
        <div className="flex items-center gap-3">
          <Button
            onClick={accept}
            className="rounded-full bg-[#0073C9] px-5 py-2 text-sm font-medium text-white hover:bg-[#005A9E]"
          >
            Godta
          </Button>
          <button
            onClick={() => setVisible(false)}
            className="text-[#8A95A8] transition-colors hover:text-[#1A1A1A]"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
