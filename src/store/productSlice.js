import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({category,search,page=1,limit=10}) => {
    let url = `https://dummyjson.com/products`
    const skip = (page-1)*10;
    if(search){
      // console.log("category",category,"search",search,"page",page,"limit",limit)
      const res = await fetch(`${url}/search?q=${search}`)
      const data = await res.json()
      let newProduct = []
      if(category && category !== "ALL"){
        newProduct =  data.products.filter((product) => product.category === category)
      }else{
        newProduct = data.products
      }
      const total = newProduct.length
      newProduct = newProduct.slice(skip,skip+10)
      // console.log("Fetch data: ", newProduct)
      return {products:  newProduct,skip,total,limit}
    }else{
      if (category && category !== 'All') {
        url += `/category/${category}`
      }
      url += `?limit=${limit}&skip=${skip}`
      const res = await fetch(url)
    const data = await res.json()
    return data
    }
  }
)

const initialState = {
  products: [],
  skip:0,
  total:0,
  limit:10,
  isLoading: false,
};

export const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })  
      .addCase(fetchProducts.fulfilled, (state, action) => {
        // console.log("Action: ",action)
        state.products = action.payload.products 
        state.total = action.payload.total
        state.skip = action.payload.skip
        state.limit = action.payload.limit
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;  
      }); 
  },
});

export default ProductSlice.reducer
