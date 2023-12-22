import React,{useState,useEffect} from 'react'
import {useNavigate,Link,useParams, } from "react-router-dom";
import styles from '../../styles/styles';
import { IoMdArrowRoundBack } from "react-icons/io";
import './Writer.css';
import { useDispatch, useSelector } from "react-redux";
import { tempnotesPending,
    tempnotesInputvalues,
    tempnotesgetvalues,
    tempnotesError,
    clearresponse,
    DeleteComplete,
    clearStatus,
    clearallstate,
    tempnotesEditedvalues,
    prventsavenotes,
    cleartempnotesinputandprventnotessave} from '../Notes/Notes.Slice';
    import {openNewTicket} from "../Notes/Notes.Action";
import toast, { Toaster } from 'react-hot-toast';
import {fetchSingleTicket,replyOnTicket,fetchusersAllNotes,deleteProductfromeditorpage} from "../Mynotes/Mynotes.Action";
import { getSingleTicket } from '../../api/notes.api';
import {clearreplymsg,clearallnotestate} from '../Mynotes/Mynotes.Slice';

const EditNotes = () => {
    const [deletenotes, setDeletenotes] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [updateornot,setUpdateornot] = useState(false);
    const [backorforwardbtn,setBackorforwardbtn]=useState(false);
    const [text, setText] = useState("");
    const [beforeeditnotes,setBeforeeditnotes]=useState("");
    const [defaultnotesvalue,setDefaultnotesvalue]=useState("");
    const dispatch=useDispatch();
    const { isAuth,userdata } = useSelector((state) => state.login);
    const { selectedTicket, isLoading, error,ticketreply,replyTicketError,replyMsg } = useSelector((state) => state.Usernotes);
    const {status, notes,noteinput,editnotes,previousnotevalues} = useSelector(
        (state) => state.tempnotes
        );
    const navigate = useNavigate();
    var { _id } = useParams();
    useEffect(()=>{
      const fetchData = async () => {
        try {
          dispatch(fetchSingleTicket(_id));
          setText(getSingleTicket.title);
          setBeforeeditnotes(selectedTicket.notes);
          // const defaultvalue=dispatch(prventsavenotes(selectedTicket.notes));
          // setDefaultnotesvalue(defaultvalue);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
        // dispatch(fetchSingleTicket(_id));
        // setText(getSingleTicket.title);
        // dispatch(prventsavenotes(selectedTicket.notes));
        // setBeforeeditnotes(selectedTicket.notes);
        // console.log("Why going backward while file is in edit:")
    }, []);
    useEffect(() => {
    const handleBeforeUnload = (event) => {
      const unsavedChanges = true; // Set this flag based on your logic
      if (unsavedChanges) {
        const message = 'You have unsaved changes. Are you sure you want to leave?';
        event.returnValue = message; // Standard for most browsers
        return message; // For some older browsers
      }
    };
    // Add event listener for the beforeunload event
    window.addEventListener('beforeunload', handleBeforeUnload);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount
    let notetitle=selectedTicket.title;
    // console.log("text",text , "notetile", notetitle)
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    // Save the changes or perform any required actions here
  };

    const goBack = () => {
      if(notes==previousnotevalues && editnotes=="" || previousnotevalues==editnotes){
        dispatch(cleartempnotesinputandprventnotessave());
        dispatch(clearallnotestate());
        dispatch(fetchusersAllNotes(userdata._id)); 
        navigate(-1);
      }else{
             setUpdateornot(true);
            //  console.log("Why Save Save");
        // toast(
        //   "Cannot Navigate to other page,\nSince Changes are done in the note\nSave the changes and ",
        //   {
        //     duration: 2000,
        //   }
        // );
      }
    };
    const [smallscreennotes,setSmallscreennotes]=useState({});
 
        function handlesolution(e){
            if (e) {
              const NotesCopy = {
                ...smallscreennotes,
                [e.target.id]: e.target.value,
              };
              setSmallscreennotes(NotesCopy);
              dispatch(tempnotesEditedvalues(NotesCopy.notes));
              dispatch(tempnotesInputvalues(NotesCopy.notes));
            }
          }
          // console.log(smallscreennotes);
          function clearnotes(){
            setDeletenotes(!deletenotes);
          }
          function clearnotesconfirmation(){
            dispatch(deleteProductfromeditorpage(_id));
            dispatch(cleartempnotesinputandprventnotessave());
            // dispatch(tempnotesPending());
            dispatch(clearresponse());
            dispatch(DeleteComplete());
            setDeletenotes(false);
            dispatch(clearreplymsg());
            dispatch(cleartempnotesinputandprventnotessave());
            dispatch(clearallnotestate());
            dispatch(fetchusersAllNotes(userdata._id));
      }
      async function  EditednoteSubmit(){
        // console.log("nil note",smallscreennotes.notes);
        // if(!notes){
        //     toast.error('Empty Notes Can not be created');
        // }
        // if(notetitle==text){
        //   notetitle= selectedTicket.title;
        //  }else{
        //    notetitle=text;
        //  }
        const values = await Object.assign({ "notes": editnotes,
        // "link": [],
        // "filesattached":[]
      });
      // console.log(_id,values);
            dispatch(replyOnTicket(_id,values));
            dispatch(cleartempnotesinputandprventnotessave());
            dispatch(clearreplymsg());
            dispatch(fetchSingleTicket(_id));
            dispatch(clearallnotestate());
            dispatch(fetchusersAllNotes(userdata._id));
            setUpdateornot(false);
          //   if(noteinput === "success"){
          //     dispatch(clearallstate());
          //  setTimeout(()=>{
          //    dispatch(clearStatus()); 
          //   //  window.location.reload(true);
          //    navigate(-1);
          //  },1000);
        }
      function Closestatustab(){
        dispatch(clearreplymsg());
      } 
      function showdatetime(value){
        var date = value.split('T')[0];
        var time = value.split('T')[1].split('.')[0];
        var dateTime = date + '/' + time;
        return dateTime;
      }
  return (
    <div>  

{updateornot ? 
<div className='flex justify-center'>
<div id="toast-interactive" class="w-full  max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400">
    <div class="flex">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
            </svg>
            <span class="sr-only">Refresh icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">
            <span class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Update available</span>
            <div class="mb-2 text-sm font-normal">Notes Changes have made, Do you want to save the Changes?</div> 
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <a onClick={EditednoteSubmit} class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">Yes</a>
                </div>
                <div>
                    <a  class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">No</a> 
                </div>
            </div>    
        </div>
        <button onClick={()=>setUpdateornot(!updateornot)} type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
    </div>
</div>
</div>
: ""
}
       <div>
    <Toaster position='top-center' reverseOrder={false}></Toaster>
<div className='upperheight bg-slate-400'><button onClick={goBack} class="inline-flex items-center p-1 text-lg font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-400 ml-2" ><IoMdArrowRoundBack className='ml-1 mr-1'/> Go Back</button>
</div>
 {/* {previousnotevalues} */}
<div className='flex justify-center'> 
{replyMsg &&
  <div id="toast-success" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
<div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
  <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
  </svg>
  <span class="sr-only">Check icon</span>
</div>
<div class="ms-3 text-sm font-normal">{replyMsg}</div>
<button onClick={Closestatustab} type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
  <span class="sr-only">Close</span>
  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
  </svg>
</button>
</div>
}  </div>
<div className='textboxarea'>
  <div>
<div class="md:text-xl text-xs font-semibold pl-2 py-1 md:py-2 text-gray-900 dark:text-white"
                    onClick={handleDoubleClick}>
                    {isEditing ? (
                      <input
                        type="text"
                        value={text}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="text-blue-500"
                      />
                    ) : (
                      <span>Title : {selectedTicket.title}</span>
                    )}
                    </div>
<div class="md:text-xl text-xs font-semibold pl-2 py-1 md:py-2 text-gray-900 dark:text-white">
                 Created At : {selectedTicket.createdAt&& showdatetime(selectedTicket.createdAt)}
                    </div>  
                    <div class="md:text-xl text-xs font-semibold pl-2 py-1 md:py-2 text-gray-900 dark:text-white">
                    Last Seen : {selectedTicket.LastEdited&& showdatetime(selectedTicket.LastEdited)} 
                    </div>                         
                                    
                    </div>                   
<div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
 <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
     <label for="comment" class="sr-only">Your Notes</label>
     <textarea defaultValue={selectedTicket.notes} 
     value={notes == previousnotevalues ? (editnotes==""?notes:editnotes) : (notes)} 
     id="notes" onChange={handlesolution} rows="17" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a Notes here..."></textarea>
 </div>
 <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
    <div>
     <button 
     disabled={!editnotes && notes == previousnotevalues }
      onClick={EditednoteSubmit} type="submit" class="inline-flex mr-1 md:mr-2 items-center px-1 text-xs md:text-lg font-medium text-center  text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
         Save Changes
     </button>
     <button onClick={clearnotes} class="mr-1 md:mr-2 inline-flex items-center px-1 text-xs md:text-lg font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-700 hover:bg-red-500">
Delete Notes
</button> 
</div>
     <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
         <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
             <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                  <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"/>
              </svg>
             <span class="sr-only">Attach file</span>
         </button>
         <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
             <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                  <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
              </svg>
             <span class="sr-only">Set location</span>
         </button>
         <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
             <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
              </svg>
             <span class="sr-only">Upload image</span>
         </button>
     </div>
 </div>
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
          <p class="text-sm text-gray-500">Are you sure you want to this note ?</p>
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

</div>
</div>
  )
}

export default EditNotes;