import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "../../utils/api";

const initialState = {
  items: [],
  status: "",
};

export const getIngredientsData = createAsyncThunk(
  "ingredients/fetch",
  async () => {
    const res = await getIngredients();
    return res.data;
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = "load";
        state.items = [];
      })
      .addCase(getIngredients.fulfilled, (state, actions) => {
        state.status = "complete";
        state.items = actions.payload;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export default ingredientsSlice.reducer;
