import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Species } from "../services/api";

const initialState: Species[] = [];

const speciesSlice = createSlice({
  name: "species",
  initialState,
  reducers: {
    itemAdded(state, action: PayloadAction<Species>) {
      state.push(action.payload);
    },
    itemRemoved(state, action: PayloadAction<Species>) {
      const index = state.findIndex((el) => el.url === action.payload.url);
      if (index > -1) {
        state.splice(index, 1);
      }
    },
    itemsClear(state) {
      state.splice(0, state.length);
    },
  },
});

export const { itemAdded, itemRemoved, itemsClear } = speciesSlice.actions;
export default speciesSlice.reducer;
