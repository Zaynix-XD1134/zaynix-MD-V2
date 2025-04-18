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

// Command to display the bot's menu
cmd(
  {
    pattern: "menu",
    react: "💐",
    alias: ["panel", "list", "commands"],
    desc: "Displays the bot's command list.",
    category: "bot",
    use: ".menu",
    filename: __filename,
  },
  async (client, message, input, context) => {
    const {
      from,
      prefix,
      quoted,
      body,
      isCmd,
      command,
      args,
      query,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    } = context;

    try {
      // Determine the hosting platform based on hostname length
      let platform;
      const hostnameLength = os.hostname().length;
      if (hostnameLength === 12) {
        platform = "replit";
      } else if (hostnameLength === 36) {
        platform = "heroku";
      } else if (hostnameLength === 8) {
        platform = "koyeb";
      } else {
        platform = os.hostname();
      }

      // Define menu buttons for different categories
      const menuButtons = [
        { id: `${prefix}downmenu`, text: "DOWNLOAD MENU" },
        { id: `${prefix}searchmenu`, text: "SEARCH MENU" },
        { id: `${prefix}convertmenu`, text: "CONVERT MENU" },
        { id: `${prefix}logomenu`, text: "LOGO MENU" },
        { id: `${prefix}othersmenu`, text: "OTHERS MENU" },
        { id: `${prefix}ownermenu`, text: "OWNER MENU" },
        { id: `${prefix}groupmenu`, text: "GROUP MENU" },
        { id: `${prefix}moviemenu`, text: "MOVIE MENU" },
        { id: `${prefix}nsfwmenu`, text: "NSFW MENU" },
        { id: `${prefix}wallpapermenu`, text: "WALLPAPER MENU" },
        { id: `${prefix}newsmenu`, text: "NEWS MENU" },
        { id: `${prefix}reactionmenu`, text: "REACTION MENU" },
        { id: `${prefix}animemenu`, text: "ANIME MENU" },
        { id: `${prefix}aimenu`, text: "AI MENU" },
        { id: `${prefix}funmenu`, text: "FUN MENU" },
      ].map((btn) => ({
        buttonId: btn.id,
        buttonText: { displayText: btn.text },
        type: 1,
      }));

      // Prepare the menu message
      const menuMessage = {
        image: "https://files.catbox.moe/liepk0.jpg",
        caption: `
👋 Hello ${pushname}

╭─「 Commands Panel 」──○●►
│◈ Owner: *ʀᴏᴍᴇᴋ-xᴅ*
│◈ Version: 1.0.0
│◈ Runtime: ${runtime(process.uptime())}
│◈ RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
╰─────────────────○●►
        `,
        footer: config.DESCRIPTION,
        buttons: menuButtons,
        headerType: 4,
      };

      // Send the menu as a button message
      await client.buttonMessage(from, menuMessage, message);
    } catch (error) {
      reply("*Error occurred!*");
      console.error(error);
    }
  }
);
