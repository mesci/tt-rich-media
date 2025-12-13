'use client'

type TelegramWebApp = {
  switchInlineQuery: (query: string, chooseChat?: string[]) => void
  openTelegramLink: (url: string) => void
  openLink: (url: string) => void
  showPopup?: (params: any) => void
  sendData?: (data: string) => void
}

interface InviteButtonProps {
  tg: TelegramWebApp | null
  referralCode: string
  botUsername?: string
}

export default function InviteButton({ tg, referralCode, botUsername = 'taptopia_referral_bot' }: InviteButtonProps) {
  const handleInvite = () => {
    if (!tg) {
      alert('Please open this app in Telegram')
      return
    }

    const inviteUrl = `https://t.me/${botUsername}?start=${referralCode}`
    const message = `🎮 I'm playing TapTopia and it's getting addictive.\n\nJoin me using my link and kick things off with bonus Sparks\n\n${inviteUrl}`
    
    try {
      const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteUrl)}&text=${encodeURIComponent(message)}`
      
      if (typeof (window as any).Telegram !== 'undefined' && (window as any).Telegram.WebApp) {
        const webApp = (window as any).Telegram.WebApp
        
        if (webApp.openTelegramLink) {
          webApp.openTelegramLink(shareUrl)
        } else {
          window.open(shareUrl, '_blank')
        }
      } else {
        tg.switchInlineQuery(referralCode, ['users', 'groups', 'channels'])
      }
    } catch (error) {
      tg.switchInlineQuery(referralCode, ['users', 'groups', 'channels'])
    }
  }

  return (
    <button
      onClick={handleInvite}
      className="w-full bg-black text-white py-5 px-8 rounded-lg font-bold text-lg hover:translate-y-[-2px] active:translate-y-[2px] transition-transform border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
    >
      Invite Friends
    </button>
  )
}

