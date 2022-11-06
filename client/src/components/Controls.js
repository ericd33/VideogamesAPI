import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Controls.css";
import { useState } from "react";
import { getFilters, setCurrentPage} from "../redux/actions";
import Banner from "./Banner";

export default function Controls() {
  const genres = useSelector((state) => state.genres);
  const check = useSelector((state) => state.filters.checked)
  
  const [order, setOrder] = useState("a-z");
  const [genre, setGenre] = useState("all");
  const [search, setSearch] = useState("");
  const [currentCheck, setCurrentCheck] = useState("both")
  const dispatch = useDispatch();

  function handleGenre(e) {
    setGenre(e.target.value);
  }

  function handleOrd(e) {
    setOrder(e.target.value);
  }

  function searchHandler(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    dispatch(getFilters({ genre: genre, order: order, name: search, checked: currentCheck }));
    dispatch(setCurrentPage(1))
  }, [order, genre, search, currentCheck]);

  function checkboxHandler(e) {
    switch (e.target.id) {
      case "apicheck":
        setCurrentCheck('api')
        break;
      case "createdcheck":
        setCurrentCheck('created')
        break;
      case "bothcheck":
        setCurrentCheck('both')
        break;
      default:
        break;
    }
  }
  return (
    <div className="controls-wrapper">
      <Banner />

      <input
        type="search"
        className="searchbar"
        placeholder="Search..."
        onChange={searchHandler}
      ></input>
      <div className="filters">
        <div className="owntoggle">
          <label htmlFor="created">
            Created
            <a className="checkbox" id="apicheck" onClick={checkboxHandler}>
              {(check == 'api') && 'x'}
            </a>
          </label>
          <label htmlFor="created">
            API
            <a className="checkbox" id="createdcheck" onClick={checkboxHandler}>
              {(check == 'created') && 'x'}
            </a>
          </label>
          <label htmlFor="created">
            Both
            <a className="checkbox" id="bothcheck" onClick={checkboxHandler}>
              {(check == 'both') && 'x'}
            </a>
          </label>
        </div>
        <div className="order-filters">
          <div className="order labels">
            <label>Genre</label>
            <label>Order</label>
          </div>
          <div className="order">
            <select className="control gen-selector" onChange={handleGenre}>
              <option value="all" selected>
                All
              </option>
              {genres &&
                genres.map((obj) => (
                  <option value={obj.name}>{obj.name}</option>
                ))}
            </select>
            <select className="control ord-selector" onChange={handleOrd}>
              <option value="best">Best Rating</option>
              <option value="worst">Worst Rating</option>
              <option value="a-z" selected>
                A-Z
              </option>
              <option value="z-a">Z-A</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
