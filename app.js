//Express:
//modulo externo para hacer un servidor web, API rest para devolver datos y demás.

//Manejas direccionamiento, la ruta de acceso o la uri
//get obtener
//post subir
//put modificar
//delete borrar

var express = require("express");
var app = express();

//app es instancia de express
//get es metodo de http
//Path via de acceso
//function de callback
app.get('/', function (req, res) {
   res.send('Le pegaste al home de la aplicación por GET');
});

//Se puede probar con una extension de Chrome llamada POSTMAN

app.post('/', function (req, res) {
   res.send('POST a la Home Page!');
});

app.get('/example/a', function (req, res) {
   res.send('GET example/a !');
})

//Ejemplo de handlers concatenados. Todos van a manejar la solicitud siempre y cuando se le ponga next();
//Si no le ponés next(); se queda colgado porque nadie hace un res.send() algo.
app.get('/example/b', function (req, res, next) {
  console.log('La próxima función es la que va a responder.');
  //Si acá ponía res.send no saltaba a la próxima función por más que tuviera un next();
  next();
}, function (req, res) {
  res.send('Soy la segunda función para /example/b por GET!');
});

//Este handler va a manejar la solicitud para /random.php... Podés ponerle lo que quieras.
app.get('/random.php', function (req, res, next) { 
   console.log('Random php!!'); //Si acá ponía res.send, el handler de abajo no se ejecutaba
   next();
})

app.all('/random.php', function (req, res, next) {
   res.send('Para manejar todas las rutas de acceso (get, put, etc)');
   //con el res.send de arriba, no se ejecuta el manejador de abajo (get), porque no busca otros
   next(); //para que busque otra, tenés que poner un console.log, por ejemplo.
})

var cb1 = function(req, res, next){
    console.log("Callback 1!");
    next();
}

var cb2 = function(req, res, next){
    console.log("Callback 2!");
    next();
}

var cb3 = function(req, res){
    console.log("Callback 3!");
    res.send("Callback 3!!! chau");
}

app.get("/special", [cb1,cb2,cb3]); //callbacks concatenados!


//res.json()
//res.redirect()
//res.render() renderizas
//res.send()
//res.senfile()
//Siempre tenés que usar alguno de estos para que finalice la petición, sino se queda pensando

//Manejadores de rutas
//app.route();
//le concatenas el get, el post, put, delete, etc

app.route('/libro')
  .get(function(req, res) {
    res.send('GET libro');
  })
  .post(function(req, res) {
    res.send('POST libro');
  })
  .put(function(req, res) {
    res.send('PUT libro');
  });

//PASANDO PARAMETROS

app.get('/user/:id',function(req, res){
    res.send(req.params.id); //Es dinámico
    //req.params.operacion = true;
    //acá podes asignarle algo a los parámetros, los creas 
});

var bodyParser = require("body-parser");

//para tomar las variables por POST, tenés que instalar el body-parser
/*app.post('/user',function(req, res){
    res.send(req.params.id);
    //req.params.operacion = true;
    //acá podes asignarle algo a los parámetros, los creas 
});*/


//***************Middleware de nivel de aplicación**************
//https://github.com/expressjs/body-parser

//con el use podés inyectarle un Middleware
app.use(bodyParser.urlencoded({ extended: false })); //Middleware es una función que recibe un req, res y next y devuelve un next()
// con el de arriba.. parse application/x-www-form-urlencoded
// con este de abajo, parse application/json
app.use(bodyParser.json());

//También podés hacer esto:
//var jsonParser = bodyParser.json()
//o esto:
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
/*app.post('/login', urlencodedParser, function (req, res) {
  ... //Y en este caso, el Middleware vale para cuando hacen POST a /login, y no para todas las solicitudes
  ...
})*/


app.post('/user', function(req,res){
    if (!req.body) return res.sendStatus(400)
    //Si el req.body es null, le devuelvo un 400
    res.send("El ID ingresado fue: " + req.body.id);
});

//Levanto el servidor
var server = app.listen(3000, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Servidor escuchando en http://%s:%s", host, port)
})


//ver este ejemplo....
/*
var express = require('express')
var bodyParser = require('body-parser')
 
var app = express()
 
// create application/json parser 
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
// POST /login gets urlencoded bodies 
app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  res.send('welcome, ' + req.body.username)
})
 
// POST /api/users gets JSON bodies 
app.post('/api/users', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  // create user in req.body 
})


*/