module.exports = {
	name: "owner",
	alias: ["creador"],
	category: "info",
	async run({ msg, conn }, { q, map, args }) {
		var msga = await conn.sendContact(msg.from, config.owner, msg);
	},
};
