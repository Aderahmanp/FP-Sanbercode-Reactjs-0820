import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './layouts/main'
import {UserProvider} from "./pages/UserContext"

function App() {
  return (
    <>
    <UserProvider >
      <Main/>
    </UserProvider>
    </>
  );
}

export default App;
