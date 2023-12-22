import axios from "axios";
import { server } from "../server";

const newnoteapi = server + "/tasks/create-Task";
const usersnotes = server + "/tasks/task-notes/";

export const createTaskNote = (frmData) => {
    console.log("from api", frmData);
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.post(newnoteapi, frmData, {
        });
        console.log(result);
        resolve(result.data);
      } catch (error) {
        reject(error);
      }
    });
  };

  export const getusersAllNotes = (frmData) => {
    console.log(frmData);
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(usersnotes+frmData, {
          //   headers: {
          //     Authorization: sessionStorage.getItem("accessJWT"),
          //   },
          });
        //   console.log(usersnotes+frmData);
        // console.log(result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };