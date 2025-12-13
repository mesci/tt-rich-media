const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

if (!token || !webAppUrl) {
  console.error('Error: BOT_TOKEN and WEB_APP_URL must be set in .env file');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || '';

  if (text.startsWith('/start')) {
    const keyboard = {
      inline_keyboard: [
        [
          {
            text: 'Open Referral App',
            web_app: { url: webAppUrl }
          }
        ]
      ]
    };

    await bot.sendMessage(
      chatId,
      'Welcome to the Referral Program!\n\nInvite your friends and earn rewards together.\n\nClick below to open the app.',
      { reply_markup: keyboard }
    );
  }
});

bot.on('inline_query', async (query) => {
  const userId = query.from.id;
  const referralCode = query.query || `ref_${userId}`;
  const referralLink = `${webAppUrl}?ref=${referralCode}`;
  
  const imageUrl = `${webAppUrl}/referra_image.png`;
  const thumbUrl = `${webAppUrl}/referra_image.png`;
  
  const results = [
    {
      type: 'photo',
      id: '1',
      photo_url: imageUrl,
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

  try {
    await bot.answerInlineQuery(query.id, results, {
      cache_time: 300,
      is_personal: true
    });
  } catch (error) {
    console.error('Error answering inline query:', error);
  }
});

bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

console.log('Bot is running...');
console.log('Web App URL:', webAppUrl);

