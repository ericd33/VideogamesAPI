var router = require("express").Router();
require("dotenv").config();
const axios = require("axios");
const { Genres } = require("../db");
const { API_KEY } = process.env;

module.exports = router.get("", async (req, res) => {
  const apiGenres = await axios
    .get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    .then((res) => res.data.results);

  try {
    apiGenres.forEach(
      async (obj) =>
        await Genres.findOrCreate({
          where: { id: obj.id },
          defaults: {
            id: obj.id,
            name: obj.name,
          },
        })
    );
    const dbGenres = await Genres.findAll();
    res.status(200).json(dbGenres);
  } catch (err) {
    console.log(err);
    res.send("There was an error creating the genres");
  }
});
