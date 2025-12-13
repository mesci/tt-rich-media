# Quick Start Guide

## Önizleme için Local Development

```bash
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini açın.

## Projeyi Anlamak

### Özellikler

1. **Modern Tasarım**: Vercel tarzı mono, siyah-beyaz tasarım
2. **Zengin Paylaşım**: Inline bot ile görsel, metin ve butonlu paylaşım
3. **Telegram Entegrasyonu**: Mini App SDK ile tam entegrasyon
4. **Responsive**: Mobil öncelikli tasarım

### Dosya Yapısı

```
referral_mini_app/
├── app/
│   ├── components/
│   │   └── InviteButton.tsx      # Davet butonu component
│   ├── layout.tsx                # Ana layout, Telegram SDK
│   ├── page.tsx                  # Ana sayfa
│   └── globals.css               # Global stiller
├── bot/
│   ├── index.js                  # Telegram bot (inline query handler)
│   ├── package.json              # Bot dependencies
│   └── env.example               # Environment variables template
├── public/
│   └── telegram-web-app.js       # Telegram SDK fallback
├── package.json                  # Frontend dependencies
├── tailwind.config.ts            # Tailwind yapılandırma
└── README.md                     # Genel bilgi
```

### Nasıl Çalışıyor?

1. Kullanıcı mini-app'i açar
2. "Invite Friends" butonuna tıklar
3. `switchInlineQuery()` fonksiyonu çağrılır
4. Telegram inline query başlatır
5. Bot backend inline query'yi yakalar
6. Zengin içerik (resim + metin + buton) döndürür
7. Telegram önizleme modalı gösterir
8. Kullanıcı paylaşır

## Deployment

### 1. Frontend (Vercel)

```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

Vercel'de import et ve deploy et.

### 2. Bot Backend

Bir sunucuda:

```bash
cd bot
npm install
cp env.example .env
# .env dosyasını düzenle
npm start
```

### 3. Telegram Bot Setup

```
/newbot - Bot oluştur
/setinline - Inline mode aç
/newapp - Mini app oluştur
```

Detaylı adımlar için `DEPLOYMENT_GUIDE.md` dosyasına bakın.

## Sıkça Sorulan Sorular

### Q: Zengin paylaşım nasıl çalışıyor?

A: Telegram Inline Bot teknolojisi kullanılıyor. Bot, inline query'lere yanıt olarak zengin içerik döndürüyor.

### Q: Neden normal share API kullanmıyoruz?

A: Normal share API sadece metin paylaşımına izin veriyor. Buton, görsel ve önizleme için inline bot gerekli.

### Q: Bot'u nerede host edebilirim?

A: Herhangi bir VPS, Railway, Heroku, veya local bilgisayarınızda çalıştırabilirsiniz.

### Q: Inline mode ne işe yarıyor?

A: Inline mode, botların herhangi bir sohbette @ ile çağrılmasını ve zengin içerik paylaşılmasını sağlıyor.

## Özelleştirme

### Renkleri Değiştirmek

`app/globals.css` dosyasında:

```css
:root {
  --foreground: #000;
  --background: #fff;
}
```

### Bot Mesajlarını Değiştirmek

`bot/index.js` dosyasında:

```javascript
caption: 'Your custom message here'
```

### Görselleri Değiştirmek

`bot/index.js` dosyasında image URL'lerini değiştirin.

## Destek

Detaylı rehberler:
- `HOW_IT_WORKS.md` - Teknik açıklama
- `INLINE_BOT_GUIDE.md` - Inline bot detayları
- `DEPLOYMENT_GUIDE.md` - Deploy adımları

## Lisans

MIT

