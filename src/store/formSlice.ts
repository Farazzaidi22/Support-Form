import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormData } from "../types/types";

const formSlice = createSlice({
  name: "form",
  initialState: { data: null as FormData | null },
  reducers: {
    saveFormData: (state, action: PayloadAction<FormData>) => {
      state.data = action.payload;
    },
  },
});

export const { saveFormData } = formSlice.actions;
export default formSlice.reducer;
