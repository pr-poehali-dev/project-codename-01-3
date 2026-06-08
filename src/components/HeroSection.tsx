import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import Icon from "@/components/ui/icon"
import BookingModal from "@/components/BookingModal"
import EditableText from "@/components/EditableText"
import EditableImage from "@/components/EditableImage"
import { useEditMode } from "@/hooks/useEditMode"

const defaultHero = {
  brand: "LOFT CINEMA",
  tagline: "Лофт-пространство нового уровня",
  title1: "LOFT",
  title2: "KARAOKE",
  title3: "CINEMA",
  subtitle: "8 уникальных залов · Атмосфера лофт · Живые эмоции",
  ctaBook: "Забронировать зал",
  ctaHalls: "Смотреть залы",
  slides: [
    {
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80",
      alt: "Лофт-кинотеатр с атмосферным светом",
    },
    {
      image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=1920&q=80",
      alt: "Уютная атмосфера вечеринки",
    },
    {
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&q=80",
      alt: "Музыка и развлечения",
    },
  ],
  navItems: [
    { name: "Главная", href: "#hero" },
    { name: "О нас", href: "#mission" },
    { name: "Залы", href: "#community" },
    { name: "Отзывы", href: "#testimonials" },
    { name: "Забронировать", href: "#join" },
  ],
}

export default function HeroSection() {
  const { isEditMode } = useEditMode()
  const [data, setData] = useState(defaultHero)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const set = (key: keyof typeof defaultHero) => (val: string) =>
    setData((prev) => ({ ...prev, [key]: val }))

  const setSlideImage = (idx: number) => (val: string) =>
    setData((prev) => ({
      ...prev,
      slides: prev.slides.map((s, i) => (i === idx ? { ...s, image: val } : s)),
    }))

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % data.slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + data.slides.length) % data.slides.length)

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background slides */}
      <AnimatePresence mode="wait">
        {isEditMode ? (
          <EditableImage
            key={currentSlide}
            src={data.slides[currentSlide].image}
            alt={data.slides[currentSlide].alt}
            onChange={setSlideImage(currentSlide)}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ position: "absolute", inset: 0 }}
          />
        ) : (
          <motion.div
            key={currentSlide}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${data.slides[currentSlide].image}')` }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
      <div className="absolute inset-0 loft-texture" />

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(345,65%,42%)] to-[hsl(345,70%,25%)] flex items-center justify-center">
            <Icon name="Wine" size={16} className="text-white" />
          </div>
          <EditableText
            as="span"
            value={data.brand}
            onChange={set("brand")}
            className="text-white font-bold text-xl tracking-widest uppercase"
            style={{ fontFamily: "var(--font-serif)" }}
          />
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {data.navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="relative text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide pb-1 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[hsl(345,65%,55%)] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          <button
            onClick={() => setIsBookingOpen(true)}
            className="btn-wine text-white text-sm font-semibold tracking-wider px-6 py-2.5 rounded-sm uppercase"
          >
            <EditableText as="span" value={data.ctaBook} onChange={set("ctaBook")} className="text-white" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Icon name={isMenuOpen ? "X" : "Menu"} size={26} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute inset-0 z-30 md:hidden flex flex-col items-center justify-center"
            style={{ background: "rgba(10,4,8,0.97)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="absolute top-5 right-6 text-white" onClick={() => setIsMenuOpen(false)}>
              <Icon name="X" size={28} />
            </button>
            <div className="flex flex-col items-center gap-8">
              {data.navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-white text-2xl font-bold tracking-wider hover:text-[hsl(345,65%,55%)] transition-colors"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => { setIsMenuOpen(false); setIsBookingOpen(true) }}
                className="btn-wine text-white font-semibold tracking-wider px-8 py-3 rounded-sm uppercase mt-4"
              >
                {data.ctaBook}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="text-center text-white max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <EditableText
              as="p"
              value={data.tagline}
              onChange={set("tagline")}
              className="text-[hsl(345,65%,55%)] text-sm md:text-base font-semibold tracking-[0.4em] uppercase mb-4 block"
            />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-wider mb-4 leading-none"
            style={{ fontFamily: "var(--font-serif)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <EditableText as="span" value={data.title1} onChange={set("title1")} className="text-wine-gradient block" />
            <EditableText as="span" value={data.title2} onChange={set("title2")} className="text-white block" />
            <EditableText as="span" value={data.title3} onChange={set("title3")} className="text-wine-gradient block" />
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <EditableText
              as="p"
              value={data.subtitle}
              onChange={set("subtitle")}
              className="text-lg md:text-xl font-light tracking-wide mb-10 text-white/70 max-w-xl mx-auto block"
            />
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <button
              onClick={() => setIsBookingOpen(true)}
              className="btn-wine text-white font-bold text-lg tracking-widest px-10 py-4 rounded-sm uppercase"
            >
              {data.ctaBook}
            </button>
            <LiquidButton
              size="xxl"
              className="font-semibold text-lg tracking-wide"
              onClick={() => scrollToSection("#community")}
            >
              {data.ctaHalls}
            </LiquidButton>
          </motion.div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button onClick={prevSlide} className="text-white/60 hover:text-white transition-colors p-2">
          <Icon name="ChevronLeft" size={24} />
        </button>
        <div className="flex gap-2">
          {data.slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentSlide ? "w-8 h-2 bg-[hsl(345,65%,55%)]" : "w-2 h-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
        <button onClick={nextSlide} className="text-white/60 hover:text-white transition-colors p-2">
          <Icon name="ChevronRight" size={24} />
        </button>
      </div>

      {/* Side indicators */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3">
        {data.slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all duration-300 rounded-full ${
              i === currentSlide ? "h-10 w-1 bg-[hsl(345,65%,55%)]" : "h-6 w-1 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  )
}
