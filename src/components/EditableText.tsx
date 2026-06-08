import { useRef, useEffect, ReactNode } from "react"
import { useEditMode } from "@/hooks/useEditMode"

interface EditableTextProps {
  value: string
  onChange: (val: string) => void
  className?: string
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div"
  multiline?: boolean
  style?: React.CSSProperties
  children?: ReactNode
}

export default function EditableText({
  value,
  onChange,
  className = "",
  as: Tag = "span",
  style,
}: EditableTextProps) {
  const { isEditMode } = useEditMode()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value
    }
  }, [value, isEditMode])

  if (!isEditMode) {
    return (
      <Tag className={className} style={style}>
        {value}
      </Tag>
    )
  }

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement & HTMLParagraphElement>}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.currentTarget.textContent || "")}
      className={className}
      style={{
        ...style,
        outline: "2px dashed hsl(345,65%,55%)",
        outlineOffset: "3px",
        borderRadius: "2px",
        cursor: "text",
        minWidth: "20px",
        display: "inline-block",
      }}
    >
      {value}
    </Tag>
  )
}
