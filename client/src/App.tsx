import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./components/Login";
import {Registration} from "./components/Registration";
import {Signpost} from "./components/Signpost";
import {LostPassword} from "./components/LostPassword";
import {UserProvider} from "./context/UserContext";
import {Administration} from "./components/Administration";

function App() {

  return (
    <div className="App">
      <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />}/>
              <Route path="/registration" element={<Registration />}/>
              <Route path="/signpost" element={<Signpost />}/>
              <Route path="/administration" element={<Administration />}/>
              <Route path="/lost-password" element={<LostPassword />}/>
            </Routes>
          </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
