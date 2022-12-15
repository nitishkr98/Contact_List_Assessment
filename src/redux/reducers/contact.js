import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contactList: [],
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addContact: (state, action) => {
      return {
        ...state,
        contactList: [...state.contactList, action.payload],
      };
    },
    updateContact: (state, action) => ({
      ...state,
      contactList: [...action.payload],
    }),
  },
});

// Actions
export const { addContact, updateContact } = contactSlice.actions;

// Reducer
export default contactSlice.reducer;
