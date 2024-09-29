import { configureStore } from '@reduxjs/toolkit';
import productReducer  from './productSlice';
import categoryReducer  from './categorySlice';
export default configureStore({
    reducer: {
      category : categoryReducer,
      products : productReducer
    },
});
