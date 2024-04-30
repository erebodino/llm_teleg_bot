
# LLMTelegBot

Built using Node.js, this service acts as the interface between the
Telegram API and the Bot Service. It manages the reception of inbound messages from
users, forwards these messages to the Bot Service for processing, and sends the
appropriate responses back to the users via Telegram.

## Install

### Clone the repository

```bash
git clone https://github.com/erebodino/llm_teleg_bot.git
```

### Install dependencies:

```bash
npm install
```

### Set enviroment variables

This variables will manage the base url to send the request and the telegram API TOKEN

**Telegram TOKEN**
```bash
    export BOT_TOKEN="<your_telegram_token>
```
**URL base**

by default this is localhost in the code.
```bash
    export API_URL_BASE="<your_url_base>"
```
### Run service
```bash
    cd llm_teleg_bot
    node llm_teleg_bot.js
```




