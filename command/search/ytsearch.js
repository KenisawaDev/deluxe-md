let yts = require("yt-search")
let { monospace } = require('../../lib/function')


module.exports = {
  name: "ytsearch",
  alias: ["yts","ytsearch","youtubesearch","getmp3","getmp4","ytmp3","ytmp4"],
  category: "search",
  desc: "Busquedas en YouTube",
  async run({msg, conn},{q, cmdNya}) {
    let { quoted, from, reply } = msg;
    switch(cmdNya){
      case "yts":
      case "ytsearch":
      case "youtubesearch":
        if(!q) throw `Example : .${cmdNya} <query>`
        try {
          await msg.reply(respon.wait)
          let yt = await yts(q)
          let txt = `*Búsqueda De YouTube*\n\n`
          txt += monospace(`Busqueda sobre ${q}\nSi quieres descargar usa los siguientes comandos:\n.ytmp3 <link>\n.ytmp4 <link>\n\n\n`)
          n = 0
          for ( var i of yt.all ) {
            txt += monospace(`Numero.${n+=1}\n`)
            txt += monospace(' × Título : ' + i.title + '\n')
            txt += monospace(' × Link : ' + i.url + '\n')
            txt += monospace(' × Id : ' + i.videoId + '\n')
            txt += monospace(' × Subido : ' + i.ago + '\n')
            p = await tool.formatRupiah(`${i.views}`, ".")
            txt += monospace (' × Vistas : ' + p + '\n\n')
           }
           await conn.sendFile(msg.from, yt.all[0].thumbnail, "",txt,msg)
        } catch (e){
          global.error(cmdNya, e, msg)
        }
        break;
        
        case "getmp3":
        case "ytmp3":
          if(!q) throw `Ejemplo : .${cmdNya} *1*`
          if(!msg.quoted) throw "Responde al mensaje de búsqueda de yt"
          if(!msg.quoted.isSelf) throw "????"
          await reply(respon.wait)
          urls = quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
          if (!urls) throw `Tal vez el mensaje que respondiste no contiene el resultado de ytsearch`
          y = await sc.youtube("mp3",urls[q - 1], "265")
          txt = "*乂 YouTube - Descargador*\n\n"
          txt += "``` × Título : " + y.title + "```\n"
          txt += "``` × Género : " + y.genre + "```\n"
          txt += "``` × Peso : " + y.size + "```\n"
          p = await tool.formatRupiah(`${y.views}`, ".")
          txt += "``` × Vistas : " + p + "```\n"
          txt += "``` × Calidad : " + y.quality + "```\n"
          txt += "``` × Duración : " + y.seconds + " sec " + ` ( ${y.timestamp} ) ` + "```\n"
          txt += "``` × Subido : " + y.uploadDate + ` ( ${y.ago} ) ` + "```\n"
          txt += "``` × Link : " + y.url + "```\n"
          await conn.sendFile(from, y.thumb, "", txt,msg)
          await conn.sendFile(msg.from, y.link, "yt.mp3","", msg)
          break
        
        case "getmp4":
        case "ytmp4":
          if(!q) throw `Ejemplo : .${cmdNya} *1*`
          if(!msg.quoted) throw "Responde al mensaje de búsqueda de yt"
          if(!msg.quoted.isSelf) throw "Responde al mensaje del bot"
          await reply(respon.wait)
          urls = quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
          if (!urls) throw `Tal vez el mensaje que respondiste no contiene el resultado de ytsearch`
          y = await sc.youtube("mp4",urls[q - 1], "480")
          txt = "*乂 YouTube - Descargador*\n\n"
          txt += "``` × Título : " + y.title + "```\n"
          txt += "``` × Genre : " + y.genre + "```\n"
          txt += "``` × Peso : " + y.size + "```\n"
          p = await tool.formatRupiah(`${y.views}`, ".")
          txt += "``` × Vistas : " + p + "```\n"
          txt += "``` × Calidad : " + y.quality + "```\n"
          txt += "``` × Duración : " + y.seconds + " sec " + ` ( ${y.timestamp} ) ` + "```\n"
          txt += "``` × Subido : " + y.uploadDate + ` ( ${y.ago} ) ` + "```\n"
          txt += "``` × Link : " + y.url + "```\n"
          await conn.sendFile(from, y.thumb, "", txt,msg)
          await conn.sendFile(msg.from, y.link, "yt.mp4","", msg)
          break
    }
  }
}
