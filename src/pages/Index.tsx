import HeroSection from "@/components/HeroSection"
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"
import { motion } from "framer-motion"
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero"
import BookingModal from "@/components/BookingModal"
import Icon from "@/components/ui/icon"
import { useState } from "react"

const halls = [
  {
    id: 1,
    name: "Красный Бархат",
    capacity: "до 10 чел",
    features: ["Проектор 4K", "Акустика Bose", "Мини-бар"],
    icon: "Film",
    color: "from-[hsl(345,65%,30%)] to-[hsl(345,70%,18%)]",
  },
  {
    id: 2,
    name: "Noir Lounge",
    capacity: "до 8 чел",
    features: ["Экран 120″", "Световое шоу", "Диванные зоны"],
    icon: "Tv",
    color: "from-[hsl(270,40%,25%)] to-[hsl(270,50%,15%)]",
  },
  {
    id: 3,
    name: "Кабаре",
    capacity: "до 15 чел",
    features: ["Сцена", "Микрофоны", "Диско-шар"],
    icon: "Mic",
    color: "from-[hsl(345,65%,30%)] to-[hsl(20,60%,20%)]",
  },
  {
    id: 4,
    name: "Джаз",
    capacity: "до 6 чел",
    features: ["Hi-Fi звук", "Уют", "Живые цветы"],
    icon: "Music",
    color: "from-[hsl(38,60%,30%)] to-[hsl(38,70%,18%)]",
  },
  {
    id: 5,
    name: "Голливуд",
    capacity: "до 20 чел",
    features: ["IMAX-экран", "Dolby Atmos", "Кресла-реклайнеры"],
    icon: "Star",
    color: "from-[hsl(345,55%,28%)] to-[hsl(345,65%,16%)]",
  },
  {
    id: 6,
    name: "Арт-Хаус",
    capacity: "до 12 чел",
    features: ["Дизайнерский интерьер", "Проектор", "Арт-объекты"],
    icon: "Palette",
    color: "from-[hsl(200,40%,22%)] to-[hsl(200,50%,14%)]",
  },
  {
    id: 7,
    name: "Vintage",
    capacity: "до 8 чел",
    features: ["Ретро-атмосфера", "Винный бар", "Камин"],
    icon: "Wine",
    color: "from-[hsl(345,70%,32%)] to-[hsl(345,75%,18%)]",
  },
  {
    id: 8,
    name: "VIP Suite",
    capacity: "до 6 чел",
    features: ["Приватность", "Персональный бармен", "Звёздный потолок"],
    icon: "Crown",
    color: "from-[hsl(38,75%,35%)] to-[hsl(38,80%,20%)]",
  },
]

export default function Index() {
  const [bookingHall, setBookingHall] = useState<string | undefined>(undefined)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const openBooking = (hallName?: string) => {
    setBookingHall(hallName)
    setIsBookingOpen(true)
  }

  const missionStatement =
    "В LOFT CINEMA & KARAOKE мы создаём пространство, где каждый вечер становится особенным. Забудьте об обычных развлечениях — здесь сырцовые кирпичные стены, бархат и приглушённый свет встречаются с мощным звуком и большим экраном. Восемь уникальных залов, каждый со своим характером, ждут вас — будь то романтический вечер, шумная вечеринка или корпоратив в стиле голливудского кино. Живая музыка, безупречный звук, изысканные напитки. Это не просто развлечение — это ваша история."

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--dark-bg))" }}>
      {/* Hero */}
      <HeroSection />

      {/* Mission */}
      <section id="mission" className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-subtle opacity-40 pointer-events-none" />
        <div className="absolute inset-0 loft-texture pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              className="text-[hsl(345,65%,55%)] text-xs font-semibold tracking-[0.4em] uppercase mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Наша история
            </motion.p>
            <h2
              className="text-4xl md:text-6xl font-black tracking-wider mb-12 text-wine-gradient"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              О НАС
            </h2>
            <TextGradientScroll
              text={missionStatement}
              className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-white/80"
              type="word"
              textOpacity="soft"
            />
          </div>
        </div>
      </section>

      {/* Halls Section */}
      <section id="halls" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.p
              className="text-[hsl(345,65%,55%)] text-xs font-semibold tracking-[0.4em] uppercase mb-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Выбирайте своё настроение
            </motion.p>
            <h2
              className="text-4xl md:text-6xl font-black tracking-wider text-white"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              8 <span className="text-wine-gradient">ЗАЛОВ</span>
            </h2>
            <p className="text-white/50 text-lg mt-4 max-w-2xl mx-auto">
              Каждый зал — отдельная вселенная. Найдите свою атмосферу.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {halls.map((hall, i) => (
              <motion.div
                key={hall.id}
                className="group relative rounded-sm overflow-hidden cursor-pointer"
                style={{ border: "1px solid hsl(345,20%,18%)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${hall.color} opacity-80`} />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300" />

                <div className="relative z-10 p-6 flex flex-col h-full min-h-[240px]">
                  <div className="flex items-center justify-between mb-auto">
                    <span className="text-white/40 text-xs font-semibold tracking-widest uppercase">
                      Зал {hall.id}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <Icon name={hall.icon as Parameters<typeof Icon>[0]["name"]} size={18} className="text-white" fallback="Star" />
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3
                      className="text-white text-xl font-bold mb-1"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {hall.name}
                    </h3>
                    <p className="text-white/50 text-sm mb-4">{hall.capacity}</p>
                    <ul className="space-y-1 mb-6">
                      {hall.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-white/70 text-xs">
                          <span className="w-1 h-1 rounded-full bg-[hsl(345,65%,55%)]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => openBooking(hall.name)}
                      className="w-full py-2.5 text-xs font-bold tracking-widest uppercase text-white rounded-sm transition-all duration-300"
                      style={{
                        background: "hsl(345,60%,30% / 0.6)",
                        border: "1px solid hsl(345,60%,45% / 0.4)"
                      }}
                    >
                      Забронировать
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[hsl(345,65%,55%)] text-xs font-semibold tracking-[0.4em] uppercase mb-3">
              Мнения гостей
            </p>
            <h2
              className="text-4xl md:text-6xl font-black tracking-wider text-white mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Что говорят наши{" "}
              <span className="text-wine-gradient">ГОСТИ</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Реальные отзывы людей, которые уже провели с нами незабываемый вечер.
            </p>
          </motion.div>
          <StaggerTestimonials />
        </div>
      </section>

      {/* CTA Parallax */}
      <section id="booking" className="relative">
        <SmoothScrollHero
          scrollHeight={2200}
          desktopImage="https://images.unsplash.com/photo-1574169208507-84376144848b?w=1920&q=80"
          mobileImage="https://images.unsplash.com/photo-1574169208507-84376144848b?w=1200&q=80"
          initialClipPercentage={30}
          finalClipPercentage={70}
        />
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t" style={{ borderColor: "hsl(345,20%,15%)", background: "hsl(0,0%,4%)" }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(345,65%,42%)] to-[hsl(345,70%,25%)] flex items-center justify-center">
                  <Icon name="Wine" size={15} className="text-white" />
                </div>
                <span className="text-white font-bold text-lg tracking-widest" style={{ fontFamily: "var(--font-serif)" }}>
                  LOFT CINEMA
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Лофт-пространство для незабываемых вечеров.<br />Karaoke · Cinema · Lounge
              </p>
            </div>
            <div>
              <h4 className="text-white/60 text-xs font-semibold tracking-[0.3em] uppercase mb-4">Навигация</h4>
              <ul className="space-y-2">
                {["О нас", "Залы", "Отзывы", "Бронирование"].map((item) => (
                  <li key={item}>
                    <span className="text-white/40 hover:text-[hsl(345,65%,55%)] text-sm cursor-pointer transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white/60 text-xs font-semibold tracking-[0.3em] uppercase mb-4">Контакты</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Icon name="Phone" size={15} className="text-[hsl(345,65%,55%)]" />
                  <span className="text-white/60 text-sm">+7 (XXX) XXX-XX-XX</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" size={15} className="text-[hsl(345,65%,55%)]" />
                  <span className="text-white/60 text-sm">Ваш адрес, город</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Clock" size={15} className="text-[hsl(345,65%,55%)]" />
                  <span className="text-white/60 text-sm">Ежедневно 12:00 – 03:00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6 text-center" style={{ borderTop: "1px solid hsl(345,20%,14%)" }}>
            <p className="text-white/20 text-xs">© 2024 Loft Cinema Karaoke. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} hallName={bookingHall} />
    </div>
  )
}
