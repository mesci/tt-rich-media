const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).json({ ok: true });
  }

  try {
    const bot = new TelegramBot(token);
    const { message, inline_query } = req.body;

    if (message) {
      const chatId = message.chat.id;
      const text = message.text || '';

      if (text.startsWith('/start')) {
        const keyboard = {
          inline_keyboard: [
            [
              {
                text: 'Open TapTopia',
                web_app: { url: webAppUrl }
              }
            ]
          ]
        };

        await bot.sendMessage(
          chatId,
          'Welcome to TapTopia!\n\nInvite your friends and earn rewards together.\n\nClick below to open the app.',
          { reply_markup: keyboard }
        );
      }
    }

    if (inline_query) {
      const userId = inline_query.from.id;
      const referralCode = inline_query.query || `ref_${userId}`;
      const referralLink = `${webAppUrl}?ref=${referralCode}`;
      
      const imageUrl = `${webAppUrl}/referra_image.png`;
      const thumbUrl = `${webAppUrl}/referra_image.png`;
      
      const results = [
        {
          type: 'photo',
          id: '1',
          photo_url: imageUrl,
          photo_width: 1200,
          photo_height: 630,
          thumb_url: thumbUrl,
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
        }
      ];

      await bot.answerInlineQuery(inline_query.id, results, {
        cache_time: 0,
        is_personal: true
      });
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(200).json({ ok: true });
  }
}

