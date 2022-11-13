const express = require("express");
const router = express.Router();

const controladorVista = require("../controladores/controladorVista")

router.get("/", controladorVista.cargarLogin);
router.post("/login", controladorVista.validar); 

module.exports = router;