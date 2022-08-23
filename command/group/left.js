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
	name: "left",
	alias: ["left"],
	desc: "activar la alerta de la salida de los miembros",
	use: "<on/off>",
	category: "grupo",
	query: "ingresa una opción\non = activar\noff = desactivar",
	isAdmin: true,
	async run({ msg, conn }, { args, prefix }) {
		let data = JSON.parse(require("fs").readFileSync("./lib/database/left.json"));
		let data2 = db.cekDatabase("left", "id", msg.from);
		if (args[0] == "on") {
			if (data2) throw "Ya etaba activado antes";
			db.modified("left", { id: msg.from, teks: "Bye bye @user", lastUpdate: false });
			await msg.reply(`Salida encendida con éxito`);
		} else if (args[0] == "off") {
			if (!data2) throw "Ya estaba desactivado antes";
			data.splice(getPosition(msg.from, data), 1);
			require("fs").writeFileSync("./lib/database/left.json", JSON.stringify(data, null, 2));
			await msg.reply("Se desactivo la salida con exito");
		}
	},
};
