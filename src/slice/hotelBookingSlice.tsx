import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface HotelBookingRoom {
  id_room: string;
  name: string;
  price: number;
  numberOfRoom: string;
  image: string;
}

export interface HotelBookingService {
  id_service: string;
  name: string;
  price: number;
  quantity: number;
}

export interface HotelBooking {
  id: string;
  name: string;
  note: string;
  location: string;
  check_in_date: string;
  check_out_date: string;
  status: number;
  type: number;
  totalPriceRoom: number;
  totalPriceService: number;
  totalPrice: number;
  rooms: HotelBookingRoom[];
  services: HotelBookingService[];
  created_at: string;

  updated_at: string;
}

export interface HotelBookingState {
  isNeedFetchHotel: boolean;
  hotel_bookings: HotelBooking[];
}

const initialState: HotelBookingState = {
  isNeedFetchHotel: true,
  hotel_bookings: [],
};

const hotelBookingSlice = createSlice({
  name: 'hotelBooking',
  initialState,
  reducers: {
    setHotelBooking: (state, action: PayloadAction<HotelBooking[]>) => {
      state.isNeedFetchHotel = false;
      state.hotel_bookings = action.payload;
    },
    clearHotelBooking: state => {
      state.isNeedFetchHotel = true;
      state.hotel_bookings = [];
    },
    addHotelBooking: (state, action: PayloadAction<HotelBooking>) => {
      state.hotel_bookings.push(action.payload);
    },
    removeHotelBooking: (state, action: PayloadAction<string>) => {
      state.hotel_bookings = state.hotel_bookings.filter(
        hotel_booking => hotel_booking.id !== action.payload,
      );
    },
  },
});

export const {
  setHotelBooking,
  clearHotelBooking,
  addHotelBooking,
  removeHotelBooking,
} = hotelBookingSlice.actions;

export default hotelBookingSlice.reducer;
