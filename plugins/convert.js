const config = require('../config');
const {cmd , commands} = require('../command');
const axios = require('axios')
const { screenshotV3 } = require('getscreenshot.js')
const crypto = require('crypto');
const cheerio = require('cheerio')
const { exec } = require('child_process');
let { img2url } = require('@blackamda/telegram-image-url');
const fs = require('fs');



cmd({

    pattern: "barcode",
    alias: ["bcode"],
 use: ".barcode <text>",
    desc: "Generate barcodes.",
    react: "🎲",
    category: "convert",

    filename: __filename

},

async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {

try {

await m.react("🎲")

if(!q) return reply("*Give me a text to generate barcode.*")

let load = `*You BarCode is Generating...🎲*`

await conn.sendMessage(from,{text:load},{quoted:mek});

const barcode = `https://barcode.orcascan.com/?type=code128&data=${q}&text=${q}&format=png`

let desc = `*✅ This is You BarCode.🎲*\n\n\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ*`

await conn.sendMessage(from,{image:{url:barcode},caption:desc});

await m.react("✅")

  

}catch(e){

console.log(e)

reply(`${e}`)

}

})


//====================================



cmd({
    pattern: "qrcode",
    alias: ["qcode"],
    react: "🎲",
     use: ".qrcode <text>",
    desc: "Generate qr code.",
    category: "convert",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
try {

await m.react("🎲")
if(!q) return reply("*Give me a text to generate qr code.*")
let load = `*Generating your QR Code...🎲*`
await conn.sendMessage(from,{text:load},{quoted:mek});

const qrcode = `https://barcode.orcascan.com/?data=${q}&text=${q}&format=png`
let desc = `*✅ This is you QR Code 🎲*\n\n\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ*`
await conn.sendMessage(from,{image:{url:qrcode},caption:desc});
await m.react("✅")
  
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({

    pattern: "bysexdl",
    
    alias: ["dlbysex","bysexdown"],

    desc: "Download adult videos from bysex.net.",
 use: ".bysexdl <text>",
    category: "nsfw",

    filename: __filename

},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{

    

await m.react("🔞")

    const surl = `http://en.bysex.net/search?text=${q}`

    const scrape = await fetch(surl)

    const $ = cheerio.load(await scrape.text())

    const s2url = $("body > div.container > div.list > div > div:nth-child(1) > div > a").attr('href')

    const scrape2 = await fetch(s2url)

    const $$ = cheerio.load(await scrape2.text())

    const dlurl = $$("body > div.container > ul > li:nth-child(2) > a").attr('href')

    

await conn.sendMessage(from, {video: {url: dlurl},mimetype: "video/mp4",caption: '> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ*'},{quoted: mek})

    

}catch(e){

console.log(e)

reply(`${e}`)

}

})

cmd({

    pattern: "pussybdl",
    
    alias: ["dlpussyb","pussybdown","hentaivid"],

    desc: "Download adult videos from pussyboy.net.",
 use: ".pussybdl <text>",
    category: "nsfw",

    filename: __filename

},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{

    

await m.react("🔞")

const surl = `https://www.pussyboy.net/porn/${q}/`

const scrape = await fetch(surl)

const $ = cheerio.load(await scrape.text())

const dlurl = $("body > div.container-xxl.videos > div.col-md-12.videos-detail > div.col-md-12.videos-details > div > video > source").attr('src')

await conn.sendMessage(from, {video: {url: dlurl},mimetype: "video/mp4",caption: '> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ*'},{quoted: mek})

    

}catch(e){

console.log(e)

reply(`${e}`)

}

})

//===========================   

cmd({
    pattern: "screenshot1",
    alias: ["ss2"],
    react: "📸",
     use: ".ss <link>",
    desc: "Get screenshots",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if (!args[0]) return reply('*Please Give Me a Url to Get Screenshot.📸*');

let data = await screenshotV3(q)

await conn.sendMessage(from, {image: {url : data }, caption : `> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ*`}, {quoted : mek})

await m.react("✅")
}catch(e){
console.log(e)
reply(`${e}`)
}
})




cmd({ 
    pattern: "endgroup", 
    desc: "End group", 
     use: ".endgoup",
    react: "‼️",
    category: "group", 
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        
        if (!isOwner) return reply("*This is an Owner Cmd.‼️*")
        if(!isBotAdmins) return reply("*Please Give Bot Admin.‼️*")

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let msg = `*💀 Zaynix-MD GROUP END METHOD 💀*

*☠️Are You Sure, You Want to End This Group :*

*_Yes Zaynix-MD_*
*_No Zaynix-MD_*


> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ*`

let send = await conn.sendMessage(from, {text : msg },{quoted:mek} )
        
conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();
    
            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === send.key.id) {
                switch (selectedOption) {
                        case 'no':
if (!isOwner) return
return reply("*:)*")

                        break;
                        case 'No':
if (!isOwner) return
return reply("*:)*")

                        break;
                        case 'yes':
if (!isOwner) return
    await conn.sendMessage(from, {text: `*3*`})
        await delay(2000)
    await conn.sendMessage(from, {text: `*2*`})
        await delay(2000)
    await conn.sendMessage(from, {text: `*1*`})
        await delay(2000)
    await conn.sendMessage(from, {text: `*Bye All Members 😪👋*`})
        await delay(2000)
    await conn.sendMessage(from, {text: `*_Members remove started._*`})
        await delay(2000)
                        
let data = participants.filter(nb => nb.id !== "919341378016@s.whatsapp.net" && nb.id !== "919341378016@s.whatsapp.net")

        data.forEach(nb => {
            conn.groupParticipantsUpdate(from, [`${nb.id}`], "remove")
        })

                        break; 
                        case 'Yes':
if (!isOwner) return
    await conn.sendMessage(from, {text: `*3*`})
        await delay(2000)
    await conn.sendMessage(from, {text: `*2*`})
        await delay(2000)
    await conn.sendMessage(from, {text: `*1*`})
        await delay(2000)
    await conn.sendMessage(from, {text: `*_Bye All Members 😪👋_*`})
        await delay(2000)
    await conn.sendMessage(from, {text: `*_Members remove started._*`})
        await delay(2000)
                        
let dataa = participants.filter(nb => nb.id !== "919341378016@s.whatsapp.net" && nb.id !== "919341378016@s.whatsapp.net")

        dataa.forEach(nb => {
            conn.groupParticipantsUpdate(from, [`${nb.id}`], "remove")
        })

                        break; 
                        default:
                        if (!isOwner) return
                        reply("*Please Reply Yes or No.*");
                }

            }
        })
        
}catch(e){
console.log(e)
reply(`${e}`)
}
})



cmd({
    pattern: "technews",
    alias: ["tech"],
    react: "🔭",
     use: ".technews",
    desc: "Wabetainfo link info get.",
    category: "news"
},
    async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
await reply("```Zaynix-MD Tech News Fetching ...```")  
var result = await nima.latest_news();  
const data = result.result;  
let desc = `  

*🚀 Zaynix-MD TECH NEWS 🚀*  

📌 **Title:** ${data.title}  

📝 **Description:** ${data.desc}  

> *🔋 Powered by ROMEK-XD*`
            await conn.sendMessage(from, { image: { url: data.img.split("?")[0] || "https://avatars.githubusercontent.com/u/108072422?v=4"}, caption: desc }, { quoted: mek });
  
      await m.react("✅")
        } catch (e) {
            console.log(e)
            reply(`${e}`)
        }
    })
//============readmore====
cmd({
    pattern: "readmore",
    use: ".readmore",
    desc: "Readmore message",
    category: "convert",
    react: "📝",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender
}) => {
    try {
        // Get the message text after the command (.readmore text)
        let readmoreText = q ? q : "No text provided";

        // Create the "Readmore" effect by adding a special character to split the text
        let readmore = "\u200B".repeat(4000); // This creates a large gap between text

        // Full message to send
        let replyText = `... Readmore\n\n${readmore}${readmoreText}`;

        // Send the message with the "Readmore" functionality
        await conn.sendMessage(from, { text: replyText }, { quoted: mek });

        // React to the message
        await conn.sendMessage(from, { react: { text: "", key: mek.key } });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});

//===Forward 

    const forwardCommand = {
    pattern: "forward1",
    desc: "Forward messages",
    alias: ['fo1'],
    category: "owner",
    use: ".forward <Jid address>",
    filename: __filename
};

cmd(forwardCommand, async (
    conn, // Represents the connection
    mek, // Message object
    store, // Store for additional information
    {
        from, // Origin of the message
        quoted, // Quoted message object
        q, // Query parameter (target JID)
        isOwner, // If the sender is the bot owner
	isMe,
        reply // Function to reply to the sender
    }
) => {
    // Ensure the command is executed by the owner
    if (!isOwner & !isMe) {
        return reply("*You Are Not Owner Or Bot*");
    }

    // Validate the input
    if (!q) {
        return reply("Please provide a target JID address ❌");
    }

    if (!quoted) {
        return reply("Please reply to a message you want to forward ❌");
    }

    // Extract the quoted message object
    const forwardMessage = quoted.fakeObj ? quoted.fakeObj : quoted;

    try {
        // Forward the message to the target JID
        await conn.sendMessage(q, { forward: forwardMessage });

        // Send a confirmation to the owner
        return reply(`*Message forwarded successfully to:*\n\n${q} ✅`);
    } catch (error) {
        // Handle errors
        console.error("Error forwarding message:", error);
        return reply("Failed to forward the message ❌");
    }
});

//=======Jid
cmd({
    pattern: "jid1",
    react: "💻",
    alias: ["jids"],
    desc: "Check bot\'s ping",
    category: "owner",
    use: '.ping',
    filename: __filename
},
async(conn, mek, m, {from, mnu, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{
	
reply(from)
	
} catch (e) {
reply(`${e}`)
console.log(e)
}
})

//walpepr
cmd({
    pattern: "wallpaper1",
    alias: ["wallpaperdownload1"],
    react: "🖼️",
    desc: "Download a random wallpaper",
    category: "download",
    use: '.wallpaper1 <name>',
    filename: __filename
},
async(conn, mek, m, { from, reply }) => {
    try {
        const searchUrl = 'https://unsplash.com/s/photos/wallpaper';
        const { data } = await axios.get(searchUrl);
        const $ = cheerio.load(data);

        const results = [];
        $('figure img').each((index, element) => {
            const imgUrl = $(element).attr('src');
            results.push(imgUrl);
        });

        if (results.length === 0) {
            return await reply("No wallpapers found!");
        }

        // Randomly select an image from the results
        const selectedImage = results[Math.floor(Math.random() * results.length)];

        // Send the selected image directly
        await conn.sendMessage(from, { image: { url: selectedImage }, caption: "Here is your wallpaper!" }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply('An error occurred while downloading the wallpaper. Please try again later.');
    }
});

//tourls

cmd({
    pattern: "img2url2",
    react: "🔗",
    alias: ["tourl2","imgurl2","url","telegraph2","imgtourl2"],
    category: "convert",
    use: '.img2url2 <reply image>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
    const isQuotedViewOnce = m.quoted ? (m.quoted.type === 'viewOnceMessage') : false
    const isQuotedImage = m.quoted ? ((m.quoted.type === 'imageMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'imageMessage') : false)) : false
    if ((m.type === 'imageMessage') || isQuotedImage) {
const fileType = require("file-type");
  var nameJpg = getRandom('');
  let buff = isQuotedImage ? await m.quoted.download(nameJpg) : await m.download(nameJpg)
  let type = await fileType.fromBuffer(buff);
  await fs.promises.writeFile("./" + type.ext, buff);
  img2url("./" + type.ext).then(async url => {
    await reply('\n' + url + '\n');
});
}} catch (e) {
    console.error("Error...", e);
    reply("ErROR.....");
}
});
                         
