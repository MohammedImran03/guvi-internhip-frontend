import React,{useState} from "react";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineRectangle } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Popconfirm } from "antd";
import { tempnotesPending,
    tempnotesInputvalues,
    tempnotesgetvalues,
    tempnotesError,
    clearresponse,
    DeleteComplete,
    clearStatus,
    clearallstate} from './Notes.Slice';
import './Notes.css';
import Spinner from "../Loader/Spinner";
import {openNewTicket} from "./Notes.Action";
import toast, { Toaster } from 'react-hot-toast';
import {fetchusersAllNotes} from '../Mynotes/Mynotes.Action';
import {clearallnotestate} from '../Mynotes/Mynotes.Slice';

const Notes = () => {
    const [notesscreen, setNotescreen] = useState(false);
    const [deletenotes, setDeletenotes] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState("Untitled...");
    const [smallscreennotes,setSmallscreennotes]=useState({});
    const dispatch=useDispatch();
    const { isLoading, status, notes,noteinput} = useSelector(
        (state) => state.tempnotes
        );
    const { isAuth,userdata } = useSelector((state) => state.login);
    const NotesScreenmodal=()=>{
        setNotescreen(!notesscreen);
    }
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
    let notetitle='';
    function handlesolution(e){
        if (e) {
          const NotesCopy = {
            ...smallscreennotes,
            [e.target.id]: e.target.value,
          };
        //   console.log(NotesCopy);
          setSmallscreennotes(NotesCopy);
          dispatch(tempnotesInputvalues(NotesCopy.notes));
        //   console.log(smallscreennotes);
        //   console.log(notes);
        }
      }
      function clearnotes(){
        setDeletenotes(!deletenotes);
      }
  function clearnotesconfirmation(){
        dispatch(tempnotesPending());
        dispatch(clearresponse());
        dispatch(DeleteComplete());
        setDeletenotes(false);
        setNotescreen(!notesscreen);
        setText("Untitled...");
  }
  async function  NewnoteSubmit(){
    // console.log("nil note",smallscreennotes.notes);
    if(!notes){
        // console.log("nil note");
        toast.error('Empty Notes Can not be created');
    }
    if(text=="Untitled..."){
     notetitle= notes.substring(0, 5);
    }else{
      notetitle=text;
    }
    const values = await Object.assign({  "userId" : userdata._id ,
    "title" : notetitle,
    "notes": notes,
    "link": [],
    "filesattached":[]});
    // console.log(values);
    if(notes){
        dispatch(openNewTicket(values));
        setNotescreen(!notesscreen);
          if(noteinput === "success"){
              //  dispatch(clearallstate());
            setTimeout(()=>{
              dispatch(clearStatus()); 
               },1000);
              dispatch(clearallnotestate());
              dispatch(fetchusersAllNotes(userdata._id));
              // window.location.reload(true);
           
          }
    }
  }
  function Closestatustab(){
    dispatch(clearStatus());
  }
  return ( <>  
  <div className="flex justify-center">
    {status &&
        <div id="toast-success" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <span class="sr-only">Check icon</span>
    </div>
    <div class="ms-3 text-sm font-normal">{status}</div>
    <button onClick={Closestatustab} type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
</div>
}  
 </div> 
    <div className="Homenotes">
      <div className="max-w-screen-lg p-4 mx-auto flex justify-center w-full">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className="flex:none grid sm:grid-cols-1 md:grid-cols-2 sm:gap-4 md:gap-8 lg:gap-8 lg:grid-cols-2 pt-6 text-center">
          <button
             onClick={NotesScreenmodal}
            class="block max-w-sm p-4 bg-indigo-500 border border-gray-200 rounded-lg shadow hover:bg-indigo-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            type="button"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center">
              <IoMdAdd size={100} />
            </h5>
            <h1 class="text-2xl font-bold text-black dark:text-gray-400">
              Create Notes
            </h1>
            <p class="text-sm text-start text-black dark:text-gray-400 pt-2">
              Notes here are stored permanently.
            </p>
          </button>
          <a href="/my-task" class="block max-w-sm p-4 bg-orange-500 border border-gray-200 rounded-lg shadow hover:bg-orange-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center">
              <IoMdAdd size={100} />
            </h5>
            <h1 class="text-2xl font-bold text-black dark:text-gray-400">
              Tasks
            </h1>
            <p class="text-sm text-start text-black dark:text-gray-400 pt-2">
              Todo Tags here.
            </p>
          </a>
          {/* <a 
            class="block max-w-sm p-4 bg-green-500 border border-gray-200 rounded-lg shadow hover:bg-green-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center">
              <IoMdAdd size={100} />
            </h5>
            <h1 class="text-2xl font-bold text-black dark:text-gray-400">
              Quick Memo's.
            </h1>
            <p class="text-sm text-start text-black dark:text-gray-400 pt-2">
              Reminder Notes.
            </p>
          </a> */}
        </div>
        <div className="flex justify-center">
          {/* <button data-modal-target="default-modal" data-modal-toggle="default-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  Toggle modal
</button> */}
{notesscreen  ? <div className="flex justify-center"><div
          className="Modalnotes fixed w-1/2 h-3/4"
        >
<div className="flex flex-col justify-center bg-indigo-500 rounded-sm">
<div className="bg-white text-black p-1 m-3">
<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div class="flex items-center justify-between p-2 md:p-2 border-b rounded-t dark:border-gray-600">
                    <div class="md:text-xl text-sm font-semibold text-gray-900 dark:text-white"
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
                      <span>{text}</span>
                    )}
                    </div>
                    <div>
                    {notes &&   <button onClick={clearnotes} class="mr-2 inline-flex items-center px-1 text-lg font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-700 hover:bg-red-500">
      Clear
  </button> }
  <button  onClick={NotesScreenmodal}
                        type="button"
                        class="text-black bg-transparent hover:text-gray-900 mr-2 text-sm w-4 h-4 md:w-8 md:h-8 ms-auto inline-flex justify-center items-center hover:bg-yellow-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <FaMinus />
                        <span class="sr-only">Close modal</span>
                      </button>
                      <Link to="/notes-writer"><button
                        type="button"
                        class="text-black bg-transparent hover:text-gray-900 mr-2 text-sm w-4 h-4 md:w-8 md:h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <MdOutlineRectangle />
                        <span class="sr-only">Close modal</span>
                      </button></Link>
                      {/* <button
                      onClick={NotesScreenmodal}
                        type="button"
                        class="text-black bg-transparent hover:text-gray-900  text-sm w-4 h-4 md:w-8 md:h-8 ms-auto inline-flex justify-center items-center hover:bg-red-600 dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="default-modal"
                      >
                        <IoMdClose />
                        <span class="sr-only">Close modal</span>
                      </button> */}
                    </div>
                  </div>
                  <div class="p-4 md:p-5 space-y-4">

                  {/* <form> */}
   <div class="w-full mb-1 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
       <div class=" bg-white rounded-b-lg dark:bg-gray-800">
           <label for="editor" class="sr-only">Publish post</label>
           <textarea value={" "?notes:" "} class="resize-none rounded-md w-full h-full overflow-y-scroll" rows={8} id="notes" onChange={handlesolution}></textarea>
       </div>
   </div>
   <div className="flex justify-end mr-2">
   <button onClick={NewnoteSubmit} type="submit" class="inline-flex items-center p-1 text-lg font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
       Save
   </button>
   </div>
{/* </form> */}
  </div>
                </div>
      </div>
          </div>
        </div></div> : " "}
            <div
              id="default-modal"
              tabindex="-1"
              aria-hidden="true"
              class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              <div class="relative p-4 w-full max-w-2xl max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div class="flex items-center justify-between p-2 md:p-2 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                      Untitled...
                    </h3>
                    <div>
                      <Link to="/notes-writer"><button
                        type="button"
                        class="text-black bg-transparent hover:text-gray-900  text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <MdOutlineRectangle />
                        <span class="sr-only">Close modal</span>
                      </button></Link>
                      <button
                        type="button"
                        class="text-black bg-transparent hover:text-gray-900  text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-red-600 dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="default-modal"
                      >
                        <IoMdClose />
                        <span class="sr-only">Close modal</span>
                      </button>
                    </div>
                  </div>
                  <div class="p-4 md:p-5 space-y-4">
                  <textarea class="resize rounded-md"></textarea>
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
                <p class="text-sm text-gray-500">Are you sure you want to Clear all the text you inserted in the note? All of your data will be permanently removed.</p>
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


          {/* <div className='flex:none grid sm:grid-cols-1 md:grid-cols-2 sm:gap-4 md:gap-8 lg:gap-0 lg:grid-cols-none '>
    {portfoliosdata.map(({id,src,title,description,live,client,server,demokey,demopass,projectsrc})=>(
           <div key={id} class="max-w-sm w-full lg:max-w-full lg:flex my-10 h-auto lg:h-auto shadow-lg bg-slate-900 lg:bg-transparent"> 
                 <div class="border-r  border-b border-2 border-gray-400 lg:border--0 lg:border-t lg:border-gray-400  rounded-t lg:rounded-r-none lg:rounded-l p-2 flex flex-col justify-between leading-normal">
        <div class="m-1 h-40">
          <div class=" font-bold text-2xl uppercase mb-1">{title}</div>
          <p class=" text-base text-justify"><span className="text-orange-500"><b>Description:</b></span> {description}</p>
        </div>
      </div>
        <img src={src}
        //  data-aos="zoom-in" data-aos-duration="1000"
                        alt={title}
                        className="h-48 w-96 lg:h-auto lg:w-96 flex-none bg-cover  text-center overflow-hidden duration-200 hover:scale-105 border-8 border-gray-600"
                      />
      <div class="border-r border-b border-2 border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400  rounded-b lg:rounded-b-none lg:rounded-r p-1 flex flex-col justify-between leading-normal">
        <div class="items-center">
            <div className='flex gap-1 flex-wrap items-center justify-center'>
       {projectsrc.map((val,ind)=>{return(
        <div key={ind} className='flex justify-center align-middle m-1 bg-fuchsia-500 rounded-lg' title={val.title}
        //  data-aos="flip-left"
        // data-aos-easing="ease-out-cubic"
        // data-aos-duration="1000"
        >
        <img class="w-10 h-10 hover:scale-105 p-1" src={val.logo} alt="html" /></div>
        );})}
        </div>
            <div class="flex justify-center align-bottom mt-2">
          <div class="flex justify-center p-1">
          <a className="p-1 m-1 bg-gray-500 transition-dark 
                rounded-lg flex items-center gap-2 hover:ring-4 ring-blue-600"
                href={live}
                target="_blank"
                >Live<span>
                <LiaExternalLinkSquareAltSolid size={20} className="m-1" />
                </span>
            </a>
            <a className="p-1 m-1 bg-gray-500 transition-dark 
                rounded-lg flex items-center gap-2 hover:ring-4 ring-blue-600"
                href={client}
                target="_blank">Client<span>
                <FaGithub size={20}  className="m-1" />
                </span>
            </a>
            <a className="p-1 m-1 bg-gray-500 transition-dark 
                rounded-lg flex items-center gap-2 hover:ring-4 ring-blue-600"
                href={server}
                target="_blank">server<span>
                <FaGithub size={20}  className="m-1" />
                </span>
            </a>
          </div>
        </div>
        <div className="flex justify-center text-xs">
        {demokey && demopass ? <>
        <a className="p-1 m-1  transition-dark 
                rounded-lg flex items-center gap-2 cursor-text"
                ><span>
                <BiSolidUser size={15}/>
                </span>{demokey}
            </a>
            <a className="p-1 m-1  transition-dark 
                rounded-lg flex items-center gap-2 cursor-text"
                ><span>
                <RiLockPasswordLine size={15}/>
                </span>{demopass}
            </a></>: <span><a className="p-1 m-1  transition-dark 
                rounded-lg flex items-center gap-2 cursor-text"
                ><span>
                <RiOpenSourceLine size={15}/>
                </span>Open Source
            </a></span>}
        </div>
        </div>
      </div>
    </div>
       ))} 
    </div> */}
        </div>
      </div>
    
    </div>
    </>  );
};

export default Notes;
