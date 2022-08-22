module.exports = {
  name: "serbot",
  alias: ["jadibot","serbt"],
  category: "serbot",
  desc: "Prueba ser un bot",
  isPrivate: true,
  async run({conn, msg},{map}){
    if(config.botNumber != config.botNumber) return msg.reply("_No se puede crear un bot dentro de un bot..._")
    try {
      require("../../jadibot").jadibot(msg, conn)
    } catch(e) {
      global.error(msg.command, e, msg)
    }
  }
}



