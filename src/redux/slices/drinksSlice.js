import { createSlice } from '@reduxjs/toolkit';

export const drinksSlice = createSlice({
  name: 'drinks',
  initialState: {
    initiated: false,
    current: {
      total: 0,
      mydrinks: 0
    },
    history: []
  },
  reducers: {
    setCurrent: (state, action) => {
      state.current = {...state.current, mydrinks: action.payload};
    },
    addCurrent: (state) => {
      const newCurrent = state.current.mydrinks + 1;
      state.current = {...state.current, mydrinks: newCurrent};
    },
    removeCurrent: (state) => {
      const newCurrent = state.current.mydrinks - 1;
      state.current = {...state.current, mydrinks: newCurrent};
    },
    setTotal: (state, action) => {
      state.current = {...state.current, total: action.payload};
    },
    setInitiated: (state, action) => {
      state.initiated = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const {setCurrent, setInitiated, setTotal, addCurrent, removeCurrent, setHistory} = drinksSlice.actions;

export const currentDrinksState = (state) => state.drinks.current;
export const initiatedsState = (state) => state.drinks.initiated;
export const historyState = (state) => state.drinks.history;

export default drinksSlice.reducer;
