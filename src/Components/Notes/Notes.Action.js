import {
    tempnotesPending,
    tempnotesInputvalues,
    tempnotesgetvalues,
    tempnotesError,
    clearresponse,
    DeleteComplete,
    openNewNoteSuccess,
  openNewNoteFail
  } from './Notes.Slice';
import {createNewNote} from "../../api/notes.api";

export const openNewTicket = (frmData) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch(tempnotesPending());
        const result = await createNewNote(frmData);
        if (result.success === false) {
          return dispatch(openNewNoteFail(result.message));
        }
        dispatch(openNewNoteSuccess(result.message));
      } catch (error) {
        console.log(error);
        dispatch(openNewNoteFail(error.message));
      }
    });
  };

