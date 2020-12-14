import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import groceriesReducer from './slices/groceriesSlice';
import drinksReducer from './slices/drinksSlice';
import calendarReducer from './slices/calendarSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    groceries: groceriesReducer,
    drinks: drinksReducer,
    calendar: calendarReducer
  },
});
