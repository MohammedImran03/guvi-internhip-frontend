import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import userRegestrationSlice from "./Components/Signup/UserRegister.Slice";
import loginReducer from "./Components/Login/Login.Slice";
import { userReducer } from "./Redux/reducer/user";
import tempnotesSlice from "./Components/Notes/Notes.Slice";
import ticketsReducer from "./Components/Mynotes/Mynotes.Slice";
import tempTaskSlice from "./Components/Tasks/Task.Slice";
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

  const reducer=combineReducers({
    registration:userRegestrationSlice,
    login:loginReducer,
    user: userReducer,
    tempnotes:tempnotesSlice,
    Usernotes: ticketsReducer,
    tasks:tempTaskSlice,
  });

  const persistedReducer = persistReducer(persistConfig, reducer)
const store = configureStore({
	reducer: persistedReducer,
});

export default store;