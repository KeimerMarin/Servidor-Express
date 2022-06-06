const express = require('express')
const fs = require('fs')
const app = express()
const puerto = 8080

class Contenedor {
    constructor(archivo){
        this.file = archivo
    }
    async getAll() {
        try {
            return JSON.parse(
            await fs.promises.readFile(`./${this.file}`, "utf-8")
            );
        } catch (error) {
            console.log('Error al ejecutar el metodo', error);
        }
        }
    }

app.get('/', (req, res) => {
    res.send(
    ` <h1>El servidor se inicio correctamente</h1> `
    )
} )

app.get('/productos', async (req, res) => {
    let productos = await new Contenedor ('productos.txt').getAll ()
    res.send (`<div style='
    display: flex;
    align-items: center;
    justify-content: center;'> 
    ${productos.map(prod => {
        let cardProduct = `<div style= 'text-align: center;'><img src='${prod.thumbnail}' style='
        width: 200px;
        height: 200px;'/>
        <h4>${prod.title} <h4>Precio: $ ${prod.price}</div>`
        return cardProduct
    })}
    </div>`)
})
app.get('/productoRandom', async (req, res) => {
    let productos = await new Contenedor('productos.txt').getAll()
    let random =Math.floor( Math.random() * productos.length);
    res.send(`<div style='
    display: flex;
    align-items: center;
    flex-direction: column;'>
    <img src='${productos[random].thumbnail}' style='width: 200px; height: 200px;'/>
    <h4>${productos[random].title}</h4>
    Precio:$ ${productos[random].price}
    </div>`
    )
} )

app.listen(puerto, () => {
    try {
    console.log(`El servidor se inicio en el puerto ${puerto}`)
    }catch(err) {
        console.log('Error al iniciar el servidor',err)
    }
})