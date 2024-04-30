import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';


// BotToken
const token = process.env.BOT_TOKEN;

// Bot instance
const bot = new TelegramBot(token, { polling: true });

//python endpoint
const apiUrlBase = process.env.API_URL_BASE || 'http://127.0.0.1:8000';
const apiUrl = `${apiUrlBase}/api/v1/message`;


bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '¡Hola! Soy un bot de ejemplo. ¿Cómo puedo ayudarte?');
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    try {
        const response = await axios.post(apiUrl, {
            chatId: chatId,
            messageText: messageText
        });
        if (response.data.message && response.data.message.category) {
            const category = response.data.message.category;
            // Construye el mensaje con el emoji de tick y envía al chat del usuario
            const replyMessage = `${category} expense added ✅`;
            bot.sendMessage(chatId, replyMessage);
        }

    } catch (error) {
        console.error('Error al enviar el mensaje a la API:', error);
    }
    
});

const port = process.env.PORT || 3000;
