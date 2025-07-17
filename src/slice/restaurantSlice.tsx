import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  image: string;
  time_open: string;
  time_close: string;
  rate: number;
  star: number;
}

export interface RestaurantState {
  restaurants: Restaurant[];
}

const initialState: RestaurantState = {
  restaurants: [],
};

const locationSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurant: (state, action: PayloadAction<Restaurant[]>) => {
      state.restaurants = action.payload;
    },
    clearRestaurant: state => {
      state.restaurants = [];
    },
    addRestaurant: (state, action: PayloadAction<Restaurant>) => {
      state.restaurants.push(action.payload);
    },
    removeRestaurant: (state, action: PayloadAction<string>) => {
      state.restaurants = state.restaurants.filter(
        restaurant => restaurant.id !== action.payload,
      );
    },
  },
});

export const {
  setRestaurant,
  clearRestaurant,
  addRestaurant,
  removeRestaurant,
} = locationSlice.actions;

export default locationSlice.reducer;
