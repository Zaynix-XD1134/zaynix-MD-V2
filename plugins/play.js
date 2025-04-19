const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');
const NodeCache = require('node-cache'); // Add node-cache for caching
const apilink = 'https://dark-yasiya-api-new.vercel.app'; // API LINK

// Initialize cache
const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

cmd({
    pattern: "play",
    desc: "Download songs with fast response and stylish output.",
    category: "download",
    react: "🎶",
    filename: __filename
},
async (conn, mek, m, { from, reply, q }) => {
    try {
        // Validate input
        if (!q) return reply('🎵 *Please provide a song name or URL!*');

        // Stylish loading animation
        const loadingMsg = await conn.sendMessage(from, {
            text: '🎧 *Zaynix-MD Song Downloader* 🎧\n\n🔄 *Fetching your vibe...* 🌟',
            quoted: mek
        });

        // Check cache for song data
        const cacheKey = `play_${q.toLowerCase()}`;
        const cachedData = cache.get(cacheKey);
        let data, ytdl;

        if (cachedData) {
            // Use cached data if available
            data = cachedData.data;
            ytdl = cachedData.ytdl;
        } else {
            // Fetch song data
            const search = await fetchJson(`${apilink}/search/yt?q=${q}`);
            data = search.result.data[0];
            if (!data) throw new Error('No songs found for your query! 😕');

            // Fetch download link
            ytdl = await fetchJson(`${apilink}/download/ytmp3?url=${data.url}`);
            if (!ytdl.result.dl_link) throw new Error('Failed to get download link! 😞');

            // Cache the results
            cache.set(cacheKey, { data, ytdl });
        }

        // Stylish song details
        const message = `
🎶 *Zaynix-MD Song Downloader* 🎶

✨ *Title*: ${data.title}
📝 *Description*: ${data.description || 'N/A'}
👀 *Views*: ${data.views || 'N/A'}
⏳ *Duration*: ${data.timestamp || 'N/A'}
📅 *Uploaded*: ${ăsdata.ago || 'N/A'}
🎤 *Channel*: ${data.author.name || 'N/A'}

🌟 *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ* 🌟
        `;

        // Delete loading message
        await conn.deleteMessage(from, loadingMsg);

        // Send song details with stylish context
        await conn.sendMessage(
            from,
            {
                text: message.trim(),
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterName: "Zaynix-MD",
                        newsletterJid: "120363395450355640@newsletter",
                    },
                    externalAdReply: {
                        title: `🎵 Zaynix-MD Song Downloader`,
                        body: `${data.title} - ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ`,
                        thumbnailUrl: data.thumbnail,
                        sourceUrl: '',
                        mediaType: 1,
                        renderLargerThumbnail: true,
                    },
                },
            },
            { quoted: mek }
        );

        // Send audio and document
        await conn.sendMessage(from, { audio: { url: ytdl.result.dl_link }, mimetype: "audio/mpeg" }, { quoted: mek });
        await conn.sendMessage(from, {
            document: { url: ytdl.result.dl_link },
            mimetype: "audio/mpeg",
            fileName: `${data.title}.mp3`,
            caption: `🎵 ${data.title}\n\n🌟 *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ* 🌟`
        }, { quoted: mek });

    } catch (e) {
        console.error('Error in play command:', e);
        // Delete loading message if it exists
        if (loadingMsg) await conn.deleteMessage(from, loadingMsg);
        reply(`❌ *Oops! Something went wrong*: ${e.message || 'Please try again later.'} 😔`);
    }
});
