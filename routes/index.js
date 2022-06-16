const {Router} = require('express')
const router = Router ()
const productos = [ {
    "title": "Escuadra",
    "price": 123.45,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    "id": 1
    },
    {
    "title": "Calculadora",
    "price": 234.56,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    "id": 2
    }]

//Inicio del servidor
router.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})

//Muestra todos los productos
router.get('/productos', (req, res) =>{
    res.json(productos)
})

//Agrega nuevos productos
router.post('/productos', (req, res) =>{
    const {title, price, thumbnail} = req.body
    let ultimoID = productos.length - 1
    let id = productos[ultimoID].id + 1
    productos.push({title, price, thumbnail, id})
    res.send(productos[ultimoID+1])
})

//Consultar producto por ID
router.get('/productos/:id', (req, res) =>{
    let fount = productos.find(producto => producto.id == req.params.id)
    let result
    if (fount){
        result = fount
    } else {
        result = {error: 'Producto no encontrado'}
    }
    res.json(result)
})

//Actualizar informacion de un producto por ID 
router.put('/productos/:id', (req, res) =>{
    const id = Number(req.params.id)
    const index = productos.findIndex(producto => producto.id === id)
    const previousProduc = productos[index]
    if(productos.find((prod) => prod.id === id)) {
        productos[index] = req.body
        productos [index].id = id
        res.json(`${JSON.stringify (previousProduc)} Se ha actualizado a lo siguiente: ${JSON.stringify(productos[index])}`)
    }else{
        res.json(`error: Producto no encontrado`)
    }
})

//Eliminar producto 
router.delete('/productos/:id', (req, res) =>{
    const index = productos.findIndex((producto) => {
        return producto.id == req.params.id
    })
    let result = ''
    if(index === -1){
        result = {error: 'Producto no encontrado'}
    }else{
        productos.splice(index, 1)
        result = 'Producto eliminado con exito'
    }
    res.json(result)
})

module.exports = router 