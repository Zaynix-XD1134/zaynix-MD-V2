const { cmd } = require('../command')
const { fetchJson } = require('../lib/functions')

const apilink = 'https://dark-yasiya-api-new.vercel.app' // API LINK ( DO NOT CHANGE THIS!! )

cmd({
    pattern: "play",
    desc: "download songs.",
    category: "download",
    react: "🎧",
    filename: __filename
},
async(conn, mek, m,{from, reply, q}) => {
try{

if(!q) return reply('Give me song name or url !')
    
const search = await fetchJson(`${apilink}/search/yt?q=${q}`)
const data = search.result.data[0];
const url = data.url
    
const ytdl = await fetchJson(`${apilink}/download/ytmp3?url=${data.url}`)
    
let message = `‎‎*乂 Zaynix-MD SONG DOWNLOADER*

*⚙️ 𝖳𝗂𝗍𝗅𝖾* : ${data.title}
*📃 𝖣𝖾𝗌𝖼𝗋𝗂𝗉𝗍𝗂𝗈𝗇* : ${data.description}
*🚀 𝖵𝗂𝖾𝗐𝗌* : ${data.views}
*⏰ 𝖣𝗎𝗋𝖺𝗍𝗂𝗈𝗇* : ${data.timestamp}
*📆 𝖴𝗉𝗅𝗈𝖺𝖽𝖾𝖽 𝖮𝗇* : ${data.ago}
*🎬 𝖢𝗁𝖺𝗇𝗇𝖾𝗅* : ${data.author.name}

> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ*`;

            // Send the song info with context
            const sentMsg = await conn.sendMessage(
                from,
                {
                    text: message,
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterName: "Zaynix-MD",
                            newsletterJid: "120363395450355640@newsletter",
                        },
                        externalAdReply: {
                            title: `Zaynix-MD Song Downloader`,
                            body: `${data.title} : Powered By Zaynix-MD Song Information Search Engine`,
                            thumbnailUrl: data.thumbnail,
                            sourceUrl: ``,
                            mediaType: 1,
                            renderLargerThumbnail: true,
                        },
                    },
                },
                { quoted: mek },
            );

// SEND AUDIO NORMAL TYPE and DOCUMENT TYPE
await conn.sendMessage(from, { audio: { url: ytdl.result.dl_link }, mimetype: "audio/mpeg" }, { quoted: mek })
await conn.sendMessage(from, { document: { url: ytdl.result.dl_link }, mimetype: "audio/mpeg", fileName: data.title + ".mp3", caption: `${data.title}

> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ*`}, { quoted: mek })
  
} catch(e){
console.log(e)
reply(e)
}
})
