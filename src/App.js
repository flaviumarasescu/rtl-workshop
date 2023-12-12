import logo from './logo.svg';
import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

function App() {
  return (
      <div className="App">
        <RouterProvider
            router={createBrowserRouter([
              {
                element: <Home />,
                path: "/"
              },
              {
                element: <Login />,
                path: "/login"
              },
              {
                element: <Signup />,
                path: "/signup"
              }
            ])}
        />
      </div>
  );
}

export default App;
