import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk(
    'registration/getUser',
     async(url) => {
        const {data} = await axios.get(url);
        return data;
     }   
);

const initialState = {
    users: [],
    statusUser: '',
    dataInput: {},
    isUserFined: false,
    modalOpen: false
};

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        checkUser(state, action){
            state.dataInput = action.payload;
        },
        trigerModal(state, action){
            state.modalOpen = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, state => {
                state.statusUser = "loading"
            })
            .addCase(getUser.fulfilled,( state, action) => {
                state.statusUser = "idle";
                state.users = action.payload;
                const finedUser = state.users.filter(obj => (obj.name === state.dataInput.name)&&obj.password=== state.dataInput.password);
                if (finedUser.length > 0) {
                    state.isUserFined = true;
                    state.modalOpen = !state.modalOpen;
                }
            })
            .addCase(getUser.rejected, state => {
                state.statusUser = "error";
            })
            .addDefaultCase(()=>{})
    }
});


export const registrationSelector = (state => state.registration);
const {reducer, actions} = registrationSlice;
export const {checkUser, trigerModal} = actions;
export default reducer;