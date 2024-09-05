import express, { json } from "express";
import cors from "cors";

// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: 'TEST-4788130731965221-090117-c8f8f7322e01e3e8fd5972c8e4400c62-420027715' });

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("hola")
})

app.post("/create_preference", async (req,res) => {

try{
    const body = {
      
        items: [
          {
            title: req.body.title,
            quantity: req.body.quantity,
            unit_price: req.body.unit_price,
            currency_id: "COP",
          },
        ],
        back_urls: {
            success:"https://www.tecnipolar.com/",
            failure: "https://www.tecnipolar.com/",
            pending:"https://www.tecnipolar.com/",
        },
        auto_return: "approved",
    }

    const preference = new Preference(client)
    const result = await preference.create({body})
    res.json({
        id: result.id,
    })
}catch (error){
    console.log("error")
    res.status(500).json({
        error: "error en esta mierda"
    })
}
})

app.listen(port, () =>{
    console.log("activo")
})