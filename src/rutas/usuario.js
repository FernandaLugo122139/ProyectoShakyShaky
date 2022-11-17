const express = require("express");
const controlador = require("../controladores/controladorVista");
const router = express.Router();

const controladorVista = require("../controladores/controladorVista")

router.get("/", controladorVista.cargarLogin);
router.post("/login", controladorVista.validar); 
router.post("/add", controladorVista.registrarUsuario);
router.get("/coctel/:id", controladorVista.cargarIngredientes);
router.get("/delete/:id", controladorVista.borrarCoctel);
router.post("/search/:id", controladorVista.buscarNombre);
router.post("/searchIng/:id",controladorVista.buscarIngrediente);
router.post("/insert/:id", controladorVista.insertarCoctel);

module.exports = router;