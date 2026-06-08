import type * as React from "react"
import { useRef } from "react"
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { MapPin, Users, Calendar, Trophy } from "lucide-react"

interface SmoothScrollHeroProps {
  scrollHeight?: number
  desktopImage: string
  mobileImage: string
  initialClipPercentage?: number
  finalClipPercentage?: number
}

const SmoothScrollHero: React.FC<SmoothScrollHeroProps> = ({
  scrollHeight = 1875,
  desktopImage,
  mobileImage,
  initialClipPercentage = 25,
  finalClipPercentage = 75,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Clip path animation - image fully reveals by 70% scroll progress
  const clipStart = useTransform(scrollYProgress, [0, 0.7], [initialClipPercentage, 0])
  const clipEnd = useTransform(scrollYProgress, [0, 0.7], [finalClipPercentage, 100])
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`

  // Background size animation - completes when image is fully revealed
  const backgroundSize = useTransform(scrollYProgress, [0, 0.7], ["170%", "100%"])

  // Scale animation - completes when image is fully revealed
  const scale = useTransform(scrollYProgress, [0, 0.7], [1.2, 1])

  // CTA overlay animations - appears earlier and completes by 50%
  const ctaOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const ctaY = useTransform(scrollYProgress, [0.3, 0.5], [50, 0])

  return (
    <div ref={containerRef} style={{ height: `${scrollHeight}px` }} className="relative w-full">
      <motion.div
        className="sticky top-0 h-screen w-full bg-black overflow-hidden"
        style={{
          clipPath,
          willChange: "transform",
        }}
      >
        {/* Desktop background */}
        <motion.div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `url(${desktopImage})`,
            backgroundSize,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            scale,
          }}
        />
        {/* Mobile background */}
        <motion.div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage: `url(${mobileImage})`,
            backgroundSize,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            scale,
          }}
        />

        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/40" />

        {/* CTA Overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20"
          style={{ opacity: ctaOpacity, y: ctaY }}
        >
          <div className="text-center text-white max-w-4xl mx-auto px-6">
            <p className="text-xs font-semibold tracking-[0.4em] uppercase mb-4" style={{ color: "hsl(345,65%,60%)" }}>
              Ваш вечер начинается здесь
            </p>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-wider mb-6 leading-none"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              ЗАБРОНИРУЙТЕ
              <br />
              <span style={{ background: "linear-gradient(135deg, hsl(345,65%,65%) 0%, hsl(38,75%,65%) 50%, hsl(345,65%,65%) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                ВАШ ЗАЛ
              </span>
            </h2>

            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
              Оставьте номер телефона — мы перезвоним и подберём идеальный зал под ваш вечер.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center" style={{ background: "hsl(345,60%,30% / 0.4)" }}>
                    <MapPin className="w-5 h-5" style={{ color: "hsl(345,65%,65%)" }} />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-black text-white mb-1">8</div>
                <div className="text-xs text-white/50 font-medium">Уникальных залов</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center" style={{ background: "hsl(345,60%,30% / 0.4)" }}>
                    <Users className="w-5 h-5" style={{ color: "hsl(345,65%,65%)" }} />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-black text-white mb-1">6–20</div>
                <div className="text-xs text-white/50 font-medium">Гостей в зале</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center" style={{ background: "hsl(345,60%,30% / 0.4)" }}>
                    <Calendar className="w-5 h-5" style={{ color: "hsl(345,65%,65%)" }} />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-black text-white mb-1">365</div>
                <div className="text-xs text-white/50 font-medium">Дней в году</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center" style={{ background: "hsl(345,60%,30% / 0.4)" }}>
                    <Trophy className="w-5 h-5" style={{ color: "hsl(345,65%,65%)" }} />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-black text-white mb-1">1000+</div>
                <div className="text-xs text-white/50 font-medium">Счастливых гостей</div>
              </div>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById("booking-btn")
                if (el) el.click()
              }}
              className="font-bold text-base tracking-widest px-12 py-4 rounded-sm uppercase transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, hsl(345,60%,38%) 0%, hsl(345,70%,25%) 100%)",
                border: "1px solid hsl(345,55%,50% / 0.5)",
                boxShadow: "0 0 30px hsl(345,60%,30% / 0.5)",
                color: "white"
              }}
            >
              Забронировать сейчас
            </button>

            <div className="mt-10 pt-6" style={{ borderTop: "1px solid hsl(345,30%,25% / 0.4)" }}>
              <div className="flex flex-wrap justify-center items-center gap-6 text-white/40 text-xs font-semibold tracking-wider">
                <span>KARAOKE</span>
                <span style={{ color: "hsl(345,50%,45%)" }}>✦</span>
                <span>CINEMA</span>
                <span style={{ color: "hsl(345,50%,45%)" }}>✦</span>
                <span>LOUNGE</span>
                <span style={{ color: "hsl(345,50%,45%)" }}>✦</span>
                <span>LOFT</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SmoothScrollHero