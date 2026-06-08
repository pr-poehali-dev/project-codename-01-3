import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const SQRT_5000 = Math.sqrt(5000)

const testimonials = [
  {
    tempId: 0,
    testimonial:
      "Зал «Красный Бархат» — это что-то невероятное. Встречали день рождения подруги, и вечер получился просто сказочным. Звук, атмосфера, сервис — всё на высшем уровне!",
    by: "Анастасия К., именинница",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=AnastasijaK&backgroundColor=7c2d4a&textColor=ffffff",
  },
  {
    tempId: 1,
    testimonial:
      "Брали VIP Suite для корпоратива. Персональный бармен, звёздный потолок и полная приватность — команда была в восторге. Уже планируем повторить!",
    by: "Игорь Семёнов, директор компании",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=IgorSemenov&backgroundColor=5c2a12&textColor=ffffff",
  },
  {
    tempId: 2,
    testimonial:
      "Зал «Голливуд» с IMAX-экраном и Dolby Atmos — просто бомба! Смотрели фильм компанией 15 человек, ощущение как в настоящем кинотеатре, только уютнее.",
    by: "Мария Петрова",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=MariaPetrova&backgroundColor=8b5cf6&textColor=ffffff",
  },
  {
    tempId: 3,
    testimonial:
      "«Кабаре» — это наше любимое место! Пели всю ночь, диско-шар, сцена — чувствуешь себя настоящей звездой. Ребята, это must-visit!",
    by: "Светлана Орлова",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=SvetlanaOrlova&backgroundColor=be185d&textColor=ffffff",
  },
  {
    tempId: 4,
    testimonial:
      "Отмечали годовщину в зале «Vintage». Камин, вино, романтика — жена была в полном восторге. Лучший вечер за последние годы, обязательно вернёмся.",
    by: "Андрей Лазарев",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=AndreyLazarev&backgroundColor=7c3aed&textColor=ffffff",
  },
  {
    tempId: 5,
    testimonial:
      "Звонок, бронь, и через час мы уже в зале «Джаз». Моментальный отклик, всё чётко организовано. Аудиофилы оценят Hi-Fi систему — мы были поражены!",
    by: "Дмитрий Фролов",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=DmitriyFrolov&backgroundColor=059669&textColor=ffffff",
  },
  {
    tempId: 6,
    testimonial:
      "«Арт-Хаус» — просто произведение искусства. Дизайн, атмосфера, арт-объекты. Провели фотосессию и вечеринку в одном месте. Нестандартно и круто!",
    by: "Кристина Волк",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=KristinaVolk&backgroundColor=0ea5e9&textColor=ffffff",
  },
  {
    tempId: 7,
    testimonial:
      "Зал «Noir Lounge» — тёмная магия! Диванные зоны, световое шоу... Будто попал в кино из 60-х. Персонал внимательный, всё было идеально.",
    by: "Тимур Акбаров",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=TimurAkbarov&backgroundColor=dc2626&textColor=ffffff",
  },
  {
    tempId: 8,
    testimonial:
      "Пришли с детьми смотреть мультик в «Голливуде» — дети в шоке от кресел-реклайнеров! Звук мягкий, не пугает. Место подходит для семейного досуга.",
    by: "Наталья Смирнова, мама",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=NatalyaSmirnova&backgroundColor=f97316&textColor=ffffff",
  },
  {
    tempId: 9,
    testimonial:
      "Бронировали «Кабаре» для мальчишника. Было так круто, что гости забыли о времени! Гибкое время, демократичный ценник — всем советую.",
    by: "Руслан Ким",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=RuslanKim&backgroundColor=84cc16&textColor=ffffff",
  },
]

interface TestimonialCardProps {
  position: number
  testimonial: (typeof testimonials)[0]
  handleMove: (steps: number) => void
  cardSize: number
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0
  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 text-white"
          : "z-0 text-white/70 hover:text-white",
      )}
      style={isCenter ? {
        background: "linear-gradient(135deg, hsl(345,60%,20%) 0%, hsl(345,70%,12%) 100%)",
        borderColor: "hsl(345,55%,38%)",
        boxShadow: "0 0 30px hsl(345,60%,30% / 0.5)"
      } : {
        background: "hsl(0,0%,9%)",
        borderColor: "hsl(345,20%,20%)"
      }}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px hsl(var(--border))" : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-gray-300"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <img
        src={testimonial.imgSrc || "/placeholder.svg"}
        alt={`${testimonial.by.split(",")[0]}`}
        className="mb-4 h-14 w-12 bg-gray-100 object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px hsl(var(--background))",
        }}
      />
      <h3 className={cn("text-base sm:text-xl font-medium", isCenter ? "text-white" : "text-gray-900")}>
        "{testimonial.testimonial}"
      </h3>
      <p
        className={cn(
          "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
          isCenter ? "text-gray-300" : "text-gray-600",
        )}
      >
        - {testimonial.by}
      </p>
    </div>
  )
}

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365)
  const [testimonialsList, setTestimonialsList] = useState(testimonials)

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList]
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift()
        if (!item) return
        newList.push({ ...item, tempId: Math.random() })
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop()
        if (!item) return
        newList.unshift({ ...item, tempId: Math.random() })
      }
    }
    setTestimonialsList(newList)
  }

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)")
      setCardSize(matches ? 365 : 290)
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 600, background: "transparent" }}>
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2 ? index - (testimonialsList.length + 1) / 2 : index - testimonialsList.length / 2
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        )
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white border-2 border-gray-300 hover:bg-gray-900 hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2",
          )}
          aria-label="Предыдущий отзыв"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white border-2 border-gray-300 hover:bg-gray-900 hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2",
          )}
          aria-label="Следующий отзыв"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}