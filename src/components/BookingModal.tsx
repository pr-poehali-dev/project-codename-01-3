import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  hallName?: string
}

export default function BookingModal({ isOpen, onClose, hallName }: BookingModalProps) {
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setPhone("")
      setName("")
      onClose()
    }, 3000)
  }

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "")
    if (digits.length <= 1) return digits ? "+" + digits : ""
    if (digits.length <= 4) return `+${digits[0]} (${digits.slice(1)}`
    if (digits.length <= 7) return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4)}`
    if (digits.length <= 9) return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
    return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-md rounded-sm overflow-hidden"
            style={{ background: "linear-gradient(135deg, hsl(0,0%,9%) 0%, hsl(345,20%,10%) 100%)", border: "1px solid hsl(345,30%,22%)" }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
          >
            {/* Header */}
            <div className="relative px-8 pt-8 pb-6" style={{ borderBottom: "1px solid hsl(345,30%,18%)" }}>
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <Icon name="Wine" size={20} className="text-[hsl(345,65%,55%)]" />
                <span className="text-[hsl(345,65%,55%)] text-xs font-semibold tracking-[0.3em] uppercase">
                  Бронирование
                </span>
              </div>
              <h2 className="text-white text-2xl font-bold" style={{ fontFamily: "var(--font-serif)" }}>
                {hallName ? `Бронь — ${hallName}` : "Забронировать зал"}
              </h2>
              <p className="text-white/50 text-sm mt-1">
                Оставьте номер — мы перезвоним и всё оформим
              </p>
            </div>

            {/* Body */}
            <div className="px-8 py-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-2">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Как к вам обращаться?"
                      required
                      className="w-full px-4 py-3 rounded-sm text-white placeholder-white/30 text-sm outline-none transition-all duration-300 focus:ring-1"
                      style={{
                        background: "hsl(0,0%,6%)",
                        border: "1px solid hsl(345,20%,20%)",
                        focusRingColor: "hsl(345,65%,42%)"
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-2">
                      Номер телефона *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      placeholder="+7 (999) 000-00-00"
                      required
                      maxLength={18}
                      className="w-full px-4 py-3 rounded-sm text-white placeholder-white/30 text-sm outline-none focus:ring-1 transition-all duration-300"
                      style={{
                        background: "hsl(0,0%,6%)",
                        border: "1px solid hsl(345,20%,20%)"
                      }}
                    />
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-wine w-full text-white font-bold tracking-widest py-4 rounded-sm uppercase text-sm"
                    >
                      Жду звонка
                    </button>
                  </div>
                  <p className="text-white/30 text-xs text-center">
                    Перезвоним в течение 15 минут в рабочее время
                  </p>
                </form>
              ) : (
                <motion.div
                  className="py-8 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "hsl(345,65%,25%)" }}>
                    <Icon name="Check" size={28} className="text-[hsl(345,65%,65%)]" />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                    Заявка принята!
                  </h3>
                  <p className="text-white/50 text-sm">
                    Мы скоро перезвоним на номер <br />
                    <span className="text-[hsl(345,65%,55%)] font-semibold">{phone}</span>
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
