import React from "react";
import Login from "../screens/Login";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Register from "../screens/Register";
import Home from "../screens/Home";
import Project from "../screens/Project";
import UserAuth from "../auth/UserAuth";
import LandingPage from "../screens/LandingPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/home"
          element={
            <UserAuth>
              <Home />
            </UserAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/project" element={ <UserAuth>
              <Project />
            </UserAuth>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
