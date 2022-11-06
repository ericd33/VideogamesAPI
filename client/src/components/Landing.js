import React from "react";
import {Link} from 'react-router-dom';
import './Landing.css';
export default function Landing() {
  return (
    <div className="landing-wrap">
      <Link to="/home" className="enter">ENTRAR</Link>
      <p>Made with ❤️ by Eric Alan Daniele</p>
    </div>
  );
}
