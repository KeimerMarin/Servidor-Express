const express = require('express')
const app = express()
const puerto = 8080
const rutas = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/api', express.static( __dirname + '/routes' ));
app.use('/api', rutas)

app.listen(puerto, (error) => {
    if(error){
        console.log(`Se produjo un error al iniciar el servidor ${error}`)
    } else {
        console.log(`El servidor se inicio en el puerto ${puerto}`)
    }
})