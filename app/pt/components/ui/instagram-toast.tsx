"use client"

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface InstagramToastProps {
  isVisible: boolean
  onClose: () => void
  avatar: string
  name: string
  message: string
}

export function InstagramToast({ isVisible, onClose, avatar, name, message }: InstagramToastProps) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
      const timer = setTimeout(() => {
        onClose()
      }, 4000) // Auto close after 4 seconds

      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 300) // Wait for animation to complete

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!shouldRender) return null

  return (
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={cn(
          "bg-black border border-gray-600 rounded-xl p-3 shadow-2xl transition-all duration-300 ease-out",
          "flex items-center space-x-3 min-w-[280px] max-w-[350px]",
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-2 scale-95"
        )}
        onClick={onClose}
      >
        {/* Profile Picture */}
        <div className="relative flex-shrink-0">
          <img
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full object-cover blur-sm"
          />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-black flex items-center justify-center">
            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <p className="text-white font-semibold text-sm blur-sm truncate">
              {name}
            </p>
            <span className="text-gray-400 text-xs">now</span>
          </div>
          <p className="text-gray-300 text-sm blur-sm truncate mt-0.5">
            {message}
          </p>
        </div>

        {/* Instagram logo */}
        <div className="flex-shrink-0">
          <div className="w-6 h-6 bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-400 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook para gerenciar múltiplos toasts do Instagram
export function useInstagramToast() {
  const [toasts, setToasts] = useState<Array<{
    id: string
    avatar: string
    name: string
    message: string
    isVisible: boolean
  }>>([])

  const showToast = (avatar: string, name: string, message: string) => {
    const id = Math.random().toString(36).substr(2, 9)

    setToasts(prev => [...prev, {
      id,
      avatar,
      name,
      message,
      isVisible: true
    }])
  }

  const hideToast = (id: string) => {
    setToasts(prev => prev.map(toast =>
      toast.id === id ? { ...toast, isVisible: false } : toast
    ))

    // Remove toast after animation
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 300)
  }

  const ToastContainer = () => (
    <>
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={{ transform: `translateY(${index * 80}px)` }}
          className="absolute top-4 left-0 w-full"
        >
          <InstagramToast
            isVisible={toast.isVisible}
            onClose={() => hideToast(toast.id)}
            avatar={toast.avatar}
            name={toast.name}
            message={toast.message}
          />
        </div>
      ))}
    </>
  )

  return {
    showToast,
    ToastContainer
  }
}