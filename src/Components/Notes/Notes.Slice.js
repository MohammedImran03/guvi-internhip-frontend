import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  status: "",
  notes: "",
  noteinput:"",
  editnotes:"",
  previousnotevalues:"",
  miniscreen:false,
  readnotes:"",
};

const tempnotesSlice = createSlice({
  name: "tempSlice",
  initialState,
  reducers: {
    miniscreenactivation: (state) => {
      state.miniscreen = true;
    },
    miniscreendeactivate: (state) => {
      state.miniscreen = false;
    },
    tempnotesPending: (state) => {
      state.isLoading = true;
      state.notes = "";
      state.previousnotevalues = "";
    },
    tempnotesInputvalues: (state, { payload }) => {
        state.isLoading = false;
        state.noteinput = "success";
        state.notes = payload;
      },
    tempnotesEditedvalues: (state, { payload }) => {
        state.editnotes = payload;
      },
    prventsavenotes: (state, { payload }) => {
        state.previousnotevalues = payload;
    },
    cleartempnotesinputandprventnotessave: (state) => {
      state.noteinput = "";
      state.notes = "";
      state.previousnotevalues = "";
      state.editnotes = "";
    },
    cleareditnotestopreventbug: (state) => {
      state.editnotes = "";
    },
    tempnotesgetvalues: (state, { payload }) => {
      state.isLoading = false;
      state.noteinput = "success";
      state.notes = payload;
    },
    tempnotesError: (state, { payload }) => {
      state.isLoading = false;
      state.status = "error";
      state.notes = payload;
    },
    clearresponse: (state) => {
      state.notes = "";
    },
    DeleteComplete: (state) => {
      state.isLoading = false;
      state.notes="";
    },
    openNewNoteSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload;
      state.notes="";
    },
    clearallstate: (state) => {
      state.isLoading = false;
      state.status = "";
      state.notes="";
      state.noteinput = "";
    },
    clearStatus: (state) => {
      state.status = "";
    },
    openNewNoteFail: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload;
    },
  },
});

const { reducer, actions } = tempnotesSlice;

export const {
  tempnotesPending,
  tempnotesInputvalues,
  tempnotesgetvalues,
  tempnotesError,
  clearresponse,
  DeleteComplete,
  openNewNoteSuccess,
  openNewNoteFail,
  clearStatus,
  clearallstate,
  tempnotesEditedvalues,
  prventsavenotes,
  cleartempnotesinputandprventnotessave,
  miniscreenactivation,
  miniscreendeactivate,
  cleareditnotestopreventbug,
} = actions;

export default reducer;