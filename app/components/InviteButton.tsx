'use client'

type TelegramWebApp = {
  switchInlineQuery: (query: string, chooseChat?: string[]) => void
  openTelegramLink: (url: string) => void
  openLink: (url: string) => void
  showPopup?: (params: any) => void
  sendData?: (data: string) => void
  shareMessage?: (preparedMessageId: string, callback?: (success: boolean) => void) => void
  initDataUnsafe: {
    user?: {
      id: number
      first_name?: string
    }
  }
}

interface InviteButtonProps {
  tg: TelegramWebApp | null
  referralCode: string
  botUsername?: string
}

export default function InviteButton({ tg, referralCode, botUsername = 'taptopia_referral_bot' }: InviteButtonProps) {
  const handleInvite = async () => {
    if (!tg) {
      alert('Please open this app in Telegram')
      return
    }

    if (tg.shareMessage && tg.initDataUnsafe?.user?.id) {
      try {
        const response = await fetch('/api/prepare-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: tg.initDataUnsafe.user.id,
            referralCode: referralCode
          })
        });

        const data = await response.json();
        
        if (data.preparedMessageId) {
          tg.shareMessage(data.preparedMessageId, (success) => {
            if (success) {
              console.log('Message shared successfully!');
            }
          });
        } else {
          console.error('Failed to get prepared message ID');
          tg.switchInlineQuery(referralCode, ['users', 'groups', 'channels']);
        }
      } catch (error) {
        console.error('Error preparing message:', error);
        tg.switchInlineQuery(referralCode, ['users', 'groups', 'channels']);
      }
    } else {
      tg.switchInlineQuery(referralCode, ['users', 'groups', 'channels']);
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

