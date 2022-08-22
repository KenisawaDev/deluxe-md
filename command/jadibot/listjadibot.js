module.exports = {
  name: "listbot",
  alias: ["listjadibot","listbot"],
  category: "serbot",
  desc: "¡mostrando a los usuarios que hacen autostop como bots!",
  async run({conn, msg}){
    try {
      let user = [... new Set([...global.conns.filter(conn => conn.user).map(conn => conn.user)])]
      te = "*Lista  de bot(s)*\n\n"
      for(let i of user){
        y = await conn.decodeJid(i.id)
        te += " × Usuario : @" + y.split("@")[0] + "\n"
        te += " × Nombre : " + i.name + "\n\n"
      }
      user != "" ? await msg.reply(te,{withTag : true}) : await msg.reply("_*No hay usuarios todavía...*_")
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}
