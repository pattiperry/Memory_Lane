import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom"
import {MemoryLane} from "./components/MemoryLane"
import './index.css';

ReactDOM.render(
  <Router>
    <MemoryLane/>
  </Router>
  , document.getElementById('root'))


