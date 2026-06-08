import { useRef } from "react"
import { useEditMode } from "@/hooks/useEditMode"
import Icon from "@/components/ui/icon"

interface EditableImageProps {
  src: string
  alt: string
  onChange: (src: string) => void
  className?: string
  style?: React.CSSProperties
}

export default function EditableImage({ src, alt, onChange, className = "", style }: EditableImageProps) {
  const { isEditMode } = useEditMode()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUrl = () => {
    const url = prompt("Вставьте URL изображения:", src)
    if (url && url.trim()) onChange(url.trim())
  }

  if (!isEditMode) {
    return <img src={src} alt={alt} className={className} style={style} />
  }

  return (
    <div className="relative group" style={style}>
      <img src={src} alt={alt} className={className} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        style={{ background: "rgba(0,0,0,0.6)", outline: "2px dashed hsl(345,65%,55%)" }}
        onClick={handleUrl}
      >
        <div className="text-center">
          <Icon name="ImagePlus" size={28} className="text-white mx-auto mb-2" />
          <span className="text-white text-xs font-semibold">Сменить фото</span>
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" />
    </div>
  )
}
