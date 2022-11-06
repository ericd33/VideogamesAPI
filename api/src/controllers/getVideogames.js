var router = require("express").Router();
require("dotenv").config();
const axios = require("axios");
const { Videogame, Genres } = require("../db");
const { API_KEY } = process.env;

module.exports = router.get("", async function (req, res) {
  const apiVideogames = await axios
    .get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`)
    .then((res) => res.data.results);
  
    const apiVideogames2 = await axios
    .get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=2`)
    .then((res) => res.data.results);

    const apiVideogames3 = await axios
    .get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=3`)
    .then((res) => res.data.results);

  let dbVideogames = [];

  try {
    dbVideogames = await Videogame.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
  } catch (err) {
    console.log(err);
  }

  const data = apiVideogames.concat(apiVideogames2).concat(apiVideogames3).concat(dbVideogames);

  if (req.query.name) {
    const regex = new RegExp(`${req.query["name"].replace(" ", "|")}`, "gi");
    const filterDataByName = data.filter((obj) => obj.name.match(regex));

    res.status(200).json(filterDataByName);
  } else {
    res.status(200).json(data);
  }
});
