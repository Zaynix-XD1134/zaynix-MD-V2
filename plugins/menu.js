const menuCommand = {
  pattern: "menu",
  react: "👨‍💻",
  alias: ["panel", "help", "commands"],
  desc: "Get bot's command list.",
  category: "main",
  use: ".menu",
  filename: __filename
};

cmd(repocommand, async (bot, message, chat, { from, prefix, l, quoted, body, isCmd, command, args, q, pushname, isMe, isOwner, reply }) => {

  try {
    let hostname;
    const hostnameLength = os.hostname().length;

    if (hostnameLength === 12) {
      hostname = "replit";
    } else if (hostnameLength === 36) {
      hostname = "heroku";
    } else if (hostnameLength === 8) {
      hostname = "koyeb";
    } else {
      hostname = os.hostname();
    }

    const menuHeader = `❖──Zaynix-MD──❖\n\n╭───═❮ *ᴍᴇɴᴜ ʟɪsᴛ* ❯═───❖\n│ *🚀𝙑𝙀𝙍𝙎𝙄𝙊𝙉:* ${require("../package.json").version}\n│ *⌛𝙈𝙀𝙈𝙊𝙍𝙔:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB\n│ *🕒𝙍𝙐𝙉𝙏𝙄𝙈𝙀:* ${runtime(process.uptime())}\n│ *📍𝙋𝙇𝘼𝙏𝙁𝙊𝙍𝙈:* ${hostname}\n╰━━━━━━━━━━━━━━━┈⊷`;

    const loadingMessages = ["LOADING ●●○○○○", "LOADING ●●●●○○", "LOADING ●●●●●●", "`COMPLETED ✅`"];
    const loadingMessage = { text: '' };

    let { key: messageKey } = await client.sendMessage(chatId, loadingMessage);

    for (let i = 0; i < loadingMessages.length; i++) {
      const loadingUpdate = {
        text: loadingMessages[i],
        edit: messageKey
      };
      await client.sendMessage(chatId, loadingUpdate);
    }

    if (config.MODE === "nonbutton") {
      const menuSections = [{
        title: '',
        rows: [
          { title: '1', rowId: `${commandPrefix}downmenu`, description: "Downloader Commands" },
          { title: '2', rowId: `${commandPrefix}searchmenu`, description: "Search Commands" },
          { title: '3', rowId: `${commandPrefix}convertmenu`, description: "Converter Commands" },
          { title: '4', rowId: `${commandPrefix}logomenu`, description: "Logo Commands" },
          { title: '5', rowId: `${commandPrefix}mainmenu`, description: "Main Commands" },
          { title: '6', rowId: `${commandPrefix}groupmenu`, description: "Group Commands" },
          { title: '7', rowId: `${commandPrefix}bugmenu`, description: "Bug commands" },
          { title: '8', rowId: `${commandPrefix}moviemenu`, description: "Movie commands" },
          { title: '9', rowId: `${commandPrefix}othermenu`, description: "Other commands" }
        ]
      }];

      const menuImage = { url: config.LOGO };
      const menuOptions = {
        caption: menuHeader,
        image: menuImage,
        footer: config.DESCRIPTION,
        title: '',
        buttonText: "*🔢 Reply below number*",
        sections: menuSections
      };

      const replyOptions = { quoted: message };
      return await client.replyList(chatId, menuOptions, replyOptions);
    }

    if (config.MODE === "button") {
      const buttonMenu = {
        title: "🔑 Select menu type",
        rows: [
          { title: "DOWNLOAD MENU", description: "Download commands", id: `${commandPrefix}downmenu` },
          { title: "SEARCH MENU", description: "Search commands", id: `${commandPrefix}searchmenu` },
          { title: "CONVERT MENU", description: "Convert commands", id: `${commandPrefix}convertmenu` },
          { title: "MAIN MENU", description: "Convert commands", id: `${commandPrefix}mainmenu` },
          { title: "GROUP MENU", description: "Group commands", id: `${commandPrefix}groupmenu` },
          { title: "LOGO MENU", description: "Logo commands", id: `${commandPrefix}logomenu` },
          { title: "BUG MENU", description: "Bug commands", id: `${commandPrefix}bugmenu` },
          { title: "MOVIE MENU", description: "Movie commands", id: `${commandPrefix}moviemenu` },
          { title: "OTHER MENU", description: "Other commands", id: `${commandPrefix}othermenu` }
        ]
      };

      const buttonSections = [buttonMenu];
      const interactiveMenu = {
        title: "Click Here⎙",
        sections: buttonSections
      };

      const menuImage = { url: config.LOGO };
      const aliveButton = { displayText: "ALIVE" };
      const pingButton = { displayText: "PING" };

      const buttons = [
        { buttonId: `${commandPrefix}alive`, buttonText: aliveButton },
        { buttonId: `${commandPrefix}ping`, buttonText: pingButton },
        {
          buttonId: "action",
          buttonText: { displayText: "ini pesan interactiveMeta" },
          type: 4,
          nativeFlowInfo: {
            name: "single_select",
            paramsJson: JSON.stringify(interactiveMenu)
          }
        }
      ];

      const messageOptions = {
        image: menuImage,
        caption: menuHeader,
        footer: config.DESCRIPTION,
        buttons: buttons,
        headerType: 1,
        viewOnce: true
      };

      const replyOptions = { quoted: args };
      await client.sendMessage(chatId, messageOptions, replyOptions);
    }
  } catch (error) {
    replyFunction();
    logger(error);
  }
});
