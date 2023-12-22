import React,{useEffect, useState} from 'react'
import { DatePicker,  Space, TimePicker, Input  } from 'antd';
import  { Dayjs } from 'dayjs';
import toast, { Toaster } from 'react-hot-toast';
import {useSelector,useDispatch } from "react-redux";
import {clearStatus} from './Task.Slice';
import {openNewTicket} from './Task.Action';
const TaskWriter = () => {
    const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
    const [stratdate,setStartdate]=useState('Not Mentioned');
    const [taskenddate,setTaskenddate]=useState('Not Mentioned');
    const [taskstarttime,setTaskstarttime]=useState('Not Mentioned');
    const [taskendtime,setTaskendtime]=useState('Not Mentioned');
    const dispatch=useDispatch();
    const { isAuth,userdata } = useSelector((state) => state.login);
    const { isLoadingtask,taskstatus } = useSelector((state) => state.tasks);
    function onChangestartDate(date, dateString) {
      setStartdate(dateString);
    }
    function onChangeendDate(date, dateString) {
        setTaskenddate(dateString);
      }
    const onChangeStartTime = (time: Dayjs, timeString: string) => {
        setTaskstarttime(timeString);
      };
      const onChangeendTime = (time: Dayjs, timeString: string) => {
        setTaskendtime(timeString);
      };
      const [form, setForm] = useState({});
      function handleInput(e) {
        if (e) {
          const formCopy = {
            ...form,
            [e.target.id]: e.target.value,
          };
          setForm(formCopy);
        // console.log(form);
        }
      }
     async function HandleTaskSubmit(){
        if(form.tasktitle || form.taskdescrp){
            if(stratdate!=='Not Mentioned' || taskenddate!=='Not Mentioned' ||
             taskstarttime!=='Not Mentioned' || taskendtime!=='Not Mentioned'){
                const values = await Object.assign({  
                    "userId" : userdata._id ,
                    "tasktitle" : form.tasktitle ,
                "taskdescrp" : form.taskdescrp,
                "stratdate": stratdate,
                "taskenddate":taskenddate,
                "taskstarttime":taskstarttime,
                "taskendtime":taskendtime,
            });
            dispatch(openNewTicket(values));
            console.log(values);
            if(taskstatus.length){
              toast.success(taskstatus);
              setTimeout(()=>{
                dispatch(clearStatus());
              },5000);
          }
            setForm('');
            setStartdate('Not Mentioned');
            setTaskenddate('Not Mentioned');
            setTaskstarttime('Not Mentioned');
            setTaskendtime('Not Mentioned');
            }else{
                const formvalues = await Object.assign({  
                    "userId" : userdata._id ,
                    "tasktitle" : form.tasktitle ,
                    "taskdescrp" : form.taskdescrp,
                    "stratdate": stratdate,
                    "taskenddate":taskenddate,
                    "taskstarttime":taskstarttime,
                    "taskendtime":taskendtime,
            });
            dispatch(openNewTicket(formvalues));
                console.log(formvalues);
                     if(taskstatus.length){
            toast.success(taskstatus);
            setTimeout(()=>{
              dispatch(clearStatus());
            },5000);
        }
       
             
                setForm('');
                setStartdate('Not Mentioned');
                setTaskenddate('Not Mentioned');
                setTaskstarttime('Not Mentioned');
                setTaskendtime('Not Mentioned');
            }
                
        }
        // if(taskstatus.length){
        //   toast((t) => (
        //     <span>
        //       ✅{taskstatus}
        //       <button onClick={() => dispatch(clearStatus())
        //       }
        //       >
        //         ❌
        //       </button>
        //     </span>
        //   ));
        // }
      }
      function ClearTasknotes(){
        setForm('');
        setStartdate('Not Mentioned');
        setTaskenddate('Not Mentioned');
        setTaskstarttime('Not Mentioned');
        setTaskendtime('Not Mentioned');
        toast('Info Cleared!', {
            icon: '🧹',
          });
      }
    //   useEffect(()=>{
    //      if(form)
    //   },[]);
  return (
    <div className='px-3 py-1 w-full'>
          <Toaster position='top-center' reverseOrder={false}></Toaster>
        {/* <div className='flex justify-center text-red-500 font-bold  text-md md:text-lg'>New Task</div> */}
        <div className='flex justify-center '>
            <div className='w-fit bg-slate-400 py-2 px-1 rounded-md'>
                    <div className='flex:none grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-2 lg:gap-3 md:p-2 sm:gap-1  text-center'>
                    <div>
                    <div>
                        <label for="tasktitle" class="flex justify-start mb-0.5  text-sm md:text-md font-medium  text-red-700 ">Title</label>
                        <input type="text" name="tasktitle" id="tasktitle" 
                          value={form && form["tasktitle"]}
                          onChange={handleInput}
                        class="bg-gray-50 border border-gray-300 text-red-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Task name"/>
            </div>
            <div className='mt-1'>
            <label for="taskdescrp" class="flex justify-start mb-0.5 text-sm md:text-md font-medium text-red-700 ">Task description</label>
            <textarea 
              value={form && form["taskdescrp"] }
              onChange={handleInput}
            class="resize-none rounded-md w-full h-full overflow-y-scroll" rows={5} id="taskdescrp" ></textarea>
            </div>
                    </div>
                    <div>
                    <div>
              <label for="taskstartdate" class="flex justify-start mb-0.5  text-sm md:text-md font-medium text-red-700 ">Start Date</label>
              <DatePicker onChange={onChangestartDate} className='flex justify-start'/>
              </div>
              <div>
              <label for="taskenddate" class="flex justify-start mb-0.5 text-sm md:text-md font-medium text-red-700 ">End Date</label>
              <DatePicker onChange={onChangeendDate} className='flex justify-start'/>
              </div>
              <div>
              <label for="taskstarttime" class="flex justify-start mb-0.5  text-sm md:text-md font-medium text-red-700 ">Start time</label>
              <TimePicker use24Hours onChange={onChangeStartTime} className='flex justify-start'/>
              </div>
              <div>
              <label for="taskendtime" class="flex justify-start mb-0.5  text-sm md:text-md font-medium text-red-700 ">End time</label>
              <TimePicker use24Hours onChange={onChangeendTime} className='flex justify-start'/>
              </div>
                    </div>
            </div>
           
            <div className='flex:none grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:gap-1 md:gap-1 lg:gap-1 lg:p-1 text-center'>
            </div>
         <div className='flex justify-center '>
            {form && 
         <button 
            onClick={ClearTasknotes}
            class="bg-yellow-400 hover:bg-yellow-300 text-white py-1 px-1 text-sm md:text-md font-medium border border-yellow-500 rounded mr-2">
                    Clear task
              </button>}
            <button 
            onClick={HandleTaskSubmit}
            class="bg-blue-700 hover:bg-blue-900 text-white py-1 px-1 text-sm md:text-md font-medium border border-blue-700 rounded">
                    Create task
              </button>
              </div>
            </div>
        </div>
        </div>
  )
}

export default TaskWriter;