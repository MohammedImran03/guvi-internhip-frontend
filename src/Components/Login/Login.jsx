import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import logo from "../../Assests/Sitelogo/logo.png";
import toast, { Toaster } from 'react-hot-toast';
import {accessusertologin} from './Login.Action';
import { useSelector, useDispatch } from "react-redux";
import {clearerror} from "./Login.Slice";

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, isAuth, error } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({});
  function handleInput(e) {
    const {id,value}=e.target;
      const formCopy = {
        ...form,
        [id]: value,
      };
      setForm(formCopy);
    }

    function validatetextboxes() {
      // console.log(form);
      // if(error){
      //   toast.error(`${error}`);
      //  } 
      dispatch(accessusertologin(form));
    }
    function closetab(){
      dispatch(clearerror());
    }
  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        {error && 
         <div className="flex justify-center">
     <div id="alert-2" class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span class="sr-only">Info</span>
  <div class="ml-3 text-sm font-medium">
    {error}
  </div>
  <button onClick={closetab} type="button" class="ml-4 -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
    <span class="sr-only">Close</span>
    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
    </svg>
  </button>
</div>
</div> 
 } 
 <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 flex justify-center">
        <img src={logo} className="w-12 h-12 mr-2"/>
          Sign In  
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-300 py-8 px-4 sm:rounded-lg sm:px-10 shadow-md shadow-gray-400">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={form && form["email"]}
                  onChange={handleInput}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                id="password"
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={form && form["password"]}
                  onChange={handleInput}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <button
              onClick={validatetextboxes}
                className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
               {isLoading? <div role="status">
    <svg aria-hidden="true" class="w-6 h-6  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div> : "Sign in" }
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full justify-between`}>
            <div className="text-sm">
                <a
                  href=".forgot-password"
                  className=" text-blue-600 hover:text-blue-500"
                >
                  {/* Forgot your password? */}
                </a>
              </div>
              <div className={`${styles.noramlFlex}`}>
              <h4>New User?</h4>
              <Link to="/sign-up" className="text-blue-600  hover:text-blue-500 pl-1">
                Sign Up
              </Link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;