import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [],
  },
  reducers: {
    setEvents: (state, action) => {
      //const temp = state.events.concat(action.payload);
      //temp.filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t) === JSON.stringify(v)))===i)
      //temp.sort((a, b) => (a.time > b.time) ? 1 : -1)
      //state.events = Array.from(new Set(temp.map(JSON.stringify))).map(JSON.parse);
      state.events = action.payload;
    },
  },
});

export const { setEvents } = calendarSlice.actions;

export const eventState = (state) => state.calendar.events;

export default calendarSlice.reducer;
