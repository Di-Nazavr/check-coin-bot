const { Telegraf } = require('telegraf');
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);


bot.on(["channel_post", "message", "text"], (ctx) => 
    ctx
    .telegram
    .getUpdates(10000, 20, 100,["channel_post"])
    .then(value => {
      const resMsg = value.reduce((acc, msg) => {
        if(msg.message) {
          const line = msg.message.text.split("\n");   
          line.map((value, msgIndex) => {
             if(value.includes("Last project:")){
              acc["Last project"] = `${line[++msgIndex]}\n`;
            }
    
            if(value.includes("Contract:")){
              acc["Contract"] = `${line[msgIndex]}\n`;
            } 
          })
        }
        return acc;
      }, {});
      const string = resMsg["Last project"] && resMsg["Contract"] ? "Last project: " + resMsg["Last project"] + "\n" + resMsg["Contract"] + "\n" : "Абнавице телехрам бота";
      bot.telegram.sendMessage(process.env.CHAT_ID, string);
    }))

bot.launch();