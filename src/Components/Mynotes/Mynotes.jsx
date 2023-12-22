import React, { useState, useEffect } from "react";
import {fetchusersAllNotes} from "./Mynotes.Action";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate, Link } from "react-router-dom";
import styles from "../../styles/styles";
import {deleteProduct} from "./Mynotes.Action";
import toast, { Toaster } from 'react-hot-toast';
import {clearallnotestate} from './Mynotes.Slice';
import {clearallstate} from './Mynotes.Slice';
import {clearStatus, miniscreenactivation,
  miniscreendeactivate,} from '../Notes/Notes.Slice';
const Mynotes = () => {
  const dispatch = useDispatch();
  const { searchTicketList, isLoading, error } = useSelector((state) => state.Usernotes);
  const { userdata } = useSelector((state) => state.login);
  const {notes} = useSelector(
    (state) => state.tempnotes
    );
  const [str, setStr] = useState("");
  const [displaymyhistorycards, setdisplaymyhistorycards] = useState({});
  const [filteredmyhistorycards, setfilteredmyhistorycards] = useState({});
  const [deletenotes, setDeletenotes] = useState(false);
  const [deleteid,setDeleteid]=useState("");
  const navigate = useNavigate();
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await dispatch(fetchusersAllNotes(userdata._id));
  //       // setData(searchTicketList);
  //       console.log(result);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData();
  // }, []); 
  // useEffect(() => {
  //   // if(userdata){
  //     dispatch(fetchusersAllNotes(userdata._id));
  //           setdisplaymyhistorycards(searchTicketList);
  //     setfilteredmyhistorycards(searchTicketList);
  //     // console.log(searchTicketList);
  //     // console.log(userdata._id);
  //   // }
  // }, [str]);
  useEffect(() => {
    dispatch(clearallnotestate());
    if (searchTicketList.length == 0) {
      dispatch(fetchusersAllNotes(userdata._id));
    } else {
      setdisplaymyhistorycards(searchTicketList);
      setfilteredmyhistorycards(searchTicketList);
    }
  }, [searchTicketList]);
// useEffect(()=>{
//  if(searchTicketList.length)
// },[]);
  function showdatetime(value){
    var date = value.split('T')[0];
    var time = value.split('T')[1].split('.')[0];
    var dateTime = date + '/' + time;
    return dateTime;
  }

  function handleInput(e) {
    const { value } = e.target;
    setStr(value);
  //   const displaytickets = displaymyhistorycards.filter((row) =>
  //     row.title.toLowerCase().includes(str.toLowerCase()) || row.notes.toLowerCase().includes(str.toLowerCase())
  // );
  // setfilteredmyhistorycards(displaytickets);
  // console.log("inputhandle");
    if (value == "") {
      setfilteredmyhistorycards(displaymyhistorycards);
    }
  }
  // console.log(displaymyhistorycards);
  function searchtickets() {
    serchcontent(str);
  }
  function serchcontent(sttr) {
    // console.log(sttr);
    const displaytickets = displaymyhistorycards.filter((row) =>
    row.title?.toLowerCase().includes(str.toLowerCase()) || row.notes?.toLowerCase().includes(str.toLowerCase())
    );
    setfilteredmyhistorycards(displaytickets);
  }
  function clearnotes(id){
    setDeletenotes(!deletenotes);
    setDeleteid(id);
    console.log(deleteid);
  }
  // console.log(filteredmyhistorycards);
  // function Deletenote(id){
  //  console.log(id);
  // }
  function clearnotesconfirmation(){
    if(deleteid){
      dispatch(deleteProduct(deleteid));
      setDeletenotes(false);
      // setTimeout(()=>{
      //   dispatch(clearStatus()); 
      //    },1000);
        dispatch(clearallnotestate());
        dispatch(fetchusersAllNotes(userdata._id));
    }
    setDeleteid("");   
    //  console.log("confirm operation"+ deleteid);
  }
  // function ReadPagenavigate(id){
  //   if(notes){
  //      toast(
  //       "New note have been created but not yet saved.\n",
  //       {
  //         duration: 3000,
  //       }
  //     );
  //      dispatch(miniscreenactivation());
  //   }else{
  //     navigate('/notes-editor/'+id);
  //     dispatch(miniscreendeactivate());
  //   }
  // }
  return (<>
    <Toaster position='top-center' reverseOrder={false}></Toaster>
  <div className="flex justify-center"><span className="text-lg font-bold text-black border-b-2 border-black mb-2">My Notes</span></div>
  <div className="flex justify-center align-middle">
  {/* <div class="input-group rounded  searchbardashboard">
            <input
              id="searchbar"
              type="search"
              class="form-control rounded searchbarinput"
              placeholder="Search Your query here..."
              aria-label="Search"
              aria-describedby="search-addon"
              onChange={handleInput}
            />
            <span class="input-group-text border-0" id="search-addon">
              <button
                type="button"
                class=" searchbuttondashboard"
                onClick={searchtickets}
                disabled={!displaymyhistorycards || !str}
              >
                <BiSearchAlt2 className="searchbuttonsize" />
              </button>
            </span>
          </div> */}
          <div className="w-full flex justify-center mx-5">
    <div class=" w-full md:w-2/3 lg:w-2/5">
        {/* <div class=" start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div> */}
        <input  onChange={handleInput} type="search" id="default-search" class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Notes..."/>
    </div>
    <button  onClick={searchtickets}
                disabled={!displaymyhistorycards || !str} type="button" class="text-white   bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>

          </div>
    <div className="flex justify-center">
        <div className={`mx-2 flex:none justify-center grid sm:grid-cols-1 md:grid-cols-2 sm:gap-4 md:gap-8 lg:gap-1 lg:grid-cols-3 xl:grid-cols-4`}>
        {filteredmyhistorycards.length > 0 ? (
                  filteredmyhistorycards
                    .slice(0)
                    .reverse()
                    .map((val,ind) => {
                      return
                       <div class={`m-2 max-w-sm rounded overflow-hidden shadow-lg ${styles.defaultColor} w-80`}>
                      <div class="px-3 py-2">
                        <div className="flex justify-between">
                        <div className="font-bold text-lg pl-1">{val.title?.slice(0, 10)}</div> 
                        </div>
                        <p class={`text-black text-base font-medium h-32 overflow-y-scroll ${styles.defaultColorlight} rounded-md px-2`}>
                          {val.notes}
                        </p>
                      </div>
                      <div className="flex justify-end text-xs font-bold pr-3">
                        Created at : {val.createdAt&& showdatetime(val.createdAt)}
                        </div>
                        {val.LastEdited && <div className="flex justify-end text-xs font-bold pr-3 mt-1">
                        Last Seen : {val.LastEdited&& showdatetime(val.LastEdited)}
                        </div>}
                      <div class="px-6 pb-2 mt-1 flex justify-between align-bottom">
                      <Link to={`/notes-editor/${val._id}`}>
                        <button 
                        // onClick={()=>ReadPagenavigate(val._id)}
                       class="mr-1 md:mr-2 inline-flex items-center px-1 text-lg font-medium text-center text-white bg-yellow-500 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-yellow-600 hover:bg-yellow-300">
                          View
                      </button>
                      </Link>
                      <button
                      onClick={() => clearnotes (val._id)}
                      // onClick={(val._id)=>Deletenote}
                      class="mr-1 md:mr-2 inline-flex items-center px-1 text-lg font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-500 hover:bg-red-400">
                          Delete
                      </button>
                      </div>
                    </div> 
                    }) ):
                     <div className={`${styles.defaultColor} text-black pt-4`}>{isLoading ?  "Create New Notes to add it in your Page.":""}</div>
         } 
        </div>
    </div>
{deletenotes && <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Clear Notes</h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">Are you sure you want to Delete this note ?</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button onClick={clearnotesconfirmation}  type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Delete</button>
          <button onClick={clearnotes} type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>}
  </>)
}

export default Mynotes;