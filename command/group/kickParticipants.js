module.exports = {
	name: "kick",
	alias: ["kick","sacar","ban"],
	category: "group",
	desc: "Eliminar miembros del grupo",
	isGroup: true,
	isBotAdmin: true,
	isAdmin: true,
	async run({ msg, conn }, { q, prefix }) {
	  try {
	    let participant = msg.mentions[0]
	        ? msg.mentions[0]
	        : msg.quoted
	        ? msg.quoted.sender
	        : q.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
	    await conn.groupParticipantsUpdate(msg.from, [participant], "remove")
			.then((res) => msg.reply("Se eliminó al usuario"))
			.catch((err) => msg.reply(err));
	  } catch (e){
	    global.error(msg.command, e, msg)
	  }
	},
};
