import { loginPending, loginSuccess, loginFail,Putuserdata } from "./Login.Slice";
import { userLogin} from "../../api/user.api";
import toast from 'react-hot-toast';

export const accessusertologin = (values) => async (dispatch) => {
    dispatch(loginPending());
    try {
      const isAuth = await userLogin(values);
      if (isAuth.success === false) {
        return dispatch(loginFail(isAuth.message));
      }
      if(isAuth.success === true){
        dispatch(loginSuccess());
        toast.success('Log in Success')
        // console.log(isAuth.data)
        dispatch(Putuserdata(isAuth.data));
        console.log(isAuth);
        localStorage.setItem('userId',  JSON.stringify(isAuth.data._id));
         window.location.href="/my-notes";
      } 
    } catch (error) {
        if(error.response){
      dispatch(loginFail(error.response.data.message));
        }else{
            dispatch(loginFail(`${error.message}, Please Try again later`));
        }
    }
  };

//   export const newUserRegistration = (values) => async (dispatch) => {
//     try {
//       dispatch(registrationPending());
//       const result = await userRegistration(values);
//       result.success === true
//         ? dispatch(registrationSuccess(result.message))
//         : dispatch(registrationError(result.response.data.message));
//     } catch (error) {
//       if(error.response){
//         dispatch(registrationError(error.response.data.message)); 
//       }
//       else{
//      dispatch(registrationError(`${error.message}, Please Try again later`));
//       }
//     }
//   };
  

