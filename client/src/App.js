import React from "react";
import Home from "./components/Home";
import Landing from "./components/Landing";
import Videogame from "./components/Videogame";
import About from "./components/About";
import { Route, Switch } from "react-router-dom";
import Create from "./components/Create";

function App() {
  return (
    <Switch>
      <Route exact path="/" children={<Landing/>}/>
      <Route path="/home" children={<Home/>}/>
      <Route path="/videogame/:id" children={<Videogame/>}/>
      <Route path="/create" children={<Create/>}/>
      <Route path="/about" children={<About/>}/>
    </Switch>
  );
}

export default App;
