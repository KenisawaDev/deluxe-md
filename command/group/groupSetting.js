module.exports = {
  name: "grupo",
  alias: ["group","grupo"],
  category: "grupo",
  desc: "Abrir/Cerrar el grupo",
  isGroup: true,
  isAdmin: true,
  isBotAdmin: true,
  async run({msg,conn},{args,q}){
    switch (q) {
      case '1':
      case 'abrir':
        await conn.groupSettingUpdate(msg.from, "not_announcement")
        await msg.reply("Listo...")
        break;
        
      case '0':
      case 'cerrar':
        await conn.groupSettingUpdate(msg.from, "announcement")
        await msg.reply("Listo...")
        break
      
      default:
        if(!q) throw `
*Formato erroneo! Ejemplo :*
  *× .${msg.command} abrir/0*
  *× .${msg.command} cerrar/1*

${global.footer}
`.trim()
    }
  }
}
