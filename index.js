const axios = require('axios');
const { Telegram } = require('telegraf');
require('dotenv').config();

const telegram = new Telegram(process.env.BOT_TOKEN);
const chatId = '340220499';
const chat2Id = '914347880';
    const checkTimeout = 1000;

telegram.sendMessage(
    chatId,
    `bot is started`
);

const checkCarAvailability = async () => {
    const {data} = await axios.get('https://showroom.hyundai.ru/rest/car');
    return data.length > 24
}

const main = async () => {
    console.log('I am Alive')
    try {
        const isCarAvailable = await checkCarAvailability();
        if(isCarAvailable) {
            telegram.sendMessage(
                chatId,
                `CAR IS HERE!!! go check https://showroom.hyundai.ru/`
            );

            telegram.sendMessage(
                chat2Id,
                `CAR IS HERE!!! go check https://showroom.hyundai.ru/`
            );

            setTimeout(main, 60000)

        } else {
            setTimeout(main, checkTimeout)
        }

    } catch (e) {
        telegram.sendMessage(
            chatId,
            `ERROR in bot! \n ${e.message}`
        );
        setTimeout(main, 5000)
    }
}


main();