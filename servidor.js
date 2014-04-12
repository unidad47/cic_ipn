// Importa librerías
var express = require("express"); //Mismo nombre utilizado en la instalación
var nunjucks = require("nunjucks"); // plantillas
//Creando el servidor web
var app = express();
// ---- Configuración de express  ---- 
// Primer argumento: Ruta actual del proyecto //nombre lógico  //  Un alias
// Segundo argumento: carpeta-ruta real
app.use("/css", express.static(__dirname + "/css")); // Me permite acceder a los recursos, pero debo conocer la ruta completa del archivo
app.use("/css", express.directory(__dirname + "/css")); // Permite navegar en el directorio, hace visibles los archivos
app.use("/imagenes", express.static(__dirname + "/imagenes"));
app.use("/videos", express.static(__dirname + "/videos"));
app.use("/javascript", express.static(__dirname + "/javascript"));

//habilita recibir parámetros post
app.use(express.urlencoded()); //

nunjucks.configure(__dirname + "/vistas",{
        express:app
});


//levanta el servidor en el puerto 8000
app.listen(8000);

app.get("/",function(request, response){ // qué recursos son accesibles
	//response.send("Estás aquí!!!");
	response.render("index.html");
});
app.get("/contacto", function(request, response){
	response.render("contacto.html");
}); // Define rutas que son accesibles
console.log("Arrancando servidor...");
app.get("/blog", function(request, response){
	var postEncontrados = [{
		titulo: "post 1",
		descripcion: "Descripcion del post 1 (breve)"
	}, {
		titulo: "post 2",
		descripcion: "Descripcion del post 2 (breve)"
	}];
	//postEncontrados = [];
	response.render("blog.html", {posts: postEncontrados}); //Siempre se envían objetos a la vista
}); // Define rutas que son accesibles

app.post("/suscribir", function(request, response){
	console.log("email del usuario" + request.body.email);// body tiene todos los parámetros que se envían por un http-post
	response.send("email del usuario:" + request.body.email);
});

app.post("/contactar", function(request, response){
	console.log("email del usuario" + request.body.email);// body tiene todos los parámetros que se envían por un http-post
	//response.send("email del usuario:" + request.body.email);
	
	var datosContacto = {
		nombre: request.body.nombre,
		email: request.body.email,
		website: request.body.website,
		edad: request.body.edad,
		comentario: request.body.comentario
	};
	response.render("datos_contacto_view.html", {datos_contacto: datosContacto});
});






console.log("Arrancando servidor...");
// node servidor.js

// Se puede intalar el framework express ---- npm install express     -g

// hotdeploy   *********************************************************************
// hot deploy    ->   npm install supervisor -g // se instala de manera global
// para correrlo:
// supervisor node servidor.js