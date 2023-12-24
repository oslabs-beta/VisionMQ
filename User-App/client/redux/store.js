import { configureStore } from '@reduxjs/toolkit';
import metricReducer from './metricReducer';
import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension';

export default store = configureStore({
  devTools: true,
  reducer: {
    metric: metricReducer,
  },
});
