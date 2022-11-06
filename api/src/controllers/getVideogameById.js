var router = require("express").Router();
require("dotenv").config();
const axios = require("axios");
const API_KEY = process.env.API_KEY;
module.exports = router.get("/:id", async (req, res) => {
  const p = req.params;
  try {
    let apiDescription = await axios
      .get(`https://api.rawg.io/api/games/${p.id}?key=${API_KEY}`)
      .then((res) => 
        res.data.description_raw
      );

    let data = await axios
      .get(`http://localhost:3001/videogames`)
      .then((res) => res.data.find((obj) => obj["id"] == p.id));

    // let requests = [apiDescription, data]
    // Promise.all(requests).then(responses => console.log(responses))
    if (!data.hasOwnProperty('description')) data = {...data, description: apiDescription};

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(404).send("Error");
  }
});
