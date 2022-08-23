let { monospace, isUrl } = require('../../lib/function')

module.exports = {
  name: "ig",
	alias: ["ig","igdl"],
	category: "descargador",
	use: "<url>",
	async run({msg,conn},{q,args,map,cmdNya}){
	  let { prefix } = map;
    let { from, reply} = msg;
    if(!q) throw "Introducir link de Instagram"
	  try {
	    let igdl = await sc.instagram(q)
	    if(/reel/.test(q)) return await conn.sendFile(msg.from, igdl.media[0].url,"", "*Listo*", msg)
	    ngontol = igdl.media.length > 1 ? true : false
      if(ngontol) await msg.reply("Si el número de medios es más de 1, los medios se enviarán a través del chat privado (PV)\n¡Por favor revise el chat del bot!")
      for(let i of igdl.media) {
        conn.sendFile(ngontol ? msg.sender : msg.from, i.url,"", "*Listo*",msg)
          }
	  } catch (e){
	    global.error(msg.command, e, msg)
	  }
	}
}
