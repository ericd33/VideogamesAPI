import React, { useEffect } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Nav() {
  const [hidden, setHidden] = useState(true);
  window.addEventListener("resize", handleResize)

    useEffect(() =>{
        if (window.innerWidth <877) {
            setHidden(false);
        }
    },[])

  function sandwichHandler() {
    if (hidden) {
        setHidden(false)
    } else {
        setHidden(true)
    }

  }

  function handleResize() {
    if (window.innerWidth > 877) {
        setHidden(true)
    }
    if (window.innerWidth < 878) {
        setHidden(false)
    }
  }
  
  return (
    <>
      <a className="sandwich" onClick={sandwichHandler}>
        ☰
      </a>
      {hidden && <nav>
        <ul>
          <Link to="/home">Home</Link>
          <Link to="/create">Create</Link>
          <Link to="/about">About</Link>
        </ul>
      </nav>}
    </>
  );
}
