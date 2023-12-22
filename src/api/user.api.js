import axios from "axios";
import { server } from "../server";

const usersigninapi = server + "/user/user-Sign-up";
const userloginapi = server + "/user/user-Sign-In";

export const userRegistration = (values) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(usersigninapi, values);
        resolve(res.data);
        if (res.data.success === true) {
          resolve(res.data);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  export const userLogin = (frmData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(userloginapi, frmData, { withCredentials: true });
        resolve(res.data);
        if (res.data.success === true) {
          resolve(res.data);
        }
        console.log(res);
      } catch (error) {
        reject(error);
      }
    });
  };