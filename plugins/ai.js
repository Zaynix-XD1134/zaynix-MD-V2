const config = require("../config");
const { cmd, commands } = require("../command");
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson,
} = require("../lib/functions");
const axios = require("axios");
const fetch = require("node-fetch");

const wm = config.DESCRIPTION; // Watermark/footer from config

// Command: Blackbox AI Chat
cmd({
  pattern: "blackbox",
  react: "👾",
  desc: "Blackbox AI chat",
  category: "ai",
  use: ".blackbox <Your Question>",
  filename: __filename,
}, async (conn, msg, text, { from, l, q, reply }) => {
  try {
    if (!q) {
      return reply("Please provide a question or keyword.");
    }
    const response = await fetchJson(`https://apitest1-f7dcf17bd59b.herokuapp.com/ai/blackbox?prompt=${encodeURIComponent(q)}`);
    await reply(response.result);
  } catch (error) {
    reply("Unable to generate a response.");
    l(error); // Log error
  }
});

// Function: Convert Text to Image using Photoleap API
async function textToImage(prompt) {
  try {
    const { data } = await axios.get(`https://tti.photoleapapp.com/api/v1/generate?prompt=${encodeURIComponent(prompt)}`);
    return data;
  } catch (error) {
    console.error("Error in textToImage:", error);
    return null;
  }
}

// Command: Photoleap Text-to-Image
cmd({
  pattern: "photoleap",
  alias: ["plai"],
  react: "🤖",
  category: "ai",
  desc: "Convert text to an AI-generated image",
  use: ".photoleap <Your Prompt>",
  filename: __filename,
}, async (conn, msg, text, { from, q, reply }) => {
  try {
    if (!q) {
      return reply("Example: .photoleap woman, hair color red, full body, bokeh");
    }
    const result = await textToImage(q);
    if (!result || !result.result_url) {
      return reply("⚠️ Unable to generate image. Please try again later.");
    }
    await conn.sendMessage(from, {
      image: { url: result.result_url },
      caption: config.FOOTER,
    }, { quoted: msg });
  } catch (error) {
    console.error("Photoleap error:", error);
    reply("Server is busy. Try again later!");
  }
});

// Function: AI Art Generator using MagicStudio API
async function aiArtGenerator(prompt) {
  try {
    const response = await fetch("https://ai-api.magicstudio.com/api/ai-art-generator", {
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        "Origin": "https://magicstudio.com",
        "Referer": "https://magicstudio.com/ai-art-generator/",
      },
      body: new URLSearchParams({
        prompt,
        output_format: "bytes",
        user_profile_id: "null",
        anonymous_user_id: "a584e30d-1996-4598-909f-70c7ac715dc1",
        request_timestamp: Date.now(),
        user_is_subscribed: "false",
        client_id: "pSgX7WgjukXCBoYwDM8G8GLnRRkvAoJlqa5eAVvj95o",
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.arrayBuffer();
  } catch (error) {
    console.error("Error in aiArtGenerator:", error);
    throw error;
  }
}

// Command: AI Art Generator
cmd({
  pattern: "aiartgen",
  alias: ["aiart"],
  react: "📷",
  desc: "Generate images using Bing AI",
  category: "ai",
  use: ".aiart <prompt>",
  filename: __filename,
}, async (conn, msg, text, { from, q, reply }) => {
  try {
    if (!q) {
      return reply("Please provide a prompt to generate images.");
    }
    const imageBuffer = await aiArtGenerator(q);
    await conn.sendMessage(from, {
      image: Buffer.from(imageBuffer),
      caption: wm,
    }, { quoted: msg });
  } catch (error) {
    reply("Unable to generate images for the given prompt.");
    console.error("AI Art Generator error:", error);
  }
});

// Command: General AI Chat (ChatGPT-like)
cmd({
  pattern: "ai",
  alias: ["chatgpt", "gpt"],
  desc: "AI chat powered by ChatGPT",
  react: "🧠",
  use: ".ai <text>",
  category: "ai",
  filename: __filename,
}, async (conn, msg, text, { from, q, reply }) => {
  try {
    const response = await fetchJson(`https://www.dark-yasiya-api.site/ai/chatgpt?q=${encodeURIComponent(q)}`);
    await conn.sendMessage(from, {
      text: response.result,
      contextInfo: {
        mentionedJid: ["919341378016@s.whatsapp.net"],
        groupMentions: [],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363395450355640@newsletter",
          newsletterName: "Zaynix-MD",
          serverMessageId: 999,
        },
        externalAdReply: {
          title: "A MULTI DEVICE WHATSAPP BOT",
          body: "zaynix-md",
          mediaType: 1,
          sourceUrl: "https://github.com/ROMEKTRICKS/Zaynix-MD",
          thumbnailUrl: "https://files.catbox.moe/liepk0.jpg",
          renderLargerThumbnail: false,
          showAdAttribution: true,
        },
      },
    }, { quoted: msg });
  } catch (error) {
    console.error("AI Chat error:", error);
    reply(`Error: ${error.message || error}`);
  }
});

// Command: GoodyAI Chat
cmd({
  pattern: "goodyai",
  alias: ["gai", "goodgpt"],
  desc: "AI chat powered by GoodyAI",
  react: "🧠",
  use: ".goodyai <text>",
  category: "ai",
  filename: __filename,
}, async (conn, msg, text, { from, q, reply }) => {
  try {
    const response = await fetchJson(`https://www.dark-yasiya-api.site/ai/goodyai?q=${encodeURIComponent(q)}`);
    await conn.sendMessage(from, {
      text: response.result,
      contextInfo: {
        mentionedJid: ["919341378016@s.whatsapp.net"],
        groupMentions: [],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363395450355640@newsletter",
          newsletterName: "𓆩•Zaynix-MD•𓆪",
          serverMessageId: 999,
        },
        externalAdReply: {
          title: "A MULTI DEVICE WHATSAPP BOT",
          body: "zaynix-md",
          mediaType: 1,
          sourceUrl: "https://github.com/ROMEKTRICKS/Zaynix-MD",
          thumbnailUrl: "https://files.catbox.moe/liepk0.jpg",
          renderLargerThumbnail: false,
          showAdAttribution: true,
        },
      },
    }, { quoted: msg });
  } catch (error) {
    console.error("GoodyAI error:", error);
    reply(`Error: ${error.message || error}`);
  }
});
