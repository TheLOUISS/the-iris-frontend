import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  lowStock: 0,
  category: [],
};

export const createProduct = createAsyncThunk(
    "products/create",
    async (formData, thunkAPI) => {
      try {
        return await productService.createProduct(formData);
      } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
);

export const getProducts = createAsyncThunk(
    "products/getAll",
    async (_, thunkAPI) => {
      try {
        return await productService.getProducts();
      } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
);

export const deleteProduct = createAsyncThunk(
    "products/delete",
    async (id, thunkAPI) => {
      try {
        return await productService.deleteProduct(id);
      } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
);

export const getProduct = createAsyncThunk(
    "products/getProduct",
    async (id, thunkAPI) => {
      try {
        return await productService.getProduct(id);
      } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
);

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, formData }, thunkAPI) => {
      try {
        return await productService.updateProduct(id, formData);
      } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
);

export const updateProductQuantity = createAsyncThunk(
    "products/updateQuantity",
    async ({ id, quantity }, thunkAPI) => {
      try {
        await productService.updateProductQuantity(id, quantity);
        const updatedProducts = await productService.getProducts();
        thunkAPI.dispatch(CALC_OUTOFSTOCK(updatedProducts));
        return updatedProducts;
      } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const products = action.payload;
      const totalValue = products.reduce(
          (acc, curr) => acc + curr.price * curr.quantity,
          0
      );
      state.totalStoreValue = totalValue;
    },
    CALC_OUTOFSTOCK(state, action) {
      const products = action.payload;
      state.outOfStock = products.filter((product) => product.quantity == 0).length;
    },
    CALC_LOWSTOCK(state, action) {
      const products = action.payload;
      state.lowStock = products.filter(
          (product) => product.quantity >= 1 && product.quantity <= 5
      ).length;
    },
    CALC_CATEGORY(state, action) {
      const products = action.payload;
      const categories = products.map((product) =>
          product.category.toLowerCase()
      );
      state.category = Array.from(new Set(categories));
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(createProduct.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createProduct.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.products.push(action.payload);
          toast.success("Produto adicionado com sucesso", {
            style: {
              whiteSpace: "nowrap",
            },
          });
        })
        .addCase(createProduct.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload, {
            style: {
              whiteSpace: "nowrap",
            },
          });
        })
        .addCase(getProducts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.products = action.payload;
        })
        .addCase(getProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload, {
            style: {
              whiteSpace: "nowrap",
            },
          });
        })
        .addCase(deleteProduct.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          toast.success("Produto deletado com sucesso", {
            style: {
              whiteSpace: "nowrap",
            },
          });
        })
        .addCase(deleteProduct.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload, {
            style: {
              whiteSpace: "nowrap",
            },
          });
        })
        .addCase(getProduct.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getProduct.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.product = action.payload;
        })
        .addCase(getProduct.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload, {
            style: {
              whiteSpace: "nowrap",
            },
          });
        })
        .addCase(updateProduct.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          toast.success("Produto atualizado com sucesso", {
            style: {
              whiteSpace: "nowrap",
            },
          });
        })
        .addCase(updateProduct.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload, {
            style: {
              whiteSpace: "nowrap",
            },
          });
        })
        .addCase(updateProductQuantity.fulfilled, (state, action) => {
          const updatedProducts = action.payload;
          state.totalStoreValue = updatedProducts.reduce(
              (acc, curr) => acc + curr.price * curr.quantity,
              0
          );
          state.outOfStock = updatedProducts.filter(
              (product) => product.quantity == 0
          ).length;
          state.lowStock = updatedProducts.filter(
              (product) => product.quantity >= 1 && product.quantity <= 5
          ).length;
        });
  },
});

export const {
  CALC_STORE_VALUE,
  CALC_OUTOFSTOCK,
  CALC_LOWSTOCK,
  CALC_CATEGORY,
} = productSlice.actions;

export const selectIsLoading = (state) => state.product.isLoading;
export const selectProduct = (state) => state.product.product;
export const selectTotalStoreValue = (state) => state.product.totalStoreValue;
export const selectOutOfStock = (state) => state.product.outOfStock;
export const selectLowStock = (state) => state.product.lowStock;
export const selectCategory = (state) => state.product.category;

export default productSlice.reducer;