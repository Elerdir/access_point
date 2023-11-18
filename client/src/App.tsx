import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./components/Login";
import {Registration} from "./components/Registration";
import {Signpost} from "./components/Signpost";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/registration" element={<Registration />}/>
          <Route path="/signpost" element={<Signpost />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
