'use client'

import React from 'react'
import { X, AlertTriangle, CheckCircle, Info, Trash2, Edit3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  title: string
  description: string
  type?: 'delete' | 'success' | 'warning' | 'info' | 'edit'
  confirmText?: string
  cancelText?: string
  isLoading?: boolean
}

export function Dialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  type = 'info',
  confirmText = 'Yes',
  cancelText = 'No',
  isLoading = false
}: DialogProps) {
  if (!isOpen) return null

  const getIcon = () => {
    switch (type) {
      case 'delete':
        return <Trash2 className="w-6 h-6 text-red-600" />
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-600" />
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-amber-600" />
      case 'edit':
        return <Edit3 className="w-6 h-6 text-blue-600" />
      default:
        return <Info className="w-6 h-6 text-blue-600" />
    }
  }

  const getButtonVariant = () => {
    switch (type) {
      case 'delete':
        return 'bg-red-600 hover:bg-red-700 text-white'
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white'
      case 'warning':
        return 'bg-amber-600 hover:bg-amber-700 text-white'
      case 'edit':
        return 'bg-blue-600 hover:bg-blue-700 text-white'
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              type === 'delete' && "bg-red-50",
              type === 'success' && "bg-green-50",
              type === 'warning' && "bg-amber-50",
              type === 'edit' && "bg-blue-50",
              type === 'info' && "bg-blue-50"
            )}>
              {getIcon()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600">{description}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(getButtonVariant(), "min-w-20")}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              confirmText
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}