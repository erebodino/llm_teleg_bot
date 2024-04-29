const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const axios = require('axios');

// const app = express();

// Configura el token del bot de Telegram
const token = '6891603134:AAFQ5WJcqZMsBMNkt-loqA1v5f2FYyWwOio'; // Reemplaza 'TU_TOKEN' con el token de tu bot

// Crea una instancia del bot
const bot = new TelegramBot(token, { polling: true });

// Ruta de inicio para verificar que el servidor está en funcionamiento
// app.get('/', (req, res) => {
//     res.send('El microservicio está en funcionamiento');
// });

// URL de la API
const apiUrl = 'http://127.0.0.1:8000/api/v1/message';

// Manejador de comandos
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '¡Hola! Soy un bot de ejemplo. ¿Cómo puedo ayudarte?');
});

// Manejador de mensajes
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    try {
        // Envía el mensaje a la API
        const response = await axios.post(apiUrl, {
            // chatId: chatId,
            chatId: "1423978433",
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

// Inicia el servidor
const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Servidor escuchando en el puerto ${port}`);
// });