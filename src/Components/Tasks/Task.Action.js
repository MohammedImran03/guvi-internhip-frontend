import {createTaskNote,getusersAllNotes} from '../../api/Task.api';
import {tempTaskPending,openNewTaskFail,openNewTaskSuccess,fetchuserTicketLoading,fetchuserticketlistSuccess,
  fetchuserTicketFail} from './Task.Slice';

export const openNewTicket = (frmData) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch(tempTaskPending());
        const result = await createTaskNote(frmData);
        if (result.success === false) {
          return dispatch(openNewTaskFail(result.message));
        }
        dispatch(openNewTaskSuccess(result.message));
      } catch (error) {
        console.log(error);
        dispatch(openNewTaskFail(error.message));
      }
    });
  };

  export const fetchusersAllNotes = (formData) => async (dispatch) => {
    dispatch(fetchuserTicketLoading());
    try {
      const result = await getusersAllNotes(formData);
      result.data.result.length &&
        dispatch(fetchuserticketlistSuccess(result.data.result));
    } catch (error) {
      dispatch(fetchuserTicketFail(error.message));
    }
  };