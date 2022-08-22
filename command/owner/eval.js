module.exports = {
	name: "eval",
	alias: [">>", ">","eval"],
	category: "default",
	noPrefix: true,
	isOwner: true,
	desc: "ejecutar código javascript a través de un comando también puede probar algo de código",
	use: `">" <codigo javascript> para ver resultados y también ">>" <código> para mostrar inmediatamente el resultado`,
	query: `Introduzca el código en los parámetros`,
	async run({ msg, conn }, { q, map, args, Baileys, arg, prefix, response, chat }) {
	  function _(stdout){
	    msg.reply("```" + `root@Senkuu:\n${stdout}` + "```")
	  }
		let kode = msg.body.trim().split(/menu +/)[0];
		let teks;
		try {
			teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`);
		} catch (e) {
			teks = e;
		} finally {
			await _(require("util").format(teks).trim());
		}
	},
};
