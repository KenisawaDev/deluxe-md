const getPosition = (name, _dir) => {
	let position = null;
	Object.keys(_dir).forEach((i) => {
		if (_dir[i].id === name) {
			position = i;
		}
	});
	if (position !== null) {
		return position;
	}
};

module.exports = {
	name: "welcome",
	alias: ["welcome"],
	desc: "Activa la función de bienvenida en el grupo",
	use: "on/off",
	category: "group",
	query: "Ingreza las opciones\non = activar\noff = desactivar",
	isAdmin: true,
	isSpam: true,
	async run({ msg, conn }, { args, prefix }) {
		let data = JSON.parse(require("fs").readFileSync("./lib/database/welcome.json"));
		let data2 = db.cekDatabase("welcome", "id", msg.from);
		if (args[0] == "on") {
			if (data2) throw "Ya estaba activa antes";
			db.modified("welcome", { id: msg.from, teks: "Gracias @user por unirte al grupo @subject", lastUpdate: false });
			await msg.reply(`Bienvenida activada con exito`);
		} else if (args[0] == "off") {
			if (!data2) throw "Ya estaba desactivada";
			data.splice(getPosition(msg.from, data), 1);
			require("fs").writeFileSync("./lib/database/welcome.json", JSON.stringify(data, null, 2));
			await msg.reply("Bienvenida desactivada con éxito");
		}
	},
};
