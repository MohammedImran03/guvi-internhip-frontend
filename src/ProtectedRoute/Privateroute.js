import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


export default function ProtectedRoute({ children }) {
    // const dispatch = useDispatch();
    const { isAuth, userdata} = useSelector((state) => state.login);
    // const { user, isUser } = useSelector((state) => state.user);
    if (!isAuth) {
      return <Navigate to="/sign-in" replace />;
    }
    return children;
  }