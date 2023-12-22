import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {LoginPage,Signuppage,ActivationPage,NotesPage,Writerpage,Editnotepage,TaskPage} from "./Routes.js"; 
// import store from "./store";
// import {loadUser } from "./Redux/action/user";
import ProtectedRoute from "./ProtectedRoute/Privateroute";
const App=()=>{
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/sign-in" element={<LoginPage />}/>
    <Route path="/sign-up" element={<Signuppage />}/>
    <Route path="/my-notes" element={<ProtectedRoute><NotesPage/></ProtectedRoute>}/>
    <Route path="/notes-writer" element={<ProtectedRoute><Writerpage/></ProtectedRoute>}/>
    <Route path="/notes-editor/:_id" element={<ProtectedRoute><Editnotepage/></ProtectedRoute>}/>
    <Route path="/my-task" element={<ProtectedRoute><TaskPage/></ProtectedRoute>}/>
    <Route path="/activation/:activation_token" element={<ActivationPage />}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
