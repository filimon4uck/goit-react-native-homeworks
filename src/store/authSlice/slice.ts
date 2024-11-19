import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../types/UserType";

export interface UserState {
  userInfo: UserData | null;
}
const initialState: UserState = {
  userInfo: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserState["userInfo"]>) {
      state.userInfo = action.payload;
    },

    removeUserInfo(state) {
      state.userInfo = null;
    },
  },
});

export const { setUserInfo, removeUserInfo } = userSlice.actions;

export default userSlice.reducer;
