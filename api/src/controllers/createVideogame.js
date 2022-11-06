var router = require("express").Router();
require("dotenv").config();
const { Videogame, Genres } = require("../db");

module.exports = router.post("", async (req, res) => {
  const {
    name,
    description,
    released,
    rating,
    platforms,
    genres,
    backgroundimage,
  } = req.body;
  //validators

  if (name.length == 0 || typeof name != "string") {
    res.status(400).send({ message: "It requires a valid name" });
  }
  let storePlatform = [];
  platforms.forEach((obj) => storePlatform.push({ platform: obj }));

  console.log(storePlatform);
  const createVideogame = await Videogame.create({
    name,
    description,
    released,
    rating,
    platforms: storePlatform,
    background_image: backgroundimage,
  });
  console.log(genres);
  if (genres) {
    try {
      genres.forEach(async (obj) => {
        let genre = await Genres.findByPk(obj);
        console.log(genre);
        createVideogame.addGenres(genre);
      });
    } catch (err) {
      console.log(err);
    }
  }

  res.status(200).send("Videogame created");
});
