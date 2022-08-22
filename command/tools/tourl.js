module.exports = {
	name: "tourl",
	alias: ["tourl", "tolink","upload"],
	desc: "Convierte medios en links",
	use: "responde un mensaje con un medio",
	isMedia: {
		isQVideo: true,
		isQImage: true,
	},
	category: "tools",
	wait: true,
	async run({ msg, conn }, { q, cmdNya }) {
	  try {
		 y = await msg.quoted.download()
     buff = await tool.telegraph (y)
     msg.reply(buff)
	  } catch (e){
	    global.error(cmdNya, e, msg)
	  }
	},
};
