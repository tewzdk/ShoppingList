import { createSlice } from '@reduxjs/toolkit';

export const groceriesSlice = createSlice({
  name: 'groceries',
  initialState: {
    shoppinglist: [],
    hintlist: []
  },
  reducers: {
    setShoppingList: (state, action) => {
      state.shoppinglist = action.payload;
    },
    setHintList: (state, action) => {
      state.hintlist = action.payload;
    },
  },
});

export const {setShoppingList, setHintList} = groceriesSlice.actions;

export const shoppingListState = (state) => state.groceries.shoppinglist;
export const hintListState = (state) => state.groceries.hintlist;

export default groceriesSlice.reducer;
