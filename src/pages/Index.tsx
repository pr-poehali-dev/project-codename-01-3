import { useState } from "react"
import { motion } from "framer-motion"
import HeroSection from "@/components/HeroSection"
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll"
import { Timeline } from "@/components/ui/timeline"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero"
import BookingModal from "@/components/BookingModal"
import EditableText from "@/components/EditableText"
import EditableImage from "@/components/EditableImage"
import { useEditMode } from "@/hooks/useEditMode"
import Icon from "@/components/ui/icon"

const defaultData = {
  missionLabel: "Наша история",
  missionTitle: "О НАС",
  missionText:
    "В LOFT CINEMA & KARAOKE мы создаём пространство, где каждый вечер становится особенным. Забудьте об обычных развлечениях — здесь кирпичные стены, бархат и приглушённый свет встречаются с мощным звуком и большим экраном. Восемь уникальных залов, каждый со своим характером, ждут вас — будь то романтический вечер, шумная вечеринка или корпоратив в стиле голливудского кино. Живая музыка, безупречный звук, изысканные напитки. Это не просто развлечение — это ваша история.",

  timelineLabel: "Выбирайте своё настроение",
  timelineTitle: "8 ЗАЛОВ",
  timelineSubtitle: "Каждый зал — отдельная вселенная. Найдите свою атмосферу.",
  timelineEntries: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80",
      alt: "Зал Красный Бархат",
      title: "Красный Бархат & Noir Lounge",
      description:
        "Два зала для тех, кто ценит атмосферу. «Красный Бархат» вмещает до 10 гостей: проектор 4K, акустика Bose, мини-бар. «Noir Lounge» — экран 120″, световое шоу и диванные зоны для 8 человек. Идеально для романтики и дружеских вечеров.",
      layout: "left" as const,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
      alt: "Зал Кабаре",
      title: "Кабаре & Джаз",
      description:
        "«Кабаре» — настоящая сцена для ваших выступлений: микрофоны, диско-шар, до 15 гостей. «Джаз» — камерный зал для 6 персон с Hi-Fi звуком и живыми цветами. Здесь рождаются лучшие воспоминания вашей жизни.",
      layout: "right" as const,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=80",
      alt: "VIP залы",
      title: "Голливуд, Арт-Хаус, Vintage & VIP Suite",
      description:
        "«Голливуд» — IMAX-экран, Dolby Atmos, кресла-реклайнеры, до 20 гостей. «Арт-Хаус» — дизайнерский интерьер с арт-объектами. «Vintage» — камин, вино, ретро-атмосфера. VIP Suite — звёздный потолок и персональный бармен для особых событий.",
      layout: "left" as const,
    },
  ],

  testimonialsLabel: "Мнения гостей",
  testimonialsTitle: "Что говорят наши",
  testimonialsHighlight: "ГОСТИ",
  testimonialsSubtitle: "Реальные отзывы людей, которые уже провели с нами незабываемый вечер.",

  ctaImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80",
  ctaImageMobile: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1080&q=80",
}

export default function Index() {
  const { isEditMode } = useEditMode()
  const [data, setData] = useState(defaultData)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const set = (key: keyof typeof defaultData) => (val: string) =>
    setData((prev) => ({ ...prev, [key]: val }))

  const setEntry = (idx: number, field: "title" | "description" | "image") => (val: string) =>
    setData((prev) => ({
      ...prev,
      timelineEntries: prev.timelineEntries.map((e, i) =>
        i === idx ? { ...e, [field]: val } : e
      ),
    }))

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--dark-bg))" }}>
      <HeroSection />

      {/* ── MISSION ── */}
      <section id="mission" className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />
        <div className="absolute inset-0 loft-texture pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <EditableText
              as="p"
              value={data.missionLabel}
              onChange={set("missionLabel")}
              className="text-[hsl(345,65%,55%)] text-xs font-semibold tracking-[0.4em] uppercase mb-4 block"
            />
            <EditableText
              as="h2"
              value={data.missionTitle}
              onChange={set("missionTitle")}
              className="text-4xl md:text-6xl font-black tracking-wider mb-12 text-wine-gradient block"
              style={{ fontFamily: "var(--font-serif)" }}
            />
            {isEditMode ? (
              <EditableText
                as="p"
                value={data.missionText}
                onChange={set("missionText")}
                className="text-2xl md:text-3xl font-medium leading-relaxed text-white/80 block"
              />
            ) : (
              <TextGradientScroll
                text={data.missionText}
                className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-white/80"
                type="word"
                textOpacity="soft"
              />
            )}
          </div>
        </div>
      </section>

      {/* ── TIMELINE / HALLS ── */}
      <section id="community" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="relative z-10">
          <div className="container mx-auto px-6 mb-16">
            <div className="text-center">
              <EditableText
                as="p"
                value={data.timelineLabel}
                onChange={set("timelineLabel")}
                className="text-[hsl(345,65%,55%)] text-xs font-semibold tracking-[0.4em] uppercase mb-3 block"
              />
              <EditableText
                as="h2"
                value={data.timelineTitle}
                onChange={set("timelineTitle")}
                className="text-4xl md:text-6xl font-black tracking-wider mb-6 text-wine-gradient block"
                style={{ fontFamily: "var(--font-serif)" }}
              />
              <EditableText
                as="p"
                value={data.timelineSubtitle}
                onChange={set("timelineSubtitle")}
                className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto block"
              />
            </div>
          </div>

          <Timeline
            entries={data.timelineEntries.map((entry, i) =>
              isEditMode
                ? {
                    ...entry,
                    title: (
                      <EditableText
                        as="span"
                        value={entry.title}
                        onChange={setEntry(i, "title")}
                        className="text-white"
                      />
                    ) as unknown as string,
                    description: (
                      <EditableText
                        as="span"
                        value={entry.description}
                        onChange={setEntry(i, "description")}
                        className="text-white/80"
                      />
                    ) as unknown as string,
                  }
                : entry
            )}
          />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <EditableText
              as="p"
              value={data.testimonialsLabel}
              onChange={set("testimonialsLabel")}
              className="text-[hsl(345,65%,55%)] text-xs font-semibold tracking-[0.4em] uppercase mb-3 block"
            />
            <h2
              className="text-4xl md:text-6xl font-black tracking-wider mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <EditableText
                as="span"
                value={data.testimonialsTitle}
                onChange={set("testimonialsTitle")}
                className="text-white"
              />{" "}
              <EditableText
                as="span"
                value={data.testimonialsHighlight}
                onChange={set("testimonialsHighlight")}
                className="text-wine-gradient"
              />
            </h2>
            <EditableText
              as="p"
              value={data.testimonialsSubtitle}
              onChange={set("testimonialsSubtitle")}
              className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed block"
            />
          </motion.div>

          <StaggerTestimonials />
        </div>
      </section>

      {/* ── CTA PARALLAX ── */}
      <section id="join" className="relative">
        {isEditMode ? (
          <div className="relative h-64 overflow-hidden">
            <EditableImage
              src={data.ctaImage}
              alt="Фоновое фото финальной секции"
              onChange={set("ctaImage")}
              className="w-full h-full object-cover"
              style={{ height: "256px" }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <p className="text-white/60 text-sm font-semibold">Нажмите на фото чтобы сменить</p>
            </div>
          </div>
        ) : (
          <SmoothScrollHero
            scrollHeight={2500}
            desktopImage={data.ctaImage}
            mobileImage={data.ctaImageMobile}
            initialClipPercentage={30}
            finalClipPercentage={70}
          />
        )}
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="relative py-12"
        style={{ borderTop: "1px solid hsl(345,20%,15%)", background: "hsl(0,0%,4%)" }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(345,65%,42%)] to-[hsl(345,70%,25%)] flex items-center justify-center">
                  <Icon name="Wine" size={15} className="text-white" />
                </div>
                <span
                  className="text-white font-bold text-lg tracking-widest"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  LOFT CINEMA
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Лофт-пространство для незабываемых вечеров.
                <br />
                Karaoke · Cinema · Lounge
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

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  )
}
