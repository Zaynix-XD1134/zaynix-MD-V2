const { cmd, commands } = require('../command');
const { readEnv } = require('../lib/database');
const config = require('../config');
const os = require('os');
const process = require('process');
const { exec } = require('child_process');
const { runtime } = require('../lib/functions');
const pdfUrl = 'https://files.catbox.moe/liepk0.jpg';  // Make sure this URL is correct

//-----------------------------------------------ALive-----------------------------------------------

cmd({
    pattern: "alive",
    desc: "Check bot online or not.",
    category: "main",
    react: "👀",
    filename: __filename
},
async (conn, mek, m, { from, prefix, pushname, reply }) => {
    try {
        // Fetch the configuration/environment settings
        const config = await readEnv();  // Ensure readEnv returns a promise if needed

        // Determine the host platform
        let hostname = os.hostname();
        if (hostname.length == 12) hostname = 'replit';
        else if (hostname.length == 36) hostname = 'heroku';
        else if (hostname.length == 8) hostname = 'koyeb';

        const snm = [2025];
        const qMessage = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                orderMessage: {
                    itemCount: snm[Math.floor(Math.random() * snm.length)],
                    status: 1,
                    surface: 1,
                    message: ` 𝐙𝐚𝐲𝐧𝐢𝐱 𝐌𝐃 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐁𝐨𝐭 𝐁𝐲 -:\n𝐑𝐎𝐌𝐄𝐊-𝐗𝐃`,
                    orderTitle: "",
                    sellerJid: '919341378016@s.whatsapp.net'
                }
            }
        };


        // Create the text response with system details
        const monspace = '```';
const sssf = `${monspace}
╭───────────────◆
│  👋 Hello, ${pushname}!
│  
│  ✅ Bot is *ACTIVE* now!
│  
│  🔧 Version   : ${require("../package.json").version}
│  💾 Memory    : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
│  ⏱️ Uptime    : ${runtime(process.uptime())}
│  🖥️ Platform  : ${hostname}
│
│  🔢 *Reply Below Number:*
│     1 || View Bot Speed
│     2 || Contact Bot Owner
╰───────────────◆
ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ ✨
${monspace}`;


        // Send the audio message
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/XdTechPro/KHAN-DATA/raw/refs/heads/main/autovoice/menunew.m4a' },
            mimetype: 'audio/mp4',
            ptt: true
        }, {quoted:qMessage});
        
        // Send the document (PDF) message with the caption
        const sentMsg = await conn.sendMessage(from, {
            document: { url: pdfUrl },  // Ensure this URL is correct and accessible
            fileName: '𝘻𝘢𝘺𝘯𝘪𝘹-ᴍᴅ ',  // Filename for the document
            mimetype: "application/pdf",
            fileLength: 99999999999999,  // Replace with the actual size if possible
            caption: sssf,  // Add a caption to the message
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: 'Zaynix-MD',
                    newsletterJid: "120363395450355640@newsletter",
                },
                externalAdReply: {
                    thumbnailUrl: 'https://files.catbox.moe/liepk0.jpg',  // Ensure this image is accessible
                    sourceUrl: 'https://www.youtube.com/@ROMEK-XD9',
                    title: '𝘻𝘢𝘺𝘯𝘪𝘹-ᴍᴅ ',
                    body: 'ᴅᴇᴠᴇʟᴏᴘᴇʀ ʙʏ ʀᴏᴍᴇᴋ-xᴅ',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, {quoted:qMessage});

        // Listen for User Response
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const userMsg = msgUpdate.messages[0];
            if (!userMsg.message || !userMsg.message.extendedTextMessage) return;

            const selectedOption = userMsg.message.extendedTextMessage.text.trim();

            // Validate if the response matches the `.alive` message
            if (
                userMsg.message.extendedTextMessage.contextInfo &&
                userMsg.message.extendedTextMessage.contextInfo.stanzaId === sentMsg.key.id
            ) {
                try {
                    switch (selectedOption) {
                        case '1': {
                            const startTime = Date.now();
                            const message = await conn.sendMessage(from, { text: '```Pinging To index.js!!!```' });
                            const endTime = Date.now();
                            const ping = endTime - startTime;

                            // Send the ping response without buttons
                            await conn.sendMessage(from, { text: `*Pong*\n*${ping}ms*` }, { quoted: qMessage });
                            break;
                        }
                        case '2': {
                            try {
                                const vcard = 'BEGIN:VCARD\n' 
                                    + 'VERSION:3.0\n' // Changed to 3.0 for more modern support
                                    + 'FN:Mr. romekxd\n'
                                    + 'ORG:Mr. romekxd\n'
                                    + 'TEL;type=CELL;type=VOICE;waid=919341378016:+91 93413 78016\n'
                                    + 'EMAIL:romekxd8@gmail.com\n'
                                    + 'END:VCARD';

                                await conn.sendMessage(from, { 
                                    contacts: { 
                                        displayName: 'Mr. romekxd', 
                                        contacts: [{ vcard }] 
                                    }
                                }, { quoted: qMessage });

                                break;

                            } catch (e) {
                                console.error(e);
                                await conn.sendMessage(from, { text: "*❌ Error processing your request.*" }, { quoted: userMsg });
                            }
                            break;
                        }
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        });
    } catch (err) {
        console.error(err);
        await reply('An error occurred.');
    }
});

//----------------------------------------Restart--------------------------------------

cmd({
    pattern: "restart",
    react: "♻",
    desc: "restart the bot",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Ensure that only the owner can use this command
        if (!isOwner) return reply("This command is restricted to the bot owner.");

        // Create a custom message that will be used for the quoted message
        const snm = [2025];
        const qMessage = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                orderMessage: {
                    itemCount: snm[Math.floor(Math.random() * snm.length)],
                    status: 1,
                    surface: 1,
                    message: `𝐙𝐚𝐲𝐧𝐢𝐱 𝐌𝐃 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐁𝐨𝐭 𝐁𝐲 -:\n𝐑𝐎𝐌𝐄𝐊-𝐗𝐃`,
                    orderTitle: "",
                    sellerJid: '919341378016@s.whatsapp.net'
                }
            }
        };

        // Define a sleep function using promises
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        // Send the restarting message
        await conn.sendMessage(from, { text: `*Restarted now*` }, { quoted: qMessage });

        // Sleep for 1500ms (1.5 seconds) before restarting the bot
        await sleep(1500);

        // Execute the restart command
        const { exec } = require("child_process");
        exec("pm2 restart all", (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reply(`Error restarting the bot: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
        
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

//-----------------------------------------------Owner-----------------------------------------------

cmd({
    pattern: "owner",
    react: "👑", // Reaction emoji when the command is triggered
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    try {
        // Array of item counts to randomly select from
        const snm = [2025];
        
        // The quoted message template
        const qMessage = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                orderMessage: {
                    itemCount: snm[Math.floor(Math.random() * snm.length)], // Random selection
                    status: 1,
                    surface: 1,
                    message: `𝐙𝐚𝐲𝐧𝐢𝐱 𝐌𝐃 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐁𝐨𝐭 𝐁𝐲 -:\n𝐑𝐎𝐌𝐄𝐊-𝐗𝐃`,
                    orderTitle: "",
                    sellerJid: '919341378016@s.whatsapp.net'
                }
            }
        };

        // Owner's contact info in vCard format
        const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' // Use version 3.0 for better compatibility
            + 'FN:Mr. romekxd\n'
            + 'ORG:Mr. romekxd\n'
            + 'TEL;type=CELL;type=VOICE;waid=919341378016:+91 93413 78016\n'
            + 'EMAIL:romekxd8@gmail.com\n'
            + 'END:VCARD';

        // Sending the contact info as a WhatsApp message
        await conn.sendMessage(from, { 
            contacts: { 
                displayName: 'Mr. romekxd', 
                contacts: [{ vcard }] 
            }
        }, { quoted: qMessage });

    } catch (error) {
        console.error('Error occurred while fetching the owner contact:', error);
        
        // If there's an error, send a user-friendly error message
        await conn.sendMessage(from, { text: 'Sorry, there was an error fetching the owner contact.' }, { quoted: mek });
    }
});


//-----------------------------------------------Pong-----------------------------------------------

cmd({
    pattern: "ping",
    desc: "Check bot's response time.",
    category: "main",
    react: "🪄",
    filename: __filename
}, async (conn, mek, m, { from, quoted, reply }) => {
    try {
        const snm = [2025]; // Random number array, only one item here
        const qMessage = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                orderMessage: {
                    itemCount: snm[Math.floor(Math.random() * snm.length)],
                    status: 1,
                    surface: 1,
                    message: `𝐙𝐚𝐲𝐧𝐢𝐱 𝐌𝐃 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐁𝐨𝐭 𝐁𝐲 -:\n𝐑𝐎𝐌𝐄𝐊-𝐗𝐃`,
                    orderTitle: "",
                    sellerJid: '919341378016@s.whatsapp.net'
                }
            }
        };

        const startTime = Date.now();
        const message = await conn.sendMessage(from, { text: '```Pinging To index.js!!!```' });
        const endTime = Date.now();
        const ping = endTime - startTime;

        // Send the ping response without buttons
        await conn.sendMessage(from, { text: `*Pong*\n*${ping}ms*` }, { quoted: qMessage });
    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});


//-----------------------------------------------System-----------------------------------------------

cmd({
    pattern: "system",
    alias: ["os"],
    desc: "check up time",
    category: "main",
    react: "👀",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const snm = [2025]; // Random number array, only one item here

        // Ensure qMessage has a valid structure if `quoted` exists
        let qMessage = null;
        if (quoted) {
            qMessage = {
                key: {
                    fromMe: false,
                    participant: "0@s.whatsapp.net",
                    remoteJid: "status@broadcast"
                },
                message: {
                    orderMessage: {
                        itemCount: snm[Math.floor(Math.random() * snm.length)],
                        status: 1,
                        surface: 1,
                        message: `𝐙𝐚𝐲𝐧𝐢𝐱 𝐌𝐃 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐁𝐨𝐭 𝐁𝐲 -:\n𝐑𝐎𝐌𝐄𝐊-𝐗𝐃`,
                        orderTitle: "",
                        sellerJid: '919341378016@s.whatsapp.net'
                    }
                }
            };
        }

        let hostname = os.hostname();
        if (hostname.length === 12) hostname = 'replit';
        else if (hostname.length === 36) hostname = 'heroku';
        else if (hostname.length === 8) hostname = 'koyeb';

        // Function to convert seconds to human-readable format
        const runtime = (seconds) => {
            const pad = (s) => s < 10 ? `0${s}` : s;
            const hours = Math.floor(seconds / (60 * 60));
            const minutes = Math.floor((seconds % (60 * 60)) / 60);
            const sec = Math.floor(seconds % 60);
            return `${pad(hours)}:${pad(minutes)}:${pad(sec)}`;
        };

        let status = `
*╭────────────────────*
*│🚀Version :* ${require("../package.json").version}  
*│⌛Ram usage :* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
*│🕒Runtime :*  ${runtime(process.uptime())}
*│📍Platform :* ${hostname}
*│👨‍💻Owner :* ʀᴏᴍᴇᴋ-xᴅ
*╰────────────────────*`;

        // Ensure proper `sendMessage` with quoted message, fallback to qMessage if none
        const messageToSend = { text: `${status}` };
        const options = quoted ? { quoted: quoted } : { quoted: qMessage };

        await conn.sendMessage(from, messageToSend, options);
    } catch (e) {
        console.log(e);
        reply(`${e.message || e}`);
    }
});


//-----------------------------------------------Repo-----------------------------------------------

cmd({
    pattern: "repo",
    alias: ["sc","script"],
    desc: "Check Bot Sc",
    category: "main",
    react: "🌟",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Create a status message to be sent
        const monspace = '```';
        const desc = `🪄⃝ 𝘻𝘢𝘺𝘯𝘪𝘹-ᴍᴅ  🩷⃟🪄
${monspace}
💡 Features include:
• Downloading media & statuses  
• Managing groups smartly  
• Creating logos & editing images  
• AI-powered tools  
• Instant info search and much more...
${monspace}

${monspace}
⚠️ DISCLAIMER:
We are *not responsible* for any ban or damage to your WhatsApp account.  
Use the bot at your own risk.
${monspace}

${monspace}
🪄 Want your own bot?
Check out our deployment guides below:
${monspace}

👑 *Owner:* ROMEK-XD  
🌐 *GitHub:* https://github.com/ROMEKTRICKS  
▶️ *YouTube:* https://www.youtube.com/@ROMEK-XD9  
📢 *WhatsApp Channel:* https://whatsapp.com/channel/0029Vb0Tq5eKbYMSSePQtI34

*👨‍💻 Z𝘢𝘺𝘯𝘪𝘹-ᴍᴅ || ᴄʀᴇᴀᴛᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ🎊*`;


        // Sending the message with an image (thumbnail)
        const sentMsg = await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/liepk0.jpg' },  // Sending an image (URL)
            caption: desc,  // Send the description as the caption
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: 'Zaynix-MD',
                    newsletterJid: "120363395450355640@newsletter",
                },
                externalAdReply: {
                    title: '𝘻𝘢𝘺𝘯𝘪𝘹-ᴍᴅ ',
                    body: 'ᴅᴇᴠᴇʟᴏᴘᴇʀ ʙʏ ʀᴏᴍᴇᴋ-xᴅ',
                    mediaType: 1,
                    sourceUrl: "https://www.youtube.com/@ROMEK-XD9",
                    thumbnailUrl: 'https://files.catbox.moe/liepk0.jpg', // Corrected thumbnail URL
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`*Error:* ${e.message}`);
    }
});
