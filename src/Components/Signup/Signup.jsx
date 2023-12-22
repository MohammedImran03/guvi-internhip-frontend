import { React, useState} from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link,useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import {registerValidation} from "../../middlewares/singupformvalidate.middleware";
import toast, { Toaster } from 'react-hot-toast';
import EmptyAvatar from "../../Assests/avatar/EmptyAvatar.jpg";
import signupbg from "../../Assests/sigupBG/Sign-up.webp";
import { useDispatch, useSelector } from "react-redux";
import {newUserRegistration} from "./userRegister.Ation";
import {clearresponse} from "./UserRegister.Slice";
const Signup = () => {
     const dispatch=useDispatch();
      const { isLoading, status, response } = useSelector(
       (state) => state.registration
       );
    const [visible, setVisible] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const navigate=useNavigate();
    const handleFileInputChange = (e) => {
        const reader = new FileReader();
    
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatar(reader.result);
          }
        };
    
        reader.readAsDataURL(e.target.files[0]);
      };    
    const formik = useFormik({
        initialValues : {
          name:'',
          email: '',
          password: '',
        },
        validate : registerValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values => {
          // if(avatar != " "){
          //   values = await Object.assign(values, { avatar : avatar || ''});
          // }
          // console.log(values);
          dispatch(newUserRegistration(values));
          // if(response){
            // setTimeout(()=>{
            //   navigate("/sign-in");
            // },2000);
          // }
        }
      });
      function clearresponsetab(){
        dispatch(clearresponse());
      }
  // const onUpload = async e => {
  //   const base64 = await convertToBase64(e.target.files[0]);
  //   setAvatar(base64);
  // }
  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-center py-8 sm:px-6 lg:px-8" >
         <Toaster position='top-center' reverseOrder={false}></Toaster>
         {response &&
          <div className="flex justify-center">
<div id="alert-2" class={`flex items-center p-4 mb-4 ${status === "success" ? "text-teal-800 dark:text-teal-400 dark:bg-teal-600 bg-teal-100": "text-red-800 dark:text-red-400 dark:bg-red-600 bg-red-100"}  rounded-lg`} role="alert">
  <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span class="sr-only">Info</span>
  <div class="ml-3 text-sm font-medium">
  {response}
  </div>
  <button onClick={clearresponsetab} type="button" class={`ml-4 -mx-1.5 -my-1.5 ${status === "success" ? "bg-teal-100 text-teal-500 focus:ring-teal-400 p-1.5 hover:bg-teal-200 dark:text-teal-400" : "bg-red-100 text-red-500 focus:ring-red-400 p-1.5 hover:bg-red-200 dark:text-red-400"}  rounded-lg focus:ring-2  inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800  dark:hover:bg-gray-700`} data-dismiss-target="#alert-2" aria-label="Close">
    <span class="sr-only">Close</span>
    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
    </svg>
  </button>
</div>
</div>
}
         
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-1 text-center text-2xl font-bold text-gray-900">
          Register to Create Account
        </h2>
      </div>
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className=" py-6 px-4 shadow sm:rounded-lg sm:px-10bg-no-repeat bg-cover" style={{backgroundImage: `url(${signupbg})`}}>
        <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className="text-2xl md:text-3xl font-semibold mb-2 text-black">Persoal Information</div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
            <div>
              <label
                htmlFor="name"
                className="block text-md font-medium text-black"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                placeholder="Eg: John"
                  id="name"
                  type="text"
                  name="text"
                  {...formik.getFieldProps('name')} 
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            {/* <div>
              <label
                htmlFor="mobile"
                className="block text-md font-medium text-white"
              >
                Mobile Number
              </label>
              <div className="mt-1">
                <input
                placeholder="+91 "
                  id="mobile"
                  type="tel"
                  maxlength="10"
                  pattern="[0-9]{10}"
                  name="text"
                  {...formik.getFieldProps('mobile')} 
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div> */}
            <div>
              <label
                htmlFor="email"
                className="mt-1 block text-md font-medium text-black"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                placeholder="@gmail.com"
                  type="email"
                  name="email"
                  {...formik.getFieldProps('email')} 
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="mt-1 block text-md font-medium text-black"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  {...formik.getFieldProps('password')} 
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

            </div>

            {/* <div className="flex justify-center mt-2">
              <label
                htmlFor="avatar"
                className="block text-md font-medium text-white"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-20 w-20 rounded-full overflow-hidden my-3">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <img
                    src={EmptyAvatar}
                    alt="avatar"
                    className="h-full w-full object-cover rounded-full"
                  />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-3 flex items-center justify-center px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload Profile</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div> */}

            <div className="flex justify-center">
              <button
                type="submit"
                className="group relative flex justify-center py-2 px-4 border border-transparent text-sm md:text-2xl font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                // disabled={status === "success"}
              >
                {isLoading? <div role="status">
    <svg aria-hidden="true" class="w-8 h-8  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div> : "Sign Up" }
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full justify-center mt-2`}>
              <h4 className="text-black">Already have an account?</h4>
              <Link to="/sign-in" className="text-blue-600 pl-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup;