var express = require('express');
var mysql = require('mysql');
var cors = require('cors')


var app = express();
app.use(express.json());
app.use(cors());

var conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'cliente'
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('Conexion exitosa')
    }
})

app.get('/',  function(req, res){
    res.send('Ruta de inicio')
})

app.get('/api/clientes', (req, res)=>{
    conexion.query('SELECT * FROM clientes', (error, filas)=>{
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
});


//agregar
app.post('/api/clientes' ,(req,res) =>{
    let data = {
        telefono:req.body.telefono, 
        nombre:req.body.nombre, 
        apellido:req.body.apellido,
        documento:req.body.documento,
        correo:req.body.correo,
        direccion:req.body.direccion
    };
    let sql = "INSERT INTO clientes SET ?";
    conexion.query(sql,data, function(error,results){
        if(error){
            throw error
        }else{
            res.send(results)
        }
    })
})

app.listen('3000', function(){
    console.log("Server App")
})