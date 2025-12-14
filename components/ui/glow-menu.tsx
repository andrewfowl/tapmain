"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface MenuItem {
  icon: LucideIcon | React.FC<{ className?: string }>
  label: string
  href: string
  gradient?: string
  iconColor?: string
  badge?: number
}

interface MenuBarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MenuItem[]
  activeItem?: string
  onItemClick?: (label: string, href: string) => void
  loading?: boolean
}

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 1.5,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
}

const sharedTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
}

const neutralGradient =
  "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0) 100%)"

function MenuItemSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-4 rounded-none animate-pulse">
      <div className="h-5 w-5 bg-white/10 rounded-none" />
      <div className="flex-1 h-4 bg-white/10 rounded-none" />
    </div>
  )
}

export const MenuBar = React.forwardRef<HTMLDivElement, MenuBarProps>(
  ({ className, items, activeItem, onItemClick, loading = false, ...props }, ref) => {
    if (loading) {
      return (
        <nav
          ref={ref}
          className={cn(
            "p-2 rounded-none bg-[#1a1a1a]/80 backdrop-blur-lg border border-white/10 shadow-lg",
            className,
          )}
          {...props}
        >
          <ul className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <li key={i}>
                <MenuItemSkeleton />
              </li>
            ))}
          </ul>
        </nav>
      )
    }

    return (
      <motion.nav
        ref={ref}
        className={cn(
          "p-2 rounded-none bg-[#1a1a1a]/80 backdrop-blur-lg border border-white/10 shadow-lg relative overflow-hidden",
          className,
        )}
        initial="initial"
        whileHover="hover"
        {...props}
      >
        <ul className="flex flex-col gap-3 relative z-10">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = item.label === activeItem

            return (
              <motion.li key={item.label} className="relative">
                <button onClick={() => onItemClick?.(item.label, item.href)} className="block w-full text-left">
                  <motion.div
                    className="block rounded-none overflow-visible group relative"
                    style={{ perspective: "600px" }}
                    whileHover="hover"
                    initial="initial"
                  >
                    <motion.div
                      className={cn(
                        "flex items-center gap-3 px-4 py-4 relative z-10 bg-transparent transition-colors rounded-none",
                        isActive ? "text-white" : "text-white/60 group-hover:text-white",
                      )}
                      variants={glowVariants}
                      animate={isActive ? "hover" : "initial"}
                      style={{
                        background: neutralGradient,
                        opacity: isActive ? 1 : 0,
                        borderRadius: "0px",
                      }}
                    />
                    <motion.div
                      className={cn(
                        "flex items-center gap-3 px-4 py-4 relative z-10 bg-transparent transition-colors rounded-none",
                        isActive ? "text-white" : "text-white/60 group-hover:text-white",
                      )}
                      variants={itemVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center bottom",
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          isActive ? "text-white" : "text-white/60 group-hover:text-white",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex-1">{item.label}</span>
                      {typeof item.badge === "number" && item.badge > 0 && (
                        <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-none">{item.badge}</span>
                      )}
                    </motion.div>
                    <motion.div
                      className={cn(
                        "flex items-center gap-3 px-4 py-4 absolute inset-0 z-10 bg-transparent transition-colors rounded-none",
                        isActive ? "text-white" : "text-white/60 group-hover:text-white",
                      )}
                      variants={backVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center top",
                        rotateX: 90,
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          isActive ? "text-white" : "text-white/60 group-hover:text-white",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex-1">{item.label}</span>
                      {typeof item.badge === "number" && item.badge > 0 && (
                        <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-none">{item.badge}</span>
                      )}
                    </motion.div>
                  </motion.div>
                </button>
              </motion.li>
            )
          })}
        </ul>
      </motion.nav>
    )
  },
)

MenuBar.displayName = "MenuBar"
