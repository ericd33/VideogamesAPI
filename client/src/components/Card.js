import React from "react";
import "./Card.css";

export default function Card({ vg }) {
  return (
    <a href={`/videogame/${vg.id}`} className="card-wrapper">
      <img src={vg.background_image} alt={vg.name} className="card-img" />
      <div className="info-wrap">
        <h2 className="card-name">{vg.name}</h2>
        <div className="genres-container">
          {vg.genres.map((obj) => (
            <div className="genre">{obj.name}</div>
          ))}
        </div>
      </div>
    </a>
  );
}
