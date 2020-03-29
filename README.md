# phinnn-bot

My Telegram Bot called Phinnn.

*Wanna get yourself one too? Follow the guide below.* ⏬

## Prerequisites

- It is recommended to deploy this project where you can give it a public URL with a signed certificate, because Telegram Bot Webhook requires `https` to work.
- Make sure you have installed [Docker](https://docs.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/) on your [virtual] machine.
- Create you own Telegram Bot [here](https://core.telegram.org/bots#6-botfather), you'll get a soulless Bot for now.

## Deploy the Bot's brain

- First, clone the project and install dependencies.

    ```console
    git clone https://github.com/vietduc01100001/phinnn-bot.git
    cd phinnn-bot
    npm install --production
    ```

- Run [Prisma](https://www.prisma.io/docs/) via Docker Compose. Feel free to edit [db/docker-compose.yml](db/docker-compose.yml) to match your need (e.g. data persistence).

    ```console
    npm run prisma
    ```

- Set these environment variables.

    ```
    PORT=<the port to listen on>
    TELEGRAM_BOT_TOKEN=<your Telegram Bot token>
    ```

- Run the Bot.

    ```console
    npm start
    ```

## Tell BotFather your Bot is not brainless!

- Chat with [BotFather](https://t.me/botfather) again to add these commands to your Bot.

    ```
    addmovie - Add a movie to your watchlist
    removemovie - Remove a movie from your watchlist
    showwatchlist - Show your movie watchlist
    startpomodoro - Start a pomodoro
    stoppomodoro - Stop a pomorodo
    ```

- The following commands are on developing.
    ```
    setreminder - Set reminders of your tasks
    addreminder - Add a new reminder
    addpayment - Add a payment this month
    payments - Show payment summary this month
    searchandsend - Google Search this text and send results at specified time
    ```

- Register [Webhook](https://core.telegram.org/bots/api#setwebhook) URL for your Bot by making a POST request to Telegram API.

    ```
    URL: https://api.telegram.org/<your Telegram Bot token>/setWebhook
    Body: {
        "url": "https://<hostname>/updates/<your Telegram Bot token>"
    }
    ```

## Play with your Bot!

You can start being lazier now! 🎉
