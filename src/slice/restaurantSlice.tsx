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
  isLoadedRestaurant: boolean;
  restaurants: Restaurant[];
}

const initialState: RestaurantState = {
  isLoadedRestaurant: false,
  restaurants: [],
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurant: (state, action: PayloadAction<Restaurant[]>) => {
      state.isLoadedRestaurant = true;
      state.restaurants = action.payload;
    },
    clearRestaurant: state => {
      state.isLoadedRestaurant = false;
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
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
