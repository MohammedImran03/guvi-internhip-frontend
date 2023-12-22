import React,{useState,useEffect} from 'react'
import { IoMdAdd } from "react-icons/io";
// import './Task.css';
// import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import TaskWriter from "./TaskWriter.jsx";
import {  
    clearallnotestate} from './Task.Slice.js';
import {fetchusersAllNotes} from './Task.Action.js';
import {useSelector,useDispatch } from "react-redux";  
import styles from "../../styles/styles"; 

const Tasks = () => {
    const dispatch=useDispatch();
    const { isAuth,userdata } = useSelector((state) => state.login);
    const { isLoadingtask,taskstatus,searchTicketList } = useSelector((state) => state.tasks);
    const [str, setStr] = useState("");
    const [displaymyhistorycards, setdisplaymyhistorycards] = useState({});
    const [filteredmyhistorycards, setfilteredmyhistorycards] = useState({});
    useEffect(() => {
        // dispatch(clearallnotestate());
        if (searchTicketList.length == 0) {
          dispatch(fetchusersAllNotes(userdata._id));
        } else {
          setdisplaymyhistorycards(searchTicketList);
          setfilteredmyhistorycards(searchTicketList);
        }
      }, []);
      console.log(filteredmyhistorycards);
      function handleInput(e) {
        const { value } = e.target;
        setStr(value);
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


    const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
    function onChange(date, dateString) {
      console.log(date, dateString);
    }
    const [notestab,setNotestab]=useState(false);
    function HandleNotestab(){
        setNotestab(!notestab);
    }
  return (
    <div>
        <div className=''>
        <TaskWriter/>
  

     {/* <div className='flex justify-center'>
        <div onClick={HandleNotestab}
            class="cursor-pointer w-fit p-1 bg-green-500 border border-gray-200 rounded-lg shadow hover:bg-green-400   dark:hover:bg-gray-700"
          >
            <h5 class="mb-0.5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center">
              <IoMdAdd size={50} />
            </h5>
            <h1 class="text-md font-bold text-black ">
              Task
            </h1>
          </div>
          </div> */}
    <div className='pt-2 text-orange-500 font-bold text-xl flex justify-center'>My Tasks</div>
    <div className="w-full flex justify-center mx-2 my-2">
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
          <div className='sm:w-full lg:max-w-7xl md:max-w-6xl flex justify-center overflow-x-scroll overflow-y-scroll'>
          <div class="shadow-md sm:rounded-lg">
    <table class="text-gray-500">
        <thead class="text-gray-700 uppercase">
        <tr>
                <th scope="col" class="lg:px-5 px-1 py-3 bg-gray-50 ">
                   Title 
                </th>
                <th scope="col" class="lg:px-5 px-1 py-3">
                    info
                </th>
                <th scope="col" class="lg:px-5 px-1 py-3 bg-gray-50 ">
                    Start
                </th>
                <th scope="col" class="lg:px-5 px-1 py-3">
                    End
                </th>
                <th scope="col" class="lg:px-5 px-1 py-3">
                    status
                </th>
            </tr>
             </thead>
             <tbody>
        {/* "tasktitle" : form.tasktitle ,
                    "taskdescrp" : form.taskdescrp,
                    "stratdate": stratdate,
                    "taskenddate":taskenddate,
                    "taskstarttime":taskstarttime,
                    "taskendtime":taskendtime, */}
        {searchTicketList.length > 0 ? (
                  searchTicketList
                    .slice(0)
                    .reverse()
                    .map((val,ind) => {
                      return 
                      <tr class="border-b border-gray-200 ">
                      <th scope="row" class="lg:px-5 px-1 py-1 lg:py-4 md:px-2 md:py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white">
                      {val.tasktitle}
                      </th>
                      <td class="lg:px-5 px-1 py-1 lg:py-4 md:px-2 md:py-2">
                         {val.taskdescrp}
                      </td>
                      <td class="lg:px-5 px-1 py-1 lg:py-4 md:px-2 md:py-2 bg-gray-50 ">
                      {val.stratdate}
                      </td>
                      <td class="lg:px-5 px-1 py-1 lg:py-4 md:px-2 md:py-2">
                      {val.taskenddate}
                      </td>
                  </tr>
             }) ):
             <div className={`${styles.defaultColor} text-black pt-4`}>Create New Tasks to add it in your Page.</div>
 } 
        </tbody>
    </table>
</div>

</div>
          </div>
    </div>
  );
}

export default Tasks;