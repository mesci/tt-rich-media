# Vercel'e Deployment Rehberi

## Adım 1: GitHub'a Yükle

```bash
git init
git add .
git commit -m "Initial commit: Referral mini app"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Adım 2: Vercel'e Deploy

1. vercel.com adresine git
2. "Add New Project" tıkla
3. GitHub'dan repo'yu import et
4. Framework Preset: Next.js (otomatik seçilecek)
5. Root Directory: ./
6. Build Command: npm run build (otomatik)
7. Output Directory: .next (otomatik)
8. Deploy butonuna tıkla

Vercel deployment URL'nizi alın, örnek:
`https://referral-mini-app.vercel.app`

## Adım 3: Telegram Bot Oluştur

1. Telegram'da @BotFather'ı aç
2. Komutlar:

```
/newbot
Bot ismi: Referral Mini App
Bot username: your_unique_bot_username
```

3. Bot token'ı kopyala ve sakla

## Adım 4: Inline Mode'u Etkinleştir

```
/setinline
Bot seç: @your_bot_username
Placeholder text: Share invitation...
```

```
/setinlinefeedback
Bot seç: @your_bot_username
Seç: Enabled
```

## Adım 5: Mini App Oluştur

```
/newapp
Bot seç: @your_bot_username
Title: Referral Program
Description: Invite friends and earn rewards
Photo: 640x360 boyutunda bir görsel yükle
GIF/Video: 320x320 boyutunda bir animasyon (opsiyonel)
Short name: referral (benzersiz olmalı)
Web App URL: https://referral-mini-app.vercel.app
```

## Adım 6: Bot Backend'i Kurulum

1. Bot sunucusunu çalıştıracağınız bir VPS veya local makine hazırla
2. Bot klasöründe:

```bash
cd bot
npm install
cp env.example .env
```

3. .env dosyasını düzenle:

```
BOT_TOKEN=your_bot_token_from_botfather
WEB_APP_URL=https://referral-mini-app.vercel.app
```

4. Bot'u başlat:

```bash
npm start
```

Bot'u 7/24 çalışır tutmak için PM2 kullanabilirsiniz:

```bash
npm install -g pm2
pm2 start index.js --name referral-bot
pm2 save
pm2 startup
```

## Adım 7: Frontend'i Güncelle

1. `app/components/InviteButton.tsx` dosyasında:
2. `YOUR_BOT_USERNAME` yerine bot username'inizi yazın
3. Değişiklikleri commit edip push edin
4. Vercel otomatik olarak yeniden deploy edecek

## Test

1. Telegram'da botunuzu açın
2. /start yazın
3. "Open Referral App" butonuna tıklayın
4. Mini app açılacak
5. "Invite Friends" butonuna tıklayın
6. Telegram sohbet seçici açılacak
7. Mesaj yazarken bot otomatik inline query başlatacak
8. Zengin içerikli önizleme görünecek
9. Sohbet seçip gönderin

## Alternatif: Bot'u Vercel'de Çalıştırma

Bot'u da Vercel'de serverless function olarak çalıştırabilirsiniz:

1. `api/webhook.js` oluşturun
2. Webhook URL'i Telegram'a kaydedin
3. Environment variables'ı Vercel dashboard'da ekleyin

Ancak polling yerine webhook kullanmanız gerekecek.

