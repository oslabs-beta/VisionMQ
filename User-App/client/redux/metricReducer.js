import { createSlice } from '@reduxjs/toolkit';

export const metricSlice = createSlice({
  name: 'metric',
  initialState: {},
  reducers: {
    newFunction: (state, action) => {
        /** */
    },
  },
});

export {} from metricSlice.actions;

export default metricSlice.reducer;