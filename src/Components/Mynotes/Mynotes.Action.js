import {getusersAllNotes,getSingleTicket,updateReplyTicket} from "../../api/notes.api";
import {
  fetchuserTicketLoading,
  fetchuserticketlistSuccess,
  fetchuserTicketFail,
  searchTickets,
  fetchSingleTicketLoading,
  fetchSingleTicketSuccess,
  fetchSingleTicketFail,
  replyTicketLoading,
  replyTicketSuccess,
  replyTicketFail,
  deletenoteLoading,
  deleteTicketSuccess,
 deletenotefail, 
  } from './Mynotes.Slice';
import {tempnotesInputvalues,prventsavenotes,tempnotesPending} from '../Notes/Notes.Slice';
import { server } from "../../server";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

export const fetchusersAllNotes = (formData) => async (dispatch) => {
    dispatch(fetchuserTicketLoading());
    try {
      const result = await getusersAllNotes(formData);
    //   console.log(result);
      result.data.result.length &&
        dispatch(fetchuserticketlistSuccess(result.data.result));
    } catch (error) {
      dispatch(fetchuserTicketFail(error.message));
    }
  };

// export const fetchusersSearchNotes = (formData) => async (dispatch) => {
//     dispatch(fetchuserTicketLoading());
//     try {
//       const result = await getusersAllNotes(formData);
//     //   console.log(result);
//       result.data.result.length &&
//         dispatch(fetchuserticketlistSuccess(result.data.result));
//     } catch (error) {
//       dispatch(fetchuserTicketFail(error.message));
//     }
//   };

//Actions for single ticket only
export const fetchSingleTicket = (_id) => async (dispatch) => {
    dispatch(fetchSingleTicketLoading());
    dispatch(tempnotesPending());
    try {
      const result = await getSingleTicket(_id);
       console.log(result);
      dispatch(
        fetchSingleTicketSuccess(
          result.data.result.length && result.data.result[0]
        )
      );
      dispatch(tempnotesInputvalues(result.data.result.length && result.data.result[0].notes));
      dispatch(prventsavenotes(result.data.result.length && result.data.result[0].notes));
    } catch (error) {
      dispatch(fetchSingleTicketFail(error.message));
    }
  };

    //Actions for replying on single ticket
export const replyOnTicket = (_id, msgObj) => async (dispatch) => {
  dispatch(replyTicketLoading());
  try {
    const result = await updateReplyTicket(_id, msgObj);
    if (result.status === "error") {
      return dispatch(replyTicketFail(result.message));
    }
    dispatch(replyTicketSuccess(result.message));
    // setTimeout(()=>{
    //   window.location.reload();
    // },1000);
  } catch (error) {
    console.log(error.message);
    dispatch(replyTicketFail(error.message));
  }
};

export const deleteProduct=(reqobj)=>async (dispatch)=>{
  dispatch(deletenoteLoading());
  try {
     await axios.post(server + "/notes/deleteproduct/"+reqobj);
     dispatch(deleteTicketSuccess);
     toast.success('Note deleted Successfully 👍')
    //  setTimeout(()=>{
      // window.location.href='/my-notes';
    // },1000);
  } catch(error){
     console.log(error);
     dispatch(deletenotefail(error.message))
  }
}

export const deleteProductfromeditorpage=(reqobj)=>async (dispatch)=>{
  dispatch(deletenoteLoading());
  try {
     await axios.post(server + "/notes/deleteproduct/"+reqobj);
     dispatch(deleteTicketSuccess);
     toast.success('Note deleted Successfully 👍')
     setTimeout(()=>{
      window.location.href='/my-notes';
    },1000);
  } catch(error){
     console.log(error);
     dispatch(deletenotefail(error.message))
  }
}