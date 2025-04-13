const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || '2NEQBJgR#wAhZrO3Foaybk8_dqHAUQmJHcPWpUTCcTNNpY4HP-hE', // Enter Your Session ID
    MONGODB: process.env.MONGODB || 'mongodb://mongo:pyABVHyEsUQmYiSXFquHuEiNvDQitgXH@switchyard.proxy.rlwy.net:20784',    // Enter Your MongoDB URL
    MODE: process.env.MODE || "public", // 𝗽𝗿𝗶𝘃𝗮𝘁𝗲 𝗼𝗿 𝗽𝘂𝗯𝗹𝗶𝗰 𝗮𝘀 𝗬𝗼𝘂 𝗟𝗶𝗸𝗲 
BOT_NAME: process.env.BOT_NAME || "Zaynixmd",
// add bot namw here for menu
DELETE_LINKS: process.env.DELETE_LINKS || "false",
// automatic delete links witho remove member 
OWNER_NUMBER: process.env.OWNER_NUMBER || "919341378016",
// add your bot owner number
OWNER_NAME: process.env.OWNER_NAME || "ROMEK-XD",
DESCRIPTION: process.env.DESCRIPTION || "*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ-ᴠ2*",
};
