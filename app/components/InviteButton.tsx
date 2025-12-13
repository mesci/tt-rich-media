'use client'

type TelegramWebApp = {
  switchInlineQuery: (query: string, chooseChat?: string[]) => void
  openTelegramLink: (url: string) => void
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

    try {
      tg.switchInlineQuery(referralCode, ['users', 'groups', 'channels'])
    } catch (error) {
      const fallbackUrl = `https://t.me/${botUsername}?start=${referralCode}`
      tg.openTelegramLink(fallbackUrl)
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

