import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avt?: string;
  country?: string;
  address?: string;
  phone?: string;
  token?: string;
  role: number;
  birthday?: string;
}

export interface UserState {
  isLogin: boolean;
  userInfo: UserInfo;
}

const initialState: UserState = {
  isLogin: false,
  userInfo: {
    id: '',
    name: '',
    email: '',
    avt: '',
    country: '',
    address: '',
    phone: '',
    token: '',
    role: 1,
    birthday: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.isLogin = true;
      state.userInfo = action.payload.userInfo;
    },
    logout: state => {
      state.isLogin = false;
      state.userInfo = {
        id: '',
        name: '',
        email: '',
        avt: '',
        country: '',
        address: '',
        phone: '',
        token: '',
        role: 1,
        birthday: '',
      };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
