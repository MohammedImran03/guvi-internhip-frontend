import React,{useEffect} from 'react'
import Notes from '../Components/Notes/Notes';
import Headercomp from '../Components/Layout/Headercomp';
import Mynotes from "../Components/Mynotes/Mynotes";
import './Pages.css';
import {cleareditnotestopreventbug} from '../Components/Notes/Notes.Slice';
import {clearallnotestate} from '../Components/Mynotes/Mynotes.Slice';
import { fetchusersAllNotes } from '../Components/Mynotes/Mynotes.Action';
import { useSelector,useDispatch} from "react-redux";
const NotesPage = () => {
  const dispatch=useDispatch();
  const {userdata} = useSelector((state) => state.login);
  useEffect(()=>{
    dispatch(clearallnotestate());
    dispatch(fetchusersAllNotes(userdata._id));
    dispatch(cleareditnotestopreventbug());
  },[]);
  return (
  <div>
    <Headercomp/>
    <Notes/>
    <Mynotes/>
    </div>
  )
}

export default NotesPage;