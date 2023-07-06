const { Client } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal');

const whatsappCtrl = {}

let client;

whatsappCtrl.createSession = async ( req, res)=> {
    console.log('No tenemos session guardada');

    client = new Client();
    try{
        client.on('qr', qr =>{
            qrcode.generate(qr, {small: true})
            res.json(qr);
        });
        client.on('ready', () =>{
            console.log("Conexion exitosa");
        })
        client.initialize()
    }catch{
        res.send("error");
    }
}

whatsappCtrl.sendMessage = async (req, res )=>{


    console.log(req.body.to+"@c.us");
    console.log(req.body.message);
    client.sendMessage(req.body.to+"@c.us", req.body.message);
    res.send("listo")
}

module.exports = whatsappCtrl;