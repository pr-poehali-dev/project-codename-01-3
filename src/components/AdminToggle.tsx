import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useEditMode } from "@/hooks/useEditMode"
import Icon from "@/components/ui/icon"

const ADMIN_PASSWORD = "admin123"

export default function AdminToggle() {
  const { isEditMode, toggleEditMode } = useEditMode()
  const [showLogin, setShowLogin] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      toggleEditMode()
      setShowLogin(false)
      setPassword("")
      setError(false)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  const handleToggle = () => {
    if (isEditMode) {
      toggleEditMode()
    } else {
      setShowLogin(true)
    }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-sm font-bold text-sm tracking-wider uppercase shadow-2xl"
        style={
          isEditMode
            ? {
                background: "linear-gradient(135deg, hsl(345,65%,38%) 0%, hsl(345,70%,25%) 100%)",
                border: "1px solid hsl(345,55%,55%)",
                color: "white",
                boxShadow: "0 0 30px hsl(345,60%,35% / 0.6)",
              }
            : {
                background: "hsl(0,0%,10%)",
                border: "1px solid hsl(345,30%,25%)",
                color: "hsl(345,65%,60%)",
              }
        }
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        <Icon name={isEditMode ? "PencilOff" : "Pencil"} size={16} />
        <span>{isEditMode ? "Выйти из редактора" : "Режим редактора"}</span>
        {isEditMode && (
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        )}
      </motion.button>

      {/* Edit mode hint bar */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 py-2 px-4 text-center text-xs font-semibold tracking-wider"
            style={{
              background: "linear-gradient(90deg, hsl(345,65%,25%) 0%, hsl(345,70%,18%) 100%)",
              borderBottom: "1px solid hsl(345,55%,40%)",
              color: "hsl(345,65%,75%)",
            }}
            initial={{ y: -40 }}
            animate={{ y: 0 }}
            exit={{ y: -40 }}
          >
            ✦ РЕЖИМ РЕДАКТИРОВАНИЯ — кликайте на любой текст или фото чтобы изменить ✦
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login modal */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowLogin(false)} />
            <motion.div
              className="relative z-10 w-full max-w-sm rounded-sm overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(0,0%,9%) 0%, hsl(345,20%,10%) 100%)",
                border: "1px solid hsl(345,30%,22%)",
              }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="px-8 pt-8 pb-6" style={{ borderBottom: "1px solid hsl(345,20%,16%)" }}>
                <button
                  onClick={() => setShowLogin(false)}
                  className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors"
                >
                  <Icon name="X" size={18} />
                </button>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Shield" size={18} className="text-[hsl(345,65%,55%)]" />
                  <span className="text-[hsl(345,65%,55%)] text-xs font-semibold tracking-[0.3em] uppercase">
                    Администратор
                  </span>
                </div>
                <h2 className="text-white text-xl font-bold" style={{ fontFamily: "var(--font-serif)" }}>
                  Вход в редактор
                </h2>
              </div>
              <form onSubmit={handleLogin} className="px-8 py-6 space-y-4">
                <div>
                  <label className="block text-white/50 text-xs font-semibold tracking-wider uppercase mb-2">
                    Пароль
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoFocus
                    className="w-full px-4 py-3 rounded-sm text-white placeholder-white/20 text-sm outline-none transition-all"
                    style={{
                      background: "hsl(0,0%,6%)",
                      border: `1px solid ${error ? "hsl(0,70%,50%)" : "hsl(345,20%,22%)"}`,
                    }}
                  />
                  {error && (
                    <p className="text-red-400 text-xs mt-1">Неверный пароль</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn-wine w-full text-white font-bold tracking-widest py-3 rounded-sm uppercase text-sm"
                >
                  Войти
                </button>
                <p className="text-white/25 text-xs text-center">
                  Пароль по умолчанию: <span className="text-white/40">admin123</span>
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
