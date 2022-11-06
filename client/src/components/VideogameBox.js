import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames, setCurrentPage } from "../redux/actions/index.js";
import Card from "./Card";
import "./VideogameBox.css";
import pipBoy from "../assets/image/pip.gif";

const PAGE_SIZE = 15;

export default function VideogameBox() {
  const dispatch = useDispatch();
  let videogames = useSelector((state) => state.videogames);
  let currentPage = useSelector((state) => state.currentPage);
  const filters = useSelector((state) => state.filters);
  const pageStart = currentPage * PAGE_SIZE - PAGE_SIZE;
  const pageEnd = PAGE_SIZE * currentPage;
  const pageCount = Math.ceil(filterVideogames(videogames).length / PAGE_SIZE);

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  function compareRating(a, b) {
    if (a.rating < b.rating) {
      return -1;
    }
    if (a.rating > b.rating) {
      return 1;
    }
    return 0;
  }

  function compareName(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  function filterVideogames(vgs) {
    
    let narr = [];
    if (filters.checked == "api") {
      narr = vgs.filter((obj) => typeof obj.id == "string");
    }

    if (filters.checked == "created") {
      narr = vgs.filter((obj) => typeof obj.id != "string");
    }

    if (filters.checked == "both") {
      narr = vgs;
    }
    
    if (filters.name != "") {
      narr = narr.filter((obj) => {
        const regex = new RegExp(filters.name, "ig");
        if (obj.name.match(regex)) return true;
        return false;
      });
    }

    if (filters.genre != "all") {
      narr = narr.filter((obj) => {
        let found = false;
        obj.genres.map((obj) => {
          if (obj.name == filters.genre) found = true;
        });
        if (found) return true;
        return false;
      });
    }

    switch (filters.order) {
      case "a-z":
        narr.sort(compareName);
        
        break;
      case "z-a":
        narr.sort(compareName);
        narr.reverse();
        break;
      case "best":
        narr.sort(compareRating);
        narr = narr.slice(0,5);
        break;
      case "worst":
        narr.sort(compareRating);
        narr.reverse();
        break;
      default:
        break;
    }
    
    return narr;
  }

  const displayPages = () => {
    const narr = [];
    for (let i = 0; i < pageCount; i++) {
      narr.push(<p>{i + 1}</p>);
    }
    return narr;
  };

  function handlePB(e) {
    dispatch(setCurrentPage(e.target.id))
  }

  function passPage(e) {
    if (e.target.id == "left" && currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    } else if (e.target.id == "right" && currentPage < pageCount) {
      const count = currentPage + 1;
      dispatch(setCurrentPage(count));
    }
  }

  const loadingOverlay = () => {
    return (
      <div className="loading-overlay">
        <h2>Loading...</h2>
        <img src={pipBoy}></img>
      </div>
    );
  };

  return (
    <>
      <div className="pagination-buttons">
        <a href="#" id="left" onClick={passPage} className="page-button">
          &#171;
        </a>
        {displayPages() &&
          displayPages().map((obj, index) => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              className="page-button"
              onClick={handlePB}
              id={index + 1}
              href="#"
            >
              <div className="page-button-number">{obj}</div>
            </a>
          ))}
        <a href="#" id="right" onClick={passPage} className="page-button">
          &#187;
        </a>
      </div>
      <div className="vg-box-wrap">
        <div className="videogame-box">
          {videogames.length
            ? filterVideogames(videogames)
                .slice(pageStart, pageEnd)
                .map((obj) => {
                  if (!obj.name) return <></>;
                  return <Card vg={obj} />;
                })
            : loadingOverlay()}
        </div>
      </div>
    </>
  );
}
