import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Topbar from "./Topbar";
import Banner from "./Banner";
import Nav from "./Nav";
import Details from './Details';
export default function Videogame() {
  const { id } = useParams();
  const [videogameFound, setVgFound] = useState();
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/videogame/${id}`)
      .then(res => setVgFound(res.data));
  }, []);

  return (
    <>
      <Topbar>
        <Banner />
      </Topbar>
      <Nav></Nav>
      <Details vg={videogameFound}></Details>
    </>
  );
}
