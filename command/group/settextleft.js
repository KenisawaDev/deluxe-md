module.exports = {
	name: "settextleft",
	alias: ["setleft"],
	desc: "Change Text On Left",
	category: "grupo",
	use: "<texto>",
	query: "*Ingresar texto de salida*\n@subject nombre del grupo\n@ownergc creador del grupo\n@user nombre del usuario\n@creation cuando fue creado el grupo\n@desc descripción del grupo",
	isAdmin: true,
	isGroup: true,
	async run({ msg, conn }, { q }) {
		let dataNeeded = db.cekDatabase("left", "id", msg.from);
		if (!dataNeeded) throw "La salida del grupo no fue activada,\nActivela con el siguiente comando: *left on*";
		let data = JSON.parse(require("fs").readFileSync("./lib/database/left.json"));
		let da = data.find((a) => a.id == msg.from);
		da.teks = q;
		da.lastUpdate = Date.now();
		require("fs").writeFileSync("./lib/database/left.json", JSON.stringify(data, null, 2));
		await msg.reply("Listo")
	},
};
