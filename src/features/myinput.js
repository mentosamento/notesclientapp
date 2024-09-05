import { createSlice } from "@reduxjs/toolkit";

export const myinputSlice = createSlice({
    name: "myinput",
    initialState: { value: 
        {
         title: "hey",
         body: "",
         creating: false,
         selected: -1,
         mynotes: []
        }
    },
    reducers: {
        changeTitle: (state, action) => {
            state.value.title = action.payload;
        },
        changeBody: (state, action) => {
            state.value.body = action.payload;
        },
        changeCreating: (state, action) => {
            state.value.creating = action.payload;
        },
        changeSelected: (state, action) => {
            state.value.selected = action.payload;
        },
        incrementSelected: (state, action) => {
            state.value.selected = state.value.selected + 1;
        },
        decrementSelected: (state, action) => {
            if (state.value.selected - 1 >= 0) {
                state.value.selected = state.value.selected - 1;
                
            } else {
                if (state.value.mynotes.length == 0) {
                    
                }
                else {
                    state.value.selected = -1;
                    
                }
                
            }
            state.value.creating = false;
        },
        appendNotes: (state,action) => {
            state.value.mynotes.unshift(action.payload);
        },
        changeNotes: (state,action) => {
            state.value.mynotes = action.payload
        },
        editNotes: (state, action) => {
            state.value.mynotes[action.payload.index] = action.payload.data
        },
        removeNotes: (state, action) => {
            state.value.mynotes.splice(action.payload, 1);
        }

        
    }
})

export const {changeBody, changeTitle, changeCreating, changeSelected, appendNotes, changeNotes, incrementSelected, editNotes, removeNotes, decrementSelected} =  myinputSlice.actions;
export default myinputSlice.reducer;
