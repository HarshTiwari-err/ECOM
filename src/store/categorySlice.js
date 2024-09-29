import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const res = await fetch(`https://dummyjson.com/products/category-list`)
    const data = await res.json()
    return data
  }
)

const initialState = {
  category: [],
  isLoading: false,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true
    }).addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false
      state.category = action.payload
    })
  },
});

export default categorySlice.reducer
