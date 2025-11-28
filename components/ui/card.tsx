import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "premium" | "glass"
    hover?: boolean
  }
>(({ className = "", variant = "default", hover = false, ...props }, ref) => {
  const baseStyles = "rounded-2xl border backdrop-blur-sm transition-all duration-500"
  
  const variants = {
    default: "bg-white/60 border-gray-200/60 shadow-lg hover:shadow-xl",
    premium: "bg-gradient-to-br from-white/80 to-gray-50/80 border-green-500/20 shadow-xl hover:shadow-2xl",
    glass: "bg-white/40 border-white/30 shadow-lg backdrop-blur-xl hover:bg-white/60"
  }

  const hoverStyles = hover ? "hover:scale-105 hover:-translate-y-1" : ""

  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        hoverStyles,
        className
      )}
      style={{
        boxShadow: variant === "premium" 
          ? "0 20px 40px rgba(5, 150, 105, 0.1), 0 0 20px rgba(5, 150, 105, 0.05)"
          : "0 8px 40px rgba(0, 0, 0, 0.08)"
      }}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "border" | "gradient"
  }
>(({ className = "", variant = "default", ...props }, ref) => {
  const baseStyles = "flex flex-col space-y-1.5 p-6"
  
  const variants = {
    default: "",
    border: "border-b border-gray-200/60",
    gradient: "bg-gradient-to-r from-green-500/5 to-amber-500/5 border-b border-green-500/10"
  }

  return (
    <div
      ref={ref}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  )
})
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    variant?: "default" | "gradient" | "premium"
  }
>(({ className = "", variant = "default", ...props }, ref) => {
  const baseStyles = "text-2xl font-bold leading-none tracking-tight"
  
  const variants = {
    default: "text-gray-900",
    gradient: "bg-gradient-to-r from-gray-900 to-green-800 bg-clip-text text-transparent",
    premium: "bg-gradient-to-r from-green-700 to-amber-600 bg-clip-text text-transparent"
  }

  return (
    <h3
      ref={ref}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  )
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = "", ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-600", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn("p-6 pt-0", className)} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Premium Card with enhanced features
const PremiumCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    glow?: boolean
  }
>(({ className = "", glow = true, children, ...props }, ref) => {
  return (
    <div className="relative group">
      {/* Animated background glow */}
      {glow && (
        <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-amber-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      
      <Card
        ref={ref}
        variant="premium"
        hover={true}
        className={cn("relative", className)}
        {...props}
      >
        {/* Animated shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        {children}
      </Card>
    </div>
  )
})
PremiumCard.displayName = "PremiumCard"

// Stats Card for dashboard metrics
const StatsCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    trend?: "up" | "down" | "neutral"
    accent?: "green" | "blue" | "amber" | "emerald"
  }
>(({ className = "", trend = "neutral", accent = "green", children, ...props }, ref) => {
  const accentColors = {
    green: {
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      text: "text-green-600"
    },
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      text: "text-blue-600"
    },
    amber: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      text: "text-amber-600"
    },
    emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      text: "text-emerald-600"
    }
  }

  const trendIcons = {
    up: "↗",
    down: "↘",
    neutral: "→"
  }

  return (
    <Card
      ref={ref}
      hover={true}
      className={cn(
        "relative overflow-hidden group cursor-pointer",
        accentColors[accent].border,
        className
      )}
      {...props}
    >
      {/* Background gradient */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        accentColors[accent].bg
      )} />
      
      {/* Trend indicator */}
      <div className={cn(
        "absolute top-4 right-4 text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        accentColors[accent].text
      )}>
        {trendIcons[trend]}
      </div>

      {children}
    </Card>
  )
})
StatsCard.displayName = "StatsCard"

export { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardContent, 
  CardFooter,
  PremiumCard,
  StatsCard
}