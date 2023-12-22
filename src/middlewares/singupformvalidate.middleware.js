import toast from 'react-hot-toast';

/** validate register form */
export async function registerValidation(values){
    const errors = !values.name && !values.mobile && !values.password && !values.email;
    usernameVerify(errors, values);
    emailVerify(errors, values);
    passwordVerify(errors, values);  
    return errors;
}


/** validate username */
function usernameVerify(error = {}, values){
    if(!values.name){
        error.name = toast.error('Username Required !');
    }
    return error;
}


/** validate password */
function passwordVerify(errors = {}, values){
    /* eslint-disable no-useless-escape */
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let count = 0;
    for (let i = 0; i <= values.password.length; i++) {
      if (values.password.indexOf(i) !== -1) {
        count = 1;
      }
    }
    if(!values.password){
        errors.password = toast.error("Password Required...!");
    } else if(values.password.includes(" ")){
        errors.password = toast.error("Invalid Password...!");
    }else if(values.password.length < 8){
        errors.password = toast.error("Password must be more than 8 characters long");
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must have some of these special characters ! @ # $ % ^ & * ( ) \ | { }");
    }else if(count === 0){
        errors.password = toast.error("Password must require atleast 1 number");
    }
    return errors;
}

/** validate email */
function emailVerify(error ={}, values){
    if(!values.email){
        error.email = toast.error("Email ID Required...!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong Email...!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }
    return error;
}