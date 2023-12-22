import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tickets: [],
    isLoading: false,
    error: "",
    selectedTicket: {},
    // ticketstatus:false,
    // ticketstatusmsg:"",
    // replyTicketError: "",
    searchTicketList: [],
    ticketreply:false,
    replyTicketError:"",
    replyMsg:"",

  };

const ticketListSlice = createSlice({
 name:'ticketlist',
 initialState,
 reducers:{
    fetchTicketLoading:(state)=>{
        state.isLoading = true;
    },
    deletenoteLoading:(state)=>{
      state.isLoading = true;
     },
     deleteTicketSuccess:(state)=>{
    state.isLoading = false;
    },
    deletenotefail: (state, { payload }) => {
      state.error = payload;
    },
    deleteallclear:(state)=>{
      state.isLoading = false;
      state.error = "";
      },
    fetchTicketSuccess:(state,action)=>{
        state.tickets = action.payload;
        state.isLoading = false;
    },
    fetchTicketFail: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      },
      searchTickets: (state, { payload }) => {
        state.searchTicketList = state.tickets.filter((row) => {
          if (!payload) return row;
          return row.title.toLowerCase().includes(payload.toLowerCase() || row.notes.toLowerCase().includes(payload.toLowerCase()));
        });
      },
      fetchSingleTicketLoading: (state) => {
        state.isLoading = true;
      },
      fetchSingleTicketSuccess: (state, { payload }) => {
        state.selectedTicket = payload;
        state.isLoading = false;
        state.error = "";
      },
      fetchSingleTicketFail: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      },
      fetchuserTicketLoading: (state) => {
        state.isLoading = true;
      },
      fetchuserticketlistSuccess: (state, { payload }) => {
        state.searchTicketList = payload;
        state.isLoading = false;
        state.error = "";
      },
      fetchuserTicketFail: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      },
      clearallnotestate: (state, { payload }) => {
        state.searchTicketList ="";
        state.isLoading = false;
        state.error = "";
        state.tickets="";
      },
      replyTicketLoading: (state) => {
        state.ticketreply = true;
      },
      replyTicketSuccess: (state, { payload }) => {
        state.ticketreply = false;
        state.replyTicketError = "";
        state.replyMsg = payload;
      },
      replyTicketFail: (state, { payload }) => {
        state.ticketreply = false;
        state.replyTicketError = payload;
      },
      clearreplymsg: (state) => {
        state.ticketreply = false;
        state.replyTicketError = "";
        state.replyMsg = "";
      },
 },
  });

  const { reducer, actions } = ticketListSlice;

  export const {
    fetchTicketLoading,
    fetchTicketSuccess,
    fetchTicketFail,
    searchTickets,
    fetchSingleTicketLoading,
  fetchSingleTicketSuccess,
  fetchSingleTicketFail,
  fetchuserTicketLoading,
  fetchuserticketlistSuccess,
  fetchuserTicketFail,
  clearallnotestate,
  replyTicketLoading,
  replyTicketSuccess,
  replyTicketFail,
  clearreplymsg,
  deletenoteLoading,
   deleteTicketSuccess,
  deletenotefail,
  } = actions;
  
  export default reducer;