import { createSlice } from '@reduxjs/toolkit'
import { IMenuObject } from '@/routes/interface';
export interface IUserInitialState {
  role: string[];
  token: string;
  menuList: IMenuObject[];
  [key: string]: any;
}

const userInitialState: IUserInitialState = {
  role: [],
  token: '',
  menuList: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    setUserMenu: (state, action) => {
      state.menuList = action.payload
    }
  }
})

export const { setUserToken, setUserMenu } = userSlice.actions;

export default userSlice.reducer;