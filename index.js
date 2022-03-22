const http = require('http')
const axios = require('axios')
const {v4: uuidv4} = require('uuid')
const moment = require('moment')
const _lodash = require('lodash')
// chalk version 4.1.0
const chalk = require('chalk')

let arr_usuarios = [];
let arr_usuarios_console = []

http.createServer((req,res)=>{
    if (req.url.startsWith('/usuarios')){
        res.writeHead(200, {'Content-type': 'text/html'})
        axios.get('https://randomuser.me/api')
        .then((data)=>{
            const {first, last} = data.data.results[0].name
            const gender = data.data.results[0].gender
            const id = uuidv4().slice(0,6)
            const timeStamp = moment().format('MMMM Do YYYY, h:mm:ss a');
            const infoUsuario = {
                first, 
                last, 
                id, 
                timeStamp,
                gender
            }
            arr_usuarios.push(infoUsuario)
            arr_usuarios_console.push(infoUsuario)
            // separo por genero y guardamos las variables en dos constantes, una para hombres y otra para mujeres
            const [arr_genders_female, arr_genders_male] = _lodash.partition(arr_usuarios, (usuario) => usuario.gender == 'female')
           
            // copio arr_usuarios para mandarlos por consola
            
            res.write('<ol>')
            _lodash.forEach(arr_usuarios,(usuario)=>{
                res.write(`<li>Nombre: ${usuario.first} - Apellido: ${usuario.last} - ID:${usuario.id} - Timestamp: ${usuario.timeStamp} </li>`)
            } )
            res.write('</ol>')
            
            _lodash.forEach(arr_usuarios_console, (usuario)=>{
                console.log(chalk.blue.bgWhite(`Nombre: ${usuario.first} - Apellido: ${usuario.last} - ID:${usuario.id} - Timestamp: ${usuario.timeStamp}`))
            })
            arr_usuarios_console.pop()
            res.end()
        })
    }
}).listen(8080, ()=>{
    console.log('Servidor en puerto 8080')
})