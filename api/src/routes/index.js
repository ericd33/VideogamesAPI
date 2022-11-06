const { Router } = require("express");
// Importar todos los routers;
const getVideogames = require("../controllers/getVideogames.js");
const getGenres = require("../controllers/getGenres.js");
const getVideogamesById = require("../controllers/getVideogameById.js");
const createVideogame = require("../controllers/createVideogame.js");

const router = Router();

// Configurar los routers

router.use("/videogames", getVideogames); 

router.use("/videogame", getVideogamesById);

router.use("/genres", getGenres);

router.use("/videogames", createVideogame);
module.exports = router;
