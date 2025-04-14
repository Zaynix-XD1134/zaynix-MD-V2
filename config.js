const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || 'Yb1ETaTJ#ZOT2FUvm4tQ73dtJMnFkD0Q9U5rt6mNDO-sx0NNWVGc', // Enter Your Session ID
    MONGODB: process.env.MONGODB || 'mongodb://mongo:pyABVHyEsUQmYiSXFquHuEiNvDQitgXH@switchyard.proxy.rlwy.net:20784',    // Enter Your MongoDB URL
    SUDO_NB: process.env.SUDO_NB || "919341378016", // 𝐀𝐃𝐃 𝐘𝐎𝐔𝐑 𝐍𝐔𝐌𝐁𝐄𝐑 𝐖𝐈𝐓𝐇 𝐂𝐎𝐔𝐍𝐓𝐑𝐘 𝐂𝐎𝐃𝐄

AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true", //  𝐓𝐑𝐔𝐄 𝐎𝐑 𝐅𝐀𝐋𝐒𝐄
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || "true", 
    //TRUE OR FALSE
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
