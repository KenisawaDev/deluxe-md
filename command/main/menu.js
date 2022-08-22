const { monospace } = require('../../lib/function')
const fs = require("fs");
let multi_pref = new RegExp("^[" + "!#%&?/;:,.~-+=".replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") + "]");

module.exports = {
  name: ['menu'].map((v) => v + ''),
  alias: ["cmd","menu","comandos"],
  category: "main",
  desc: "Mostrar comandos",
  async run({msg,conn}, {map}) {
    let { body , reply} = msg
    let pref = multi_pref.test(body) ? body.split("").shift() : ".";
    let locale = "es"
    let d = new Date(new Date() + 3600000)
    let date = d.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
    let time = d.toLocaleTimeString(locale, {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })
    const { pushName, sender } = msg;
	  const { prefix, command } = map;
		const cmds = command.keys();
		let category = [];
    
    for (let cmd of cmds) {
				let info = command.get(cmd);
				if (!cmd) continue;
				if (config.ignore.directory.includes(info.category.toLowerCase())) continue;
				cteg = info.category || "Sin categoría";
				if (info.type == "changelog") continue;
				if (!cteg || cteg === "private") cteg = "owner";
				if (Object.keys(category).includes(cteg)) category[cteg].push(info);
				else {
					category[cteg] = [];
					category[cteg].push(info);
				}
			}
			
			menu = global.footer + " *[ Beta ]*\n\n"
			menu += monospace(" ❏ Librería : Baileys-MD") + "\n"
			menu += monospace(" ❏ Creador : " + "@" + config.owner[0].split("@")[0] )+ "\n"
			menu += monospace(" ❏ Prefijo : [ " + pref + " ]") + "\n"
			menu += monospace(" ❏ Fecha : " + date) + "\n"
			menu += monospace(" ❏ Hora : " + time) + "\n\n"
			menu += monospace(`Hi, @${sender.split("@")[0]} esta es mi lista de comandos`) +`\n\n`;
			const keys = Object.keys(category)
			for(let key of keys){
			  menu += `*乂 ${key.toUpperCase()}*\n`
			  menu += `${category[key].map((cmd) => monospace(` × ${cmd.options.noPrefix ? "" : pref}${cmd.name}`)).join("\n")}` + "\n\n"
			}
			menu += `_Nota : escribe ${prefix}ayuda <comando> para saber como usar los comandos_`
			
			
			const buttons = [
           { buttonId: `.owner`,buttonText:{displayText: 'Propietario'}, type : 1},
           { buttonId: `.ping`,buttonText:{displayText: 'Ping'}, type : 1}
           ]
        const buttonMessage = {
           image: {url: "https://wallpaperboat.com/wp-content/uploads/2019/06/dark-anime-30.jpg"},
           caption: menu,
           footer: "Deluxe-bot by Deluxxx",
           buttons: buttons,
           headerType: 1,
           withTag: true
         }
       conn.sendMessage(msg.from, buttonMessage, {quoted : msg})

/*const { generateWAMessageFromContent } = require ("@adiwajshing/baileys")

prep = generateWAMessageFromContent(msg.from, { liveLocationMessage: { 
degreesLatitude: 0, degreesLongitude: 0,
caption: menu,
sequenceNumber: 0, timeOffset: 0, jpegThumbnail: null
}}, { quoted: msg
					})

return conn.relayMessage(msg.from, prep.message, { messageId: prep.key.id })*/


  }
}
