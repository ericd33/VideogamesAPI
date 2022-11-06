import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames } from "../redux/actions/index.js";
import axios from "axios";
import "./Form.css";
export default function Form() {
  const [platform, setPlatform] = useState([]);
  const [platlabel, setPlatlabel] = useState("");
  const [genre, setGenre] = useState([]);
  const [genrelabel, setGenreLabel] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [released, setReleased] = useState("");
  const [rating, setRating] = useState(0);
  const genreList = useSelector((state) => state.genres);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  function addPlatformHandler(e) {
    e.preventDefault();
    if (platlabel.length == 0) return;
    if (platform.indexOf(platlabel) > -1) return;
    setPlatform([...platform, platlabel]);
  }

  function addGenreHandler(e) {
    e.preventDefault();
    if (genrelabel.length == 0) return;
    if (genre.indexOf(genrelabel) > -1) return;
    setGenre([...genre, genrelabel]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let image = document.querySelector('#form-image').value;

    setErrors([]);
    let errorFound = false;

    let errarr = [];
    if (name.length == 0) {
      errarr.push("* Name can't be empty.");
      errorFound = true;
    }
    if (rating < 1 || rating > 5) {
      errarr.push("* Rating must be between 1 and 5.");
      errorFound = true;
    }

    if (released.length == 0) {
      errarr.push("* Must specify a date of release.");
      errorFound = true;
    }

    if (genre.length == 0) {
      errarr.push("* Must add at least one genre.");
      errorFound = true;
    }

    if (platform.length == 0) {
      errarr.push("* Must add at least one platform.");
      errorFound = true;
    }

    if (errorFound == true) {
      setErrors(errarr);
      return;
    }

    let platObj = [];
    platform.map((obj) => platObj.push({ name: obj }));

    let genIds = [];
    genre.map((objName) =>
      genIds.push(genreList.find((obj) => obj.name === objName).id)
    );

    

    axios.post("http://localhost:3001/videogames", {
      name: name,
      description: description,
      released: released,
      rating: rating,
      backgroundimage: image,
      platforms: platObj,
      genres: genIds,
    });

    setSuccess(true);
    setPlatform([]);
    setPlatlabel("");
    setGenre([]);
    setGenreLabel("");
    setName("");
    setDescription("");
    setReleased("");
    setRating(0);
    setErrors([]);

    document.getElementById("form-name").value = "";
    document.getElementById("form-rating").value = "";
    document.getElementById("form-description").value = "";
    document.getElementById("form-released").value = "";
    document.getElementById("form-image").value = "";
  }

  function nameHandler(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function descriptionHandler(e) {
    e.preventDefault();
    setDescription(e.target.value);
  }

  function releasedHandler(e) {
    e.preventDefault();
    setReleased(e.target.value.toString());
  }

  function ratingHandler(e) {
    e.preventDefault();
    setRating(e.target.value);
  }

  function labelChangeHandler(e) {
    setPlatlabel(e.target.value);
  }

  function genreChangeHandler(e) {
    setGenreLabel(e.target.value);
  }

  function removePlatformHandler(e) {
    let narr = [...platform];
    narr.splice(platform.indexOf(e.target.id), 1);
    setPlatform(narr);
  }

  function removeGenreHandler(e) {
    let narr = [...genre];
    narr.splice(genre.indexOf(e.target.id), 1);
    setGenre(narr);
  }

  function closeVgSuccessHandler() {
    setSuccess(false);
  }

  return (
    <div className="form-wrapper">
      {success && (
        <div className="vg-added">
          <div className="added-text">
            <a onClick={closeVgSuccessHandler} className="close-vg-success">
              X
            </a>
            <h1>Videogame added successfully!</h1>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <span>Name:</span>
          <input
            id="form-name"
            onChange={nameHandler}
            type="text"
            name="name"
          />
        </label>
        <label htmlFor="rating">
          <span>Rating:</span>
          <input
            id="form-rating"
            onChange={ratingHandler}
            type="text"
            name="rating"
          />
        </label>
        <label htmlFor="image">
          <span>Image(URL):</span>
          <input
            id="form-image"
            type="text"
            name="image"
          />
        </label>
        <label htmlFor="description">
          <span>Description:</span>
          <input
            id="form-description"
            onChange={descriptionHandler}
            type="text"
            name="description"
          />
        </label>
        <label htmlFor="released">
          <span>Released:</span>
          <input
            id="form-released"
            onChange={releasedHandler}
            type="date"
            name="released"
          />
        </label>
        <label htmlFor="platforms">
          <span>Platforms:</span>
          <select onChange={labelChangeHandler} id="platform-select">
            <option value=""></option>
            <option value="PC">PC</option>
            <option value="PlayStation 4">PlayStation 4</option>
            <option value="PlayStation 3">PlayStation 3</option>
            <option value="PlayStation 2">PlayStation 2</option>
            <option value="PSX">PSX</option>
            <option value="Xbox One">Xbox One</option>
            <option value="Xbox 360">Xbox 360</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="Nintendo 64">Nintendo 64</option>
            <option value="Android">Android</option>
            <option value="iOS">iOS</option>
          </select>
          <button onClick={addPlatformHandler}>Add platform</button>
        </label>
        <label htmlFor="genres">
          <span>Genres:</span>
          <select onChange={genreChangeHandler} id="genre-select">
            <option value=""></option>
            {genreList.map((obj) => (
              <option value={obj.name}>{obj.name}</option>
            ))}
          </select>
          <button onClick={addGenreHandler}>Add genre</button>
        </label>
        <input type="submit" className="submit-button" />
      </form>
      {errors && (
        <div className="error-wrapper">
          {errors.map((obj) => (
            <p>{obj}</p>
          ))}
        </div>
      )}
      <div className="additions">
        <div className="toaddgenres tocol">
          <h2>Genres</h2>

          {genre &&
            genre.map((obj) => (
              <a
                className="toadditem"
                href="#"
                id={obj}
                onClick={removeGenreHandler}
              >
                {obj}
              </a>
            ))}
        </div>
        <div className="toaddplatforms tocol">
          <h2>Platforms</h2>
          {platform &&
            platform.map((obj) => (
              <a
                className="toadditem"
                href="#"
                id={obj}
                onClick={removePlatformHandler}
              >
                {obj}
              </a>
            ))}
        </div>
      </div>
      {genre.length || platform.length ? (
        <p className="click-remove">(Click to remove)</p>
      ) : (
        ""
      )}
    </div>
  );
}
