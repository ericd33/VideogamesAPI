import React from "react";
import VideogameBox from "./VideogameBox.js";
import "./Home.css";
import Controls from "./Controls";
import Topbar from "./Topbar";
import Nav from "./Nav";
export default function Home() {
  return (
    <>
      <Topbar>
        <Controls />
      </Topbar>
      <Nav />
      <VideogameBox />
    </>
  );
}
