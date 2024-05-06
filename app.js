const express = require("express");
const app = express();
const fs = require('fs');

app.listen(3000, () => {
console.log("El servidor está inicializado en el puerto 3000");
});

app.get("/", (req, res) =>{
    try {
        res.sendFile(__dirname + "/index.html");
    } catch (error) {
        
    }
})

app.post("/agregar", (req, res) =>{
    try {
        let {nombre, precio} = req.query
    let nuevoDeporte = {
        nombre,
        precio
    }
    const data = JSON.parse(fs.readFileSync("deportes.json", "utf8"));
    let deportes = data.deportes
    deportes.push(nuevoDeporte)
    
     fs.writeFileSync("deportes.json", JSON.stringify(data))
    res.send(`El deporte ${nuevoDeporte.nombre} ha sido almacenado`)
    } catch (error) {
        console.log(error)
    }
})

app.get("/deportes", async(req, res) =>{
    try {
         fs.readFile("deportes.json", "utf-8", (e,data)=>{
              let deportes = JSON.parse(data)
             res.send(deportes)
         })
       
    } catch (error) {
        console.log(error)
    }
})

app.get("/editar", (req, res) =>{
    try {
        let {nombre, precio} = req.query
        
    const data = JSON.parse(fs.readFileSync("deportes.json", "utf8"));
    let deportes = data.deportes
    deportes.find((deporte) =>{
        if(deporte.nombre == nombre){
            deporte.precio = precio
        }
    })
    data.deportes = deportes

     fs.writeFileSync("deportes.json", JSON.stringify(data))
    res.send(`El precio del deporte ${nombre} ha sido editado`)
    } catch (error) {
        console.log(error)
    }
})

app.get("/eliminar", (req, res) =>{
    try {
        let {nombre} = req.query
        
        const data = JSON.parse(fs.readFileSync("deportes.json", "utf8"));
        let deportes = data.deportes
        const indice = deportes.findIndex(deporte => deporte.nombre == nombre);
        deportes.splice(indice, 1)
        data.deportes = deportes
    
        fs.writeFileSync("deportes.json", JSON.stringify(data))
        res.send(`El deporte ${nombre} ha sido eliminado`)
    } catch (error) {
        console.log(error)
    }
})