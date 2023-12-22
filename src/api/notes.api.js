import axios from "axios";
import { server } from "../server";

const newnoteapi = server + "/notes/create-notes";
const usersnotes = server + "/notes/user-notes/";
const specificticketUrl = server + "/notes/get_notes/";
const Updatenotesurl = server + "/notes/update-notes/";
const notedeleteapi = server + "/notes/deleteproduct/";

export const createNewNote = (frmData) => {
    console.log("from api", frmData);
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.post(newnoteapi, frmData, {
        //   headers: {
        //     Authorization: sessionStorage.getItem("accessJWT"),
        //   },
        });
        console.log(result);
        resolve(result.data);
      } catch (error) {
        // console.log(error);
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

  export const getSingleTicket = (_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        // const frmData = await Object.assign({  "userId" :  });
        // console.log(frmData);
        const result = await axios.get(specificticketUrl + _id, {
          headers: {
            userid: localStorage.getItem("userId").replace(/^"|"$/g, ''),
          },
        });
        resolve(result);
        // console.log(result);
      } catch (error) {
        // console.log(error.message);
        reject(error);
      }
    });
  };

  export const updateReplyTicket = (_id, msgObj) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.put(Updatenotesurl + _id, msgObj, {
          // headers: {
          //   Authorization: sessionStorage.getItem("accessJWT"),
          // },
        }); 
        resolve(result.data);
      } catch (error) {
        // console.log(error.message);
        reject(error);
      }
    });
  };