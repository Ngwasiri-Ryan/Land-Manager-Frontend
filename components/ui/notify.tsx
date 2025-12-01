'use client'

import React, { useEffect, useState, createContext, useContext } from 'react'
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  X,
  Bell
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

interface NotificationProps {
  id?: string
  type: NotificationType
  message: string
  caption?: string
  position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  timeout?: number
  onDismiss?: (id: string) => void
  actions?: Array<{
    label: string
    handler: () => void
    color?: string
  }>
  progress?: boolean
  multiline?: boolean
}

// Create context first
type NotificationContextType = {
  showNotification: (props: Omit<NotificationProps, 'id'>) => string
  dismissNotification: (id: string) => void
  clearAll: () => void
}

const NotificationContext = createContext<NotificationContextType | null>(null)

// Notification Component
export function Notification({
  id = Math.random().toString(36).substr(2, 9),
  type,
  message,
  caption,
  position = 'top',
  timeout = 5000,
  onDismiss,
  actions = [],
  progress = true,
  multiline = false
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [progressWidth, setProgressWidth] = useState(100)

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 100)

    // Auto dismiss
    if (timeout > 0) {
      const progressInterval = progress ? setInterval(() => {
        setProgressWidth(prev => Math.max(0, prev - (100 / (timeout / 50))))
      }, 50) : null

      const dismissTimer = setTimeout(() => {
        handleDismiss()
      }, timeout)

      return () => {
        if (progressInterval) clearInterval(progressInterval)
        clearTimeout(dismissTimer)
      }
    }
  }, [timeout, progress])

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => {
      onDismiss?.(id)
    }, 300)
  }

  const getIcon = () => {
    const baseClasses = "w-5 h-5 flex-shrink-0"
    
    switch (type) {
      case 'success':
        return <CheckCircle className={cn(baseClasses, "text-green-600")} />
      case 'error':
        return <XCircle className={cn(baseClasses, "text-red-600")} />
      case 'warning':
        return <AlertTriangle className={cn(baseClasses, "text-amber-600")} />
      case 'info':
        return <Info className={cn(baseClasses, "text-blue-600")} />
      default:
        return <Bell className={cn(baseClasses, "text-gray-600")} />
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return "bg-green-50 border-green-200"
      case 'error':
        return "bg-red-50 border-red-200"
      case 'warning':
        return "bg-amber-50 border-amber-200"
      case 'info':
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getProgressColor = () => {
    switch (type) {
      case 'success':
        return "bg-green-500"
      case 'error':
        return "bg-red-500"
      case 'warning':
        return "bg-amber-500"
      case 'info':
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPositionClasses = () => {
    const baseClasses = "fixed z-[100] mx-4 my-2 transition-all duration-300 ease-in-out"
    
    switch (position) {
      case 'top':
        return cn(baseClasses, "top-0 left-1/2 transform -translate-x-1/2", 
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0")
      case 'bottom':
        return cn(baseClasses, "bottom-0 left-1/2 transform -translate-x-1/2",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0")
      case 'top-left':
        return cn(baseClasses, "top-0 left-0",
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0")
      case 'top-right':
        return cn(baseClasses, "top-0 right-0",
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0")
      case 'bottom-left':
        return cn(baseClasses, "bottom-0 left-0",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0")
      case 'bottom-right':
        return cn(baseClasses, "bottom-0 right-0",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0")
      default:
        return cn(baseClasses, "top-0 left-1/2 transform -translate-x-1/2",
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0")
    }
  }

  return (
    <div className={getPositionClasses()}>
      <div className={cn(
        "min-w-80 max-w-md rounded-lg border shadow-lg backdrop-blur-sm",
        getBackgroundColor(),
        multiline ? "py-4" : "py-3"
      )}>
        {/* Progress Bar */}
        {progress && timeout > 0 && (
          <div className="h-1 bg-gray-200 rounded-t-lg overflow-hidden">
            <div 
              className={cn("h-full transition-all duration-50 ease-linear", getProgressColor())}
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        )}

        <div className={cn("flex items-start gap-3", multiline ? "px-4" : "px-4")}>
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>

          {/* Content */}
          <div className={cn("flex-1 min-w-0", multiline ? "py-1" : "py-0.5")}>
            <div className={cn(
              "font-medium text-gray-900",
              multiline ? "text-base" : "text-sm"
            )}>
              {message}
            </div>
            {caption && (
              <div className={cn(
                "text-gray-600 mt-1",
                multiline ? "text-sm" : "text-xs"
              )}>
                {caption}
              </div>
            )}

            {/* Actions */}
            {actions.length > 0 && (
              <div className="flex gap-3 mt-3">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.handler}
                    className={cn(
                      "text-sm font-medium px-3 py-1 rounded-md transition-colors",
                      action.color || "text-blue-600 hover:bg-blue-100"
                    )}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Notification Provider Component
export function NotificationProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [notifications, setNotifications] = useState<NotificationProps[]>([])

  const showNotification = (props: Omit<NotificationProps, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const notification = { ...props, id }
    
    setNotifications(prev => [...prev, notification])
    return id
  }

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const NotificationContainer = () => (
    <>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          {...notification}
          onDismiss={dismissNotification}
        />
      ))}
    </>
  )

  return (
    <NotificationContext.Provider value={{ showNotification, dismissNotification, clearAll }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

// Hook to use notifications
export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

// Hook for easy notification methods
export function useNotify() {
  const { showNotification } = useNotification()
  
  return {
    success: (message: string, options?: Omit<NotificationProps, 'type' | 'message'>) => 
      showNotification({ 
        type: 'success', 
        message, 
        position: 'bottom',
        timeout: 4000,
        ...options 
      }),
    
    error: (message: string, options?: Omit<NotificationProps, 'type' | 'message'>) => 
      showNotification({ 
        type: 'error', 
        message, 
        position: 'top-right',
        timeout: 5000,
        ...options 
      }),
    
    warning: (message: string, options?: Omit<NotificationProps, 'type' | 'message'>) => 
      showNotification({ 
        type: 'warning', 
        message, 
        position: 'top-right',
        timeout: 5000,
        ...options 
      }),
    
    info: (message: string, options?: Omit<NotificationProps, 'type' | 'message'>) => 
      showNotification({ 
        type: 'info', 
        message, 
        position: 'top-right',
        timeout: 4000,
        ...options 
      })
  }
}