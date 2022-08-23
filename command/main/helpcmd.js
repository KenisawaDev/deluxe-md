const { monospace } = require("../../lib/function")

module.exports = {
  name: ["help"].map((v) => v + " <comando>"),
  alias: ["help","ayuda"],
  category: "pincipal",
  desc: ['Ver información de Comando', '.ayuda <comando>'],
  async run({msg,conn},{ args, q, map}) {
      if(!q) return msg.reply("Ejemplo : .ayuda play",{adReply: true})
			const name = q.toLowerCase();
			const { command, prefix } = map;
			const cmd = command.get(name) || [...command.values()].find((x) => x.alias.find((x) => x == args[0]));
			if (!cmd || (cmd.category === "private" && !config.owner.includes(msg.sender)))
				return await msg.reply("Comando no encontrado");
			helpcmd = global.footer + "\n\n"
			helpcmd += "*Ayuda de comando*\n\n"
			helpcmd += monospace(` × Comando : ${q}`) + "\n"
			helpcmd += monospace(` × Comando de activación : ${cmd.alias.join(", ")}`) + "\n"
			helpcmd += monospace(` × Categoría : ${cmd.category}`) + "\n\n"
			helpcmd += "*Atributos del comando*\n"
			helpcmd += monospace(` × Solo Creador : ${cmd.options.isOwner ? '✅' : '❌'}`) + "\n"
			helpcmd += monospace(` × Solo Admin : ${cmd.options.isAdmin ? '✅' : '❌'}`) + "\n"
			helpcmd += monospace(` × Solo Bot Adm : ${cmd.options.isBotAdmin ? '✅' : '❌'}`) + "\n"
			helpcmd += monospace(` × Solo Grupos : ${cmd.options.isGroup ? '✅' : '❌'}`) + "\n"
			helpcmd += monospace(` × Solo Pv : ${cmd.options.isPrivate ? '✅' : '❌'}`) + "\n\n"
			helpcmd += "*Descripción Del Comando*\n"
			helpcmd += monospace(` × Descripción : ${cmd.desc}`) + "\n"
			helpcmd += monospace(` × Uso : ${prefix}${cmd.name} ${cmd.use}`) + "\n\n"
			helpcmd += "*Nota :*\n"
			helpcmd += ` ➠ *[ ]* = Opcional \n ➠ *|* = O\n ➠ *<>* = Debe ser llenado`
      msg.reply(helpcmd)
  }
}
