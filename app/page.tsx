'use client'

import { useEffect, useState } from 'react'
import InviteButton from './components/InviteButton'

type TelegramWebApp = {
  initData: string
  initDataUnsafe: {
    user?: {
      id: number
      first_name: string
      last_name?: string
      username?: string
    }
  }
  ready: () => void
  expand: () => void
  switchInlineQuery: (query: string, chooseChat?: string[]) => void
  openTelegramLink: (url: string) => void
  shareMessage: (message: string, callback?: () => void) => void
  openLink: (url: string) => void
  shareToStory?: (mediaUrl: string, params?: any) => void
  showPopup?: (params: any) => void
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

export default function Home() {
  const [tg, setTg] = useState<TelegramWebApp | null>(null)
  const [user, setUser] = useState<{ id: number; name: string } | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp
      webApp.ready()
      webApp.expand()
      setTg(webApp)

      if (webApp.initDataUnsafe.user) {
        setUser({
          id: webApp.initDataUnsafe.user.id,
          name: webApp.initDataUnsafe.user.first_name,
        })
      }
    }
  }, [])

  const referralCode = user?.id ? `ref_${user.id}` : 'ref_default'

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center p-6 border-2 border-black rounded-full bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight">
              Referral Program
            </h1>

            {user && (
              <p className="text-xl text-gray-600">
                Welcome, {user.name}
              </p>
            )}
          </div>

          <p className="text-base text-gray-600 max-w-sm mx-auto leading-relaxed">
            Invite your friends and earn rewards together. Share with rich media preview.
          </p>
        </div>

        <div className="space-y-4">
          <InviteButton 
            tg={tg} 
            referralCode={referralCode}
            botUsername="taptopia_referral_bot"
          />

          <div className="p-5 border-2 border-black rounded-lg bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-2 border-2 border-black rounded-lg bg-white">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-sm">
                <p className="font-bold text-black mb-2">How it works</p>
                <p className="text-gray-600 leading-relaxed">
                  Tap the button above to share an invitation with image, text, and action buttons.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-4 border-2 border-black rounded-lg bg-white">
              <p className="text-3xl font-bold mb-1">0</p>
              <p className="text-xs font-medium text-gray-600">Invited</p>
            </div>
            <div className="p-4 border-2 border-black rounded-lg bg-white">
              <p className="text-3xl font-bold mb-1">0</p>
              <p className="text-xs font-medium text-gray-600">Active</p>
            </div>
            <div className="p-4 border-2 border-black rounded-lg bg-white">
              <p className="text-3xl font-bold mb-1">0</p>
              <p className="text-xs font-medium text-gray-600">Rewards</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

