# Complete Setup Guide

## Part 1: Deploy Mini App to Vercel

1. Push this code to GitHub
2. Go to vercel.com and import your repository
3. Deploy (no environment variables needed for frontend)
4. Copy your deployment URL

## Part 2: Create Telegram Bot

1. Open Telegram and find @BotFather
2. Send /newbot
3. Choose a name and username
4. Copy the bot token
5. Send /setinline to @BotFather
6. Select your bot
7. Enter a placeholder text like "Share invitation..."
8. Send /setinlinefeedback to @BotFather
9. Select your bot and choose "Enabled"

## Part 3: Set Up Mini App

1. Send /newapp to @BotFather
2. Select your bot
3. Enter app title
4. Enter description
5. Upload a 640x360 photo
6. Upload a 320x320 GIF/video
7. Enter your Vercel URL
8. Choose short name
9. Upload app icon (512x512)

## Part 4: Configure Bot Backend

1. Go to bot/ directory
2. Copy .env.example to .env
3. Add your BOT_TOKEN
4. Add your Vercel URL as WEB_APP_URL
5. Run: npm install
6. Run: npm start

## Part 5: Update Frontend

1. In app/page.tsx, replace YOUR_BOT_USERNAME with your bot username
2. Redeploy to Vercel

## How to Use

1. Open your bot in Telegram
2. Click "Open App" or send /start
3. In the mini app, click "Invite Friends"
4. The Telegram share modal will open with rich preview
5. Select contacts to share with

## Rich Sharing Method

The magic happens through Telegram inline bots. When you use switchInlineQuery, Telegram shows a rich preview with images, buttons, and formatted text before sending.

