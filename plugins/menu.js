// Import required modules and configurations
const config = require("../config");
const os = require("os");
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

// Command: Display bot's command panel with buttons
cmd(
  {
    pattern: "menu",
    react: "📃",
    alias: ["panel", "list", "commands"],
    desc: "Get bot's command list.",
    category: "bot",
    use: ".menu",
    filename: __filename,
  },
  async (client, message, input, { from, prefix, pushname, reply }) => {
    try {
      // Determine hosting platform based on hostname length
      let hostname;
      switch (os.hostname().length) {
        case 12:
          hostname = "replit";
          break;
        case 36:
          hostname = "heroku";
          break;
        case 8:
          hostname = "koyeb";
          break;
        default:
          hostname = os.hostname();
      }

      // Define buttons for sub-menus
      const buttons = [
        { buttonId: `${prefix}downmenu`, buttonText: { displayText: "DOWNLOAD MENU" }, type: 1 },
        { buttonId: `${prefix}searchmenu`, buttonText: { displayText: "SEARCH MENU" }, type: 1 },
        { buttonId: `${prefix}convertmenu`, buttonText: { displayText: "CONVERT MENU" }, type: 1 },
        { buttonId: `${prefix}logomenu`, buttonText: { displayText: "LOGO MENU" }, type: 1 },
        { buttonId: `${prefix}othersmenu`, buttonText: { displayText: "OTHERS MENU" }, type: 1 },
        { buttonId: `${prefix}ownermenu`, buttonText: { displayText: "OWNER MENU" }, type: 1 },
        { buttonId: `${prefix}groupmenu`, buttonText: { displayText: "GROUP MENU" }, type: 1 },
        { buttonId: `${prefix}moviemenu`, buttonText: { displayText: "MOVIE MENU" }, type: 1 },
        { buttonId: `${prefix}nsfwmenu`, buttonText: { displayText: "NSFW MENU" }, type: 1 },
        { buttonId: `${prefix}wallpapermenu`, buttonText: { displayText: "WALLPAPER MENU" }, type: 1 },
        { buttonId: `${prefix}newsmenu`, buttonText: { displayText: "NEWS MENU" }, type: 1 },
        { buttonId: `${prefix}reactionmenu`, buttonText: { displayText: "REACTION MENU" }, type: 1 },
        { buttonId: `${prefix}animemenu`, buttonText: { displayText: "ANIME MENU" }, type: 1 },
        { buttonId: `${prefix}aimenu`, buttonText: { displayText: "AI MENU" }, type: 1 },
        { buttonId: `${prefix}funmenu`, buttonText: { displayText: "FUN MENU" }, type: 1 },
      ];

      // Create button message payload
      const buttonMessage = {
        image: { url: "https://files.catbox.moe/liepk0.jpg" },
        caption: `
*👋 Hello ${pushname}*  

*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」──○●►*  
*│◈ ᴏᴡɴᴇʀ : *ʀᴏᴍᴇᴋ-xᴅ*  
*│◈ ᴠᴇʀꜱɪᴏɴ : *1.0.0*  
*│◈ ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*  
*│◈ ʀᴀᴍ ᴜꜱᴀɢᴇ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB*  
*╰─────────────────○●►*
        `,
        footer: config.DESCRIPTION,
        buttons: buttons,
        headerType: 4, // Image message with buttons
      };

      // Send button message
      await client.buttonMessage(from, buttonMessage, message);
    } catch (error) {
      reply("*Error !!*");
      console.log(error);
    }
  }
);
