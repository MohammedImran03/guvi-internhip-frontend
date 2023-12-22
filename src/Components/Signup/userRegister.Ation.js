import {
    registrationPending,
    registrationSuccess,
    registrationError,
  } from "./UserRegister.Slice";
  
import { userRegistration} from "../../api/user.api";
  
  export const newUserRegistration = (values) => async (dispatch) => {
    try {
      dispatch(registrationPending());
      const result = await userRegistration(values);
      result.success === true
        ? dispatch(registrationSuccess(result.message))
        : dispatch(registrationError(result.response.data.message));
    } catch (error) {
      // console.log(error);
      if(error.response){
        dispatch(registrationError(error.response.data.message)); 
      }
      else{
     dispatch(registrationError(`${error.message}, Please Try again later`));
      }
    }
  };