module.exports = {
	name: "promote",
	alias: ["pm","promote"],
	category: "grupo",
	desc: "Promover a alguien para admin",
	use: "<Mencionar Miembro>",
	isGroup: true,
	isBotAdmin: true,
	isAdmin: true,
	async run({ msg, conn }) {
		const mm = msg.quoted ? [msg.quoted.sender] : msg.mentions;
		for (let i of mm) await conn.groupParticipantsUpdate(msg.from, [i], "promote");
		await msg.reply("Miembro Promovido, Felicidades");
	},
};
