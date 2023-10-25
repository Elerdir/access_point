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
          {/*<Route path={about} element={<About />}></Route>*/}
          {/*<Route path={contact} element={<Contact />}></Route>*/}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
