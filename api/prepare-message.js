const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, referralCode } = req.body;
    
    if (!userId || !referralCode) {
      return res.status(400).json({ error: 'Missing userId or referralCode' });
    }

    const bot = new TelegramBot(token);
    
    const referralLink = `${webAppUrl}?ref=${referralCode}`;
    const imageUrl = `${webAppUrl}/referra_image.png`;
    
    const result = {
      type: 'photo',
      id: 'invite_' + Date.now(),
      photo_url: imageUrl,
      photo_width: 1200,
      photo_height: 630,
      thumb_url: imageUrl,
      title: 'Invite to TapTopia',
      description: 'Share this invitation with your friends',
      caption: `<b>I'm playing TapTopia and it's getting addictive.</b>\n\nJoin me using my link and kick things off with bonus Sparks`,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Enter TapTopia Now!',
              url: referralLink
            }
          ]
        ]
      }
    };

    const apiUrl = `https://api.telegram.org/bot${token}/savePreparedInlineMessage`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        result: result,
        allow_user_chats: true,
        allow_bot_chats: false,
        allow_group_chats: true,
        allow_channel_chats: false
      })
    });

    const data = await response.json();
    
    if (data.ok) {
      return res.status(200).json({ 
        preparedMessageId: data.result.id 
      });
    } else {
      console.error('Telegram API error:', data);
      return res.status(500).json({ error: 'Failed to prepare message', details: data });
    }
  } catch (error) {
    console.error('Error preparing message:', error);
    return res.status(500).json({ error: error.message });
  }
}

