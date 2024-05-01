import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';


// BotToken
const token = process.env.BOT_TOKEN;

// Bot instance
const bot = new TelegramBot(token, { polling: true });

//fast_bot endpoint
const apiUrlBase = process.env.API_URL_BASE || 'http://127.0.0.1:8000';
const apiMessageUrl = `${apiUrlBase}/message/`;
const apiRegisterUrl = `${apiUrlBase}/register_user/`;

const commands = [
    { command: '/start', description: 'Show requeriments to start using the bot.' },
    { command: '/register_me', description: 'Register yourself.' },
    { command: '/help', description: 'Get help information.' }
];

// Set the commands
bot.setMyCommands(commands).then(() => {
    console.log('Bot commands successfully set');
}).catch((error) => {
    console.error('Error setting bot commands:', error);
});

bot.onText(/\/start/,(msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Hi, I'm a bot to register expenses, register yourself and then send me a message with a expense and I will analize it.");
});

bot.onText(/\/help/,(msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "2 commands available: /start and /register_me, check the description for each.");
});


bot.onText(/\/register_me/, async(msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'I will register you, please wait a moment.');
    try {
        const response = await axios.post(apiRegisterUrl, {
            telegram_id: chatId.toString(),
        });

        if (response.data.message) {
            const message = response.data.message;
            bot.sendMessage(chatId, message);
        }
    } catch (error) {
        console.error('Error al enviar el mensaje a la API:', error);
    }

});

bot.on('message', async (msg) => {

    const chatId = msg.chat.id;
    const messageText = msg.text;
    
    if (messageText.startsWith('/')) {
        return;
    }

    try {
        const response = await axios.post(apiMessageUrl, {
            chatId: chatId,
            messageText: messageText
        });
        if (response.data.message && response.data.message.category) {
            const category = response.data.message.category;
            // Construye el mensaje con el emoji de tick y envía al chat del usuario
            const replyMessage = `${category} expense added ✅`;
            bot.sendMessage(chatId, replyMessage);
        }
        if (response.data.message && response.data.message.error_msg) {
            const replyMessage = response.data.message.error_msg;
            bot.sendMessage(chatId, replyMessage);
        }

    } catch (error) {
        console.error('Error al enviar el mensaje a la API:', error);
    }
    
});

const port = process.env.PORT || 3000;
