// import React, { useState, useEffect } from "react";
// V.6
import { Routes, Route } from "react-router-dom";
//Pages
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";

import Home from "./components/pages/Home";
//Layout
import Navbar from "./components/layouts/Navbar";
// Pages Admin
import HomeAdmin from "./components/pages/admin/Home";
import ManageAdmin from "./components/pages/admin/ManageAdmin";
// Pages User
import HomeUser from "./components/pages/user/Home";
// Functions
import { currentUser } from "./components/functions/auth";
// Redux
import { useDispatch } from 'react-redux';
// Routes
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
// Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const idtoken = localStorage.token;
  if (idtoken) {
    currentUser(idtoken)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: 'LOGIN',
          payload: {
            token: idtoken,
            username: res.data.username,
            role: res.data.role,
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin/index"
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/manage-admin"
          element={
            <AdminRoute>
              <ManageAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/user/index"
          element={
            <UserRoute>
              <HomeUser />
            </UserRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
