const lyrics = require("music-lyrics")

module.exports = {
  name: "lyrics",
  alias: ["lirik","liric","lyrics"],
  category: "busqueda",
  desc: "Buscar letras",
  async run({msg},{q, cmdNya}){
    if(!q) throw "Ejemplo: .lyrics Joji - Ew"
        try{
            lir = await lyrics.search(q)
            lir != '' ? await msg.reply(lir) : await msg.reply('Letras no encontradas')
        }catch(e){
            global.error(cmdNya, e, msg)
        }
  }
}
