import axios from "axios";
import { GET_GENRES, GET_VIDEOGAMES, GET_FILTERS, SET_CURRENT_PAGE } from "./actionTypes";

export function getVideogames() {
  return async function (dispatch) {
    const videogames = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: videogames.data
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    const genres = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: GET_GENRES,
      payload:genres.data
    })
  };
}


export function getFilters(filters) {
  return async function (dispatch) {
    return dispatch({
      type: GET_FILTERS,
      payload:filters
    })
  };
}

export function setCurrentPage(page) {
  return async function (dispatch) {
    return dispatch({
      type: SET_CURRENT_PAGE,
      payload: page
    })
  }
}