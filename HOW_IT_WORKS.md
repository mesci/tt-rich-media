# Zengin Paylaşım Nasıl Çalışıyor?

## Problem

Normal Telegram kullanıcıları mesajlarına buton ekleyemez. Sadece botlar bunu yapabilir.

## Çözüm: Inline Bot

Gördüğünüz o modern paylaşım özelliği **Telegram Inline Bot** teknolojisi kullanıyor.

## Akış

### 1. Mini App Tarafı

```javascript
tg.switchInlineQuery(referralCode, ['users', 'groups', 'channels'])
```

Bu kod şunu yapar:
- Telegram'ın sohbet seçiciyi açar
- Otomatik olarak inline query başlatır
- Mesaj yazma alanına "@botusername referralCode" yazar

### 2. Bot Tarafı

```javascript
bot.on('inline_query', async (query) => {
  const results = [
    {
      type: 'photo',
      photo_url: 'image.jpg',
      caption: 'Join me!',
      reply_markup: {
        inline_keyboard: [[
          { text: 'Join Now', url: 'https://app.com' }
        ]]
      }
    }
  ];
  
  await bot.answerInlineQuery(query.id, results);
});
```

Bot inline query'yi yakalar ve zengin içerik döndürür.

### 3. Telegram Tarafı

Telegram bu yanıtı alır ve:
- Güzel bir önizleme modalı gösterir
- Resim, metin ve butonları gösterir
- "Share with..." butonu ekler
- Kullanıcı sohbet seçer ve gönderir

## Sonuç

Bu sayede normal bir kullanıcı, botun gücünü kullanarak, zengin içerikli mesajlar paylaşabilir.

## Önemli Notlar

- Inline mode mutlaka aktif olmalı (/setinline)
- Bot 7/24 çalışır olmalı
- Her inline query anında yanıtlanmalı
- Görseller public URL'de olmalı
- Butonlar inline_keyboard formatında olmalı

## Alternatif Yöntemler

### 1. Share URL (Basit)

```javascript
tg.openTelegramLink(`https://t.me/share/url?url=...`)
```

Dezavantajları:
- Sadece metin
- Buton yok
- Görsel yok
- Önizleme yok

### 2. Direct Bot Link

```javascript
tg.openTelegramLink(`https://t.me/botusername?start=ref`)
```

Dezavantajları:
- Bot'u açar, paylaşım yapmaz
- Kullanıcı manuel olarak paylaşmalı

### 3. Inline Bot (Önerilen)

En güçlü ve profesyonel yöntem.

## Örnek Kullanım Senaryoları

1. Referral programları
2. Event davetiyeleri
3. Ürün paylaşımları
4. Kampanya duyuruları
5. Grup davetiyeleri

Hepsi zengin içerik, görsel ve butonlarla paylaşılabilir.

