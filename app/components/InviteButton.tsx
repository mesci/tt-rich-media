'use client'

type TelegramWebApp = {
  switchInlineQuery: (query: string, chooseChat?: string[]) => void
  openTelegramLink: (url: string) => void
  shareMessage?: (message: string, callback?: () => void) => void
  shareToStory?: (mediaUrl: string, params?: any) => void
  openLink: (url: string) => void
  showPopup?: (params: any) => void
  requestContact?: (callback: (status: boolean) => void) => void
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

    const shareUrl = `https://t.me/${botUsername}?startapp=${referralCode}`
    const shareText = `I'm playing TapTopia and it's getting addictive.\n\nJoin me using my link and kick things off with bonus Sparks\n\n${shareUrl}`
    
    try {
      const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
      if (tg.openLink) {
        tg.openLink(url)
      } else {
        tg.openTelegramLink(url)
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

