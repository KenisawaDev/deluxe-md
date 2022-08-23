module.exports = {
  name: "settextwelcome",
  alias: ["setwelcome"],
  category: "grupo",
  query: "*Ingresar texto de salida*\n@subject nombre del grupo\n@ownergc creador del grupo\n@user nombre del usuario\n@creation cuando fue creado el grupo\n@desc descripción del grupo",
  isGroup: true,
  isAdmin: true,
  async run({msg,conn},{q}){
    try {
      let dataNeeded = db.cekDatabase("welcome", "id", msg.from);
      if (!dataNeeded) throw "Bienvenida no activa,\nActivala con el siguiente comando: *.welcome on*";
      let data = JSON.parse(require('fs'). readFileSync('./lib/database/welcome.json'))
      let da = data.find((a) => a.id == msg.from);
      da.teks = q;
	  	da.lastUpdate = Date.now();
	  	require("fs").writeFileSync("./lib/database/welcome.json", JSON.stringify(data, null, 2));
      await	msg.reply("Listo")
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}



		
    
    
		
	  
