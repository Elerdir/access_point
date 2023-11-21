import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./components/Login";
import {Registration} from "./components/Registration";
import {Signpost} from "./components/Signpost";
import {LostPassword} from "./components/LostPassword";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/registration" element={<Registration />}/>
          <Route path="/signpost" element={<Signpost />}/>
          <Route path="/lost-password" element={<LostPassword />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
