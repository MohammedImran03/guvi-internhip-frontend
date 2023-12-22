import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingtask: false,
  taskstatus: false,
  error:'',
  searchTicketList: [],
  // tasktitle: "",
  // taskdescrp: "",
  // taskstartdate: "",
  // taskenddate: "",
  // taskstarttime: "",
  // taskendtime: "",
  // noteinput:"",
  // editnotes:"",
  // previousnotevalues:"",
  // miniscreen:false,
  // readnotes:"",
};

const tempTaskSlice = createSlice({
  name: "tempSlice",
  initialState,
  reducers: {
    // miniscreenactivation: (state) => {
    //   state.miniscreen = true;
    // },
    // miniscreendeactivate: (state) => {
    //   state.miniscreen = false;
    // },
    tempTaskPending: (state) => {
      state.isLoadingtask = true;
    },
    // tempnotestitleInputs: (state, { payload }) => {
    //     state.taskstatus = true;
    //     state.tasktitle = payload;
    //   },
    // tempnotesEditedvalues: (state, { payload }) => {
    //     state.editnotes = payload;
    //   },
    // prventsavenotes: (state, { payload }) => {
    //     state.previousnotevalues = payload;
    // },
    // cleartempnotesinputandprventnotessave: (state) => {
    //   state.noteinput = "";
    //   state.notes = "";
    //   state.previousnotevalues = "";
    //   state.editnotes = "";
    // },
    // cleareditnotestopreventbug: (state) => {
    //   state.editnotes = "";
    // },
    // tempnotesgetvalues: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.noteinput = "success";
    //   state.notes = payload;
    // },
    // tempnotesError: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.status = "error";
    //   state.notes = payload;
    // },
    // clearresponse: (state) => {
    //   state.notes = "";
    // },
    // DeleteComplete: (state) => {
    //   state.isLoading = false;
    //   state.notes="";
    // },
    openNewTaskSuccess: (state, { payload }) => {
      state.isLoadingtask = false;
      state.taskstatus = payload;
    },
    // clearallstate: (state) => {
    //   state.isLoading = false;
    //   state.status = "";
    //   state.notes="";
    //   state.noteinput = "";
    // },
    clearStatus: (state) => {
      state.taskstatus = "";
    },
    clearallnotestate: (state) => {
      state.taskstatus = "";
      state.searchTicketList = '';
      state.isLoadingtask= false;
      state.error = "";
    },
    openNewTaskFail: (state, { payload }) => {
      state.isLoadingtask = false;
      state.taskstatus = payload;
    },
    fetchuserTicketLoading: (state) => {
      state.isLoadingtask = true;
    },
    fetchuserticketlistSuccess: (state, { payload }) => {
      state.searchTicketList = payload;
      state.isLoadingtask= false;
      state.error = "";
    },
    fetchuserTicketFail: (state, { payload }) => {
      state.isLoadingtask = false;
      state.error = payload;
    },
  },
});

const { reducer, actions } = tempTaskSlice;

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
  tempTaskPending,openNewTaskFail,openNewTaskSuccess,
  fetchuserTicketLoading,fetchuserticketlistSuccess,
  fetchuserTicketFail,
  clearallnotestate,
} = actions;

export default reducer;