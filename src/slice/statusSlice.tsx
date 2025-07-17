import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface StatusDetail {
  id: string;
  name: string;
  description: string;
  color: string;
  bgcolor: string;
}

export interface StatusInfo {
  list: StatusDetail[];
}

export interface StatusState {
  index: number;
  statusInfo: StatusInfo[];
}

const initialState: StatusState = {
  index: -1,
  statusInfo: [],
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    setStatusToIndex: (state, action: PayloadAction<StatusDetail[]>) => {
    //   console.log(action);

      state.statusInfo[state.index] = {
        list: action.payload,
      };
    //   console.log(state.statusInfo[state.index].list);
    },
  },
});

export const { setIndex, setStatusToIndex } = statusSlice.actions;
export default statusSlice.reducer;
