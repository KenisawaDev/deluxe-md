const fs = require("fs")

module.exports = {
  name: ["afk"].map((v) => v + " <razón>"),
  alias: ["afk"],
  category: "principal",
  desc: "Modo Offline",
  isGroup: true,
  async run({conn, msg}, {q}) {
    try {
      const afk = JSON.parse(fs.readFileSync("./lib/database/afk.json"));
      afk[msg.sender] = {
        id: msg.sender,
        time: Date.now(),
        reason: q ? q : "No hay",
      }
      await fs.writeFileSync("./lib/database/afk.json", JSON.stringify(afk));
      txt = "*MODO AFK*\n\n"
      txt += msg.pushName + " esta en afk!!\n"
      txt += `Razón : ${q ? q : "No hay"}`
      msg.reply(txt)
    } catch (e) {
      global.error(msg.command, e, msg)
    }
  }
}
