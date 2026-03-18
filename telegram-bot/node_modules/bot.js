const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot is running');
});

app.listen(3000, () => console.log('Server running'));

const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

// Replace with your Telegram bot token
const TOKEN = process.env.BOT_TOKEN;

// Create bot using polling
const bot = new TelegramBot(TOKEN, { polling: true });

// Logging function
function logMessage(msg) {
  const log = `[${new Date().toISOString()}] ${msg.from.username || msg.from.first_name}: ${msg.text}\n`;
  fs.appendFileSync('messages.log', log);
}

// /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Hello ${msg.from.username || msg.from.first_name}! 👋\nI am Roselyn's Telegram bot.\nType anything and I'll echo it!`);
});

// /help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Commands available:\n/start - Welcome message\n/help - Show this help\n/buttons - Show inline buttons`);
});
bot.onText(/\/buttons/, (msg) => {
  bot.sendMessage(msg.chat.id, "Choose an option:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Option 1", callback_data: "1" }],
        [{ text: "Option 2", callback_data: "2" }]
      ]
    }
  });
});

bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  bot.sendMessage(message.chat.id, `You clicked option ${callbackQuery.data}`);
});

// /buttons command with inline keyboard
bot.onText(/\/buttons/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Choose an option:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Option 1", callback_data: "1" }],
        [{ text: "Option 2", callback_data: "2" }],
        [{ text: "Option 3", callback_data: "3" }]
      ]
    }
  });
});
bot.onText(/\/buttons/, (msg) => {
  bot.sendMessage(msg.chat.id, "Choose an option:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Option 1", callback_data: "1" }],
        [{ text: "Option 2", callback_data: "2" }]
      ]
    }
  });
});

bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  bot.sendMessage(message.chat.id, `You clicked option ${callbackQuery.data}`);
});

// Handle button clicks
bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  bot.sendMessage(message.chat.id, `You clicked option ${callbackQuery.data}`);
});

// Echo all other messages
bot.on('message', (msg) => {
  // Skip commands (they are already handled)
  if (msg.text.startsWith('/')) return;

  const chatId = msg.chat.id;
  logMessage(msg); // Log the message
  bot.sendMessage(chatId, `You said: "${msg.text}"`);
});

console.log("Bot is running...");