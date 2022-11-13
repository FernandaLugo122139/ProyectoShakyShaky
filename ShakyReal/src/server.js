const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mysql = require("mysql");
const myConnection = require("express-myconnection");

const app = express();

const rutasUsuario = require("./rutas/usuario")

//Configuración del servidor 
app.set("port", process.env.PORT || 3000)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "vistas"));

//Configuración del middleware
app.use(morgan("dev"));
app.use(myConnection(mysql, 
{
    host: "localhost",
    user: "root",
    password: "CloudTifa@erisVII7",
    port: 3306,
    database: "ShakyShaky"
}, "single"));

app.use(express.urlencoded({extended: false}));

//rutas 
app.use("/", rutasUsuario);

//Archivos estáticos 
app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"), () =>
{
    console.log("Servidor corriendo y escuchando el puerto " + app.get("port"));
});