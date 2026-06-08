import { createContext, useContext, useState, ReactNode } from "react"

interface EditModeContextType {
  isEditMode: boolean
  toggleEditMode: () => void
}

const EditModeContext = createContext<EditModeContextType>({
  isEditMode: false,
  toggleEditMode: () => {},
})

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const toggleEditMode = () => setIsEditMode((v) => !v)
  return (
    <EditModeContext.Provider value={{ isEditMode, toggleEditMode }}>
      {children}
    </EditModeContext.Provider>
  )
}

export function useEditMode() {
  return useContext(EditModeContext)
}
