let { monospace, isUrl } = require('../../lib/function')

module.exports = {
  name: "tiktok",
  alias: ["tiktok","tiktoknowm","tiktokwm","tiktokmp3","donlodtt"],
  category: "descargador",
  query: "Introduzca el link de tiktok para la descarga",
  use: "<link de tiktok>",
  async run({msg, conn},{q, args, map, respon}){
    try {
      let { prefix } = map;
      let { from, reply, sender} = msg;
      command = msg.body.split(/ +/)[0].slice(1);
      switch(command){
        case "tiktok":
          if(!q) throw "Introduzca el link de tiktok para la descarga"
          if(!isUrl(q) && q.includes("tiktok.com")) throw "link inválido"
          await reply(respon.wait)
          var result = await rzky.downloader.tiktok(q);
          txt = "*乂 Tiktok - Descargador*\n\n"
          txt += monospace(` • Nombre : ${result.author_name}`) + "\n"
          txt += monospace(` • Autor : ${result.author}`) + "\n"
          txt += monospace(` • Desc : ${result.desc}`)
          video = result.result.video
          audio = result.result.audio
          const buttons = [
            { buttonId: `.donlodtt ${video.wm.video_url} ${sender}` , buttonText: { displayText: 'Con marca de agua' }, type: 1 },
            { buttonId: `.donlodtt ${video.nowm.video_url} ${sender}`, buttonText: { displayText: 'Sin marca de agua' }, type: 1 },
            { buttonId: `.donlodtt ${audio.audio_url} ${sender}`, buttonText: { displayText: 'Audio' }, type: 1 }
            ]
            const buttonMessage = {
             image: {url: result.thumbnail},
             caption: txt,
             footer: "Elija Marca / Sin Marca / Audio",
             buttons: buttons,
             headerType: 1
            }
          conn.sendMessage(from, buttonMessage, {quoted : msg})
          break;
          
        case "tiktokwm":
          if(!q) throw "Introduzca el link de tiktok para la descarga"
          if(!isUrl(q) && q.includes("tiktok.com")) throw "link inválido"
          await reply(respon.wait)
          result = await rzky.downloader.tiktok(q);
          get_result = result.result.video
          await conn.sendMessage(from,{video:{url : get_result.wm.video_url},caption : "Listo"}, {quoted : msg})
          break;
          
        case "tiktoknowm":
          if(!q) throw "Introduzca el link de tiktok para la descarga"
          if(!isUrl(q) && q.includes("tiktok.com")) throw "link inválido"
          await reply(respon.wait)
          result = await rzky.downloader.tiktok(q);
          get_result = result.result.video
          await conn.sendMessage(from,{video:{url : get_result.nowm.video_url},caption : "Listo"}, {quoted : msg})
          break;
          
        case "tiktokmp3":
          if(!q) throw "Introduzca el link de tiktok para la descarga"
          if(!isUrl(q) && q.includes("tiktok.com")) throw "link inválido"
          await reply(respon.wait)
          result = await rzky.downloader.tiktok(q);
          get_result = result.result.audio
          conn.sendFile(from, get_result.audio_url, get_result.audio_name,"",msg)
          break

        case "donlodtt":
          if(sender != args[1])return msg.reply("No ha solicitado la descarga de TikTok, solicítelo primero..")
          await reply(respon.wait)
          await conn.sendFile(from, q, "","",msg)
          break;
          
      }
    } catch (e){
      global.error(command, e, msg)
    }
  }
}
