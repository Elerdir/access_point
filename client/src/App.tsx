import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./components/Login";
import {Registration} from "./components/Registration";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
