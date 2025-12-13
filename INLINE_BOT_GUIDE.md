# Telegram Inline Bot ile Zengin Paylaşım Nasıl Yapılır?

## Sihir Inline Bot'ta!

Gördüğünüz o güzel paylaşım özelliği **Telegram Inline Bot** teknolojisiyle çalışıyor. Normal kullanıcılar buton gönderemez ama botlar gönderebilir!

## Nasıl Çalışıyor?

1. Kullanıcı "Invite Friends" butonuna tıklar
2. `switchInlineQuery()` fonksiyonu çağrılır
3. Telegram otomatik olarak sohbet seçici açar
4. Kullanıcı mesaj yazarken botun adı + query otomatik olarak yazılır
5. Bot, inline query'yi yakalayıp zengin içerik döndürür
6. Kullanıcı önizlemeyi görür: resim + metin + buton
7. "Share with..." butonu ile gönderir

## Örnek Akış

```
User: Invite Friends butonuna tıklar
  ↓
App: tg.switchInlineQuery("ref_12345")
  ↓
Telegram: @yourbot ref_12345 şeklinde inline query başlatır
  ↓
Bot Backend: Inline query'yi yakalar
  ↓
Bot: Zengin içerik döndürür (InlineQueryResult)
  - type: "article" veya "photo"
  - title: "Invite Friends"
  - description: "Share this app..."
  - thumb_url: resim URL'si
  - input_message_content: gönderilecek mesaj
  - reply_markup: butonlar
  ↓
Telegram: Önizleme modalı gösterir
  ↓
User: Sohbet seçer ve gönderir
```

## Bot Kodu Önemli Kısımlar

```javascript
bot.on('inline_query', async (query) => {
  const userId = query.from.id;
  const referralLink = `${webAppUrl}?ref=${userId}`;
  
  const results = [
    {
      type: 'photo',
      id: '1',
      photo_url: 'https://your-image.com/invite.png',
      thumb_url: 'https://your-image.com/thumb.png',
      caption: 'Join me on this amazing app!',
      reply_markup: {
        inline_keyboard: [[
          { text: 'Join Now', url: referralLink }
        ]]
      }
    }
  ];

  await bot.answerInlineQuery(query.id, results);
});
```

## Avantajlar

- Görsel içerik paylaşımı
- Butonlarla direkt aksiyon
- Profesyonel görünüm
- Önizleme modalı
- Daha yüksek engagement

## Bot Kurulum Adımları

1. BotFather'da bot oluştur
2. `/setinline` komutu ile inline mode'u aç
3. `/setinlinefeedback` ile geri bildirimi aç
4. `/setinlineplaceholder` ile placeholder metni ayarla
5. Bot backend'ini çalıştır
6. Mini app'te `switchInlineQuery()` kullan

## Test

1. Botunuzu herhangi bir sohbette @ ile etiketleyin
2. Referans kodu yazın
3. Zengin içeriğin geldiğini görün
4. Bu tam olarak mini-app'ten çağrıldığında olacak şey!

