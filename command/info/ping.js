const moment = require("moment-timezone");

const ping = function (timestamp, now) {
	return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};

const os = require("os");
let { performance } = require('perf_hooks')
const { sizeFormatter } = require("human-readable");
const formatSize = sizeFormatter({
	std: "JEDEC",
	decimalPlaces: "2",
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`,
});

// Check Bandwidth
async function checkBandwidth() {
var data = require("node-os-utils")
data = await data.netstat.stats()
let ind = 0
let out = 0
for (let i of data) {
ind = ind + i.inputBytes
out = out + i.outputBytes
}
return {
download: formatSize(ind),
upload: formatSize(out)
}
}


const { convertTime, monospace } = require("../../lib/function");

module.exports = {
	name: "ping",
	alias: ["ping", "speed"],
	category: "info",
	desc: "Velocidad del bot.",
	isSpam: true,
	async run({ msg }, {map}) {
	  try {
	    let old = performance.now()
      let neww = performance.now()
      let speed = neww - old
      var nodeos = require('node-os-utils')
      var { totalMemMb, usedMemMb, freeMemMb } = await nodeos.mem.info()
      var { upload, download } = await checkBandwidth()
                 
      text = "STATUS DEL BOT\n"
	  	text += ` × Ping : ${ping(msg.messageTimestamp, Date.now())} segundo(s)\n`
	  	text += ` × Velocidad : ${speed} milisegundos\n`
	  	text += ` × Tiempo activo : ${convertTime(map.uptime.getTime())}\n\n`
      text += "HOST\n"
      text += ` × Arch: ${os.arch()}\n`
      text += ` × CPU: ${os.cpus()[0].model}${
			os.cpus().length > 1 ? " (" + os.cpus().length + "x)" : ""}\n`
	  	text += ` × Release: ${os.release()}\n`
		  text += ` × Version: ${os.version()}\n`;
		  text += ` × Memoria: ${formatSize(os.totalmem() - os.freemem())} / ${formatSize(os.totalmem())}\n`;
	  	text += ` × Plataforma: ${os.platform()}\n\n`;
	  	text += `ESTADISTICAS\n`
	  	text += ` × Descarga : ${download}\n`
	  	text += ` × Subida : ${upload}\n`
	  	text += ` × Memoria : ${totalMemMb} MB\n`
	  	text += ` × Memoria usada : ${usedMemMb} MB\n`
	  	text += ` × Memoria libre : ${freeMemMb} MB`
	  	await msg.reply(monospace(text))
	  } catch (e){
	    global.error('ping',e, msg)
	  }
	},
};
