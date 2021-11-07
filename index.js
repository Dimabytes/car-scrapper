const axios = require('axios');
const { Telegram } = require('telegraf');
require('dotenv').config();

const telegram = new Telegram(process.env.BOT_TOKEN);
const chatId = '340220499';
const checkTimeout = 3000;

telegram.sendMessage(
    chatId,
    `bot is started`
);

const checkCarAvailability = async () => {
    const {data} = await axios.get('https://showroom.hyundai.ru/rest/configurator/37/car-showroom');
    return data.startDiscountAvailable || data.gpDiscountAvailable;
}

const main = async () => {
    telegram.sendMessage(
        chatId,
        `check!`
    );
    try {
        const isCarAvailable = await checkCarAvailability();
        if(isCarAvailable) {
            telegram.sendMessage(
                chatId,
                `CAR IS HERE!!! go check https://showroom.hyundai.ru/`
            );
            setTimeout(main, checkTimeout)

        }
        setTimeout(main, checkTimeout)

    } catch (e) {
        telegram.sendMessage(
            chatId,
            `ERROR in bot! \n ${e.message}`
        );
        setTimeout(main, checkTimeout)
    }
}


main();