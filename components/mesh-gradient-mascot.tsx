"use client"

export function MeshGradientMascot({
  variant = "silver",
}: { variant?: "silver" | "pink" | "blue" | "green" | "amber" | "purple" | "cyan" }) {
  const gradients = {
    silver: {
      colors: ["#F8F8F8", "#E5E5E5", "#C0C0C0", "#A8A8A8", "#808080"],
      id: "meshGradientSilver",
    },
    pink: {
      colors: ["#FFB3D9", "#F472B6", "#EC4899", "#DB2777", "#9D174D"],
      id: "meshGradientPink",
    },
    blue: {
      colors: ["#93C5FD", "#60A5FA", "#3B82F6", "#2563EB", "#1D4ED8"],
      id: "meshGradientBlue",
    },
    green: {
      colors: ["#86EFAC", "#4ADE80", "#22C55E", "#16A34A", "#15803D"],
      id: "meshGradientGreen",
    },
    amber: {
      colors: ["#FDE68A", "#FCD34D", "#FBBF24", "#F59E0B", "#D97706"],
      id: "meshGradientAmber",
    },
    purple: {
      colors: ["#D8B4FE", "#C084FC", "#A855F7", "#9333EA", "#7E22CE"],
      id: "meshGradientPurple",
    },
    cyan: {
      colors: ["#A5F3FC", "#67E8F9", "#22D3EE", "#06B6D4", "#0891B2"],
      id: "meshGradientCyan",
    },
  }

  const { colors, id } = gradients[variant]

  return (
    <div className="relative w-full max-w-[80px] mx-auto animate-float" style={{ transformOrigin: "top center" }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="231" height="289" viewBox="0 0 231 289" className="w-full h-auto">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="25%" stopColor={colors[1]} />
            <stop offset="50%" stopColor={colors[2]} />
            <stop offset="75%" stopColor={colors[3]} />
            <stop offset="100%" stopColor={colors[4]} />
          </linearGradient>
        </defs>

        <path
          d="M230.809 115.385V249.411C230.809 269.923 214.985 287.282 194.495 288.411C184.544 288.949 175.364 285.718 168.26 280C159.746 273.154 147.769 273.461 139.178 280.23C132.638 285.384 124.381 288.462 115.379 288.462C106.377 288.462 98.1451 285.384 91.6055 280.23C82.912 273.385 70.9353 273.385 62.2415 280.23C55.7532 285.334 47.598 288.411 38.7246 288.462C17.4132 288.615 0 270.667 0 249.359V115.385C0 51.6667 51.6756 0 115.404 0C179.134 0 230.809 51.6667 230.809 115.385Z"
          fill={`url(#${id})`}
        />

        {/* Left eye */}
        <ellipse cx="80" cy="120" rx="18" ry="26" fill="#0f0f0f" className="animate-blink" />
        {/* Right eye */}
        <ellipse cx="150" cy="120" rx="18" ry="26" fill="#0f0f0f" className="animate-blink" />
      </svg>
    </div>
  )
}
