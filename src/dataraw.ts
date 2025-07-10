import { BookingHotelModel } from './models/BookingHotelModel';
import { BookingRestaurantModel } from './models/BookingRestaurantModel';

const type = {
  '1': 'Địa điểm lưu trú',
  '2': 'Địa điểm ẩm thực',
};

export const sttBooking: {
  [key: string]: {
    text: string;
    color: string;
    bgcolor: string;
    desc: string[];
  };
} = {
  '1': {
    text: 'Chờ xác nhận',
    color: '#FFBF00',
    bgcolor: '#FFF7CD',
    desc: [
      'Đơn đặt phòng của bạn đang chờ xác nhận. Chúng tôi sẽ thông báo cho bạn ngay khi có phản hồi từ cơ sở lưu trú.',
      'Đơn đặt bàn của bạn đang chờ xác nhận. Chúng tôi sẽ thông báo cho bạn ngay khi có phản hồi từ cơ sở ẩm thực.',
    ],
  },
  '2': {
    text: 'Đã xác nhận',
    color: '#2CD9C5',
    bgcolor: '#D5F6E8',
    desc: [
      'Đơn đặt phòng của bạn đã được xác nhận. Vui lòng đến check-in đúng ngày để đảm bảo phòng luôn sẵn sàng cho bạn.',
      'Đơn đặt bàn của bạn đã được xác nhận. Vui lòng đến đúng giờ để đảm bảo bàn luôn sẵn sàng cho bạn.',
    ],
  },
  '3': {
    text: 'Đã cọc',
    color: '#826AF9',
    bgcolor: '#FBEBFF',
    desc: [
      'Địa điểm lưu trú đã nhận được tiền cọc của bạn. Vui lòng đến check-in đúng ngày để đảm bảo phòng luôn sẵn sàng cho bạn.',
    ],
  },
  '4': {
    text: 'Đã nhận phòng',
    color: '#4A98E2',
    bgcolor: '#D0F2FF',
    desc: [
      'Bạn đã nhận phòng thành công. Chúc bạn có một kỳ nghỉ thật tuyệt vời! Nếu cần hỗ trợ, hãy liên hệ lễ tân ngay nhé.',
    ],
  },
  '4.1': {
    text: 'Đã nhận bàn',
    color: '#4A98E2',
    bgcolor: '#D0F2FF',
    desc: [
      '',
      'Bạn đã nhận bàn thành công. Chúc bạn có một bữa ăn ngon miệng! Nếu cần hỗ trợ, vui lòng liên hệ nhân viên phục vụ.',
    ],
  },
  '5': {
    text: 'Đã thanh toán',
    color: '#54D62C',
    bgcolor: '#E9FCD4',
    desc: [
      'Bạn cảm thấy thế nào về trải nghiệm tại cơ sở lưu trú này? Hãy chia sẻ cảm nhận với SaPa Tour nhé!',
      'Bạn cảm thấy thế nào về trải nghiệm tại cơ sở ẩm thực này? Hãy chia sẻ cảm nhận với SaPa Tour nhé!',
    ],
  },
  '6': {
    text: 'Đã hủy',
    color: '#FF4842',
    bgcolor: '#FFE7D9',
    desc: ['Đã huỷ đặt phòng vào', 'Đã huỷ đặt bàn vào'],
  },
};
export const list: {
  [key: string]: (BookingHotelModel | BookingRestaurantModel)[];
} = {
  '1': [
    {
      type: '1',
      idBooking: '100100',
      status: '1',
      userInfo: {
        name: 'Nam Nguyễn',
        phone: '0123456789',
        note: 'Chuẩn bị ghế cho em bé',
      },
      placeInfo: {
        name: 'Hotel de la Coupole - MGallery by Sofitel',
        dayStart: '2025-07-10',
        dayEnd: '2025-07-12',
        address: 'Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa',
        rooms: [
          {
            name: 'Phòng Deluxe có giường đôi cỡ lớn cho 2 người',
            price: 1000000,
            theNumOfRoom: 1,
            image: require('../assets/img/hotel/deluxe.png'),
          },
          {
            name: 'Phòng Deluxe có giường đôi cỡ lớn cho 2 người',
            price: 1000000,
            theNumOfRoom: 1,
            image: require('../assets/img/hotel/deluxe.png'),
          },
          {
            name: 'Phòng Deluxe có giường đôi cỡ lớn cho 2 người',
            price: 1000000,
            theNumOfRoom: 1,
            image: require('../assets/img/hotel/deluxe.png'),
          },
        ],

        totalPriceRoom: 1000000,
        totalPriceService: 100000,
        totalDiscount: 100000,
        totalPrice: 1000000,
      },
      timeUpdateStt1: '2025-07-09 09:37:17',
      timeUpdateStt2: '2025-07-09 10:37:17',
      timeUpdateStt3: '2025-07-09 11:37:17',
    },
    {
      type: '1',
      idBooking: '100101',
      status: '2',
      userInfo: {
        name: 'Nam Nguyễn',
        phone: '0123456789',
        note: 'Chuẩn bị ghế cho em bé',
      },
      placeInfo: {
        name: 'Hotel de la Coupole - MGallery by Sofitel',
        dayStart: '2025-07-11',
        dayEnd: '2025-07-13',
        address: 'Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa',
        rooms: [
          {
            name: 'Phòng Deluxe có giường đôi cỡ lớn cho 2 người',
            price: 1000000,
            theNumOfRoom: 1,
            image: require('../assets/img/hotel/deluxe.png'),
          },
          {
            name: 'Phòng Deluxe có giường đôi cỡ lớn cho 2 người',
            price: 1000000,
            theNumOfRoom: 1,
            image: require('../assets/img/hotel/deluxe.png'),
          },
          {
            name: 'Phòng Deluxe có giường đôi cỡ lớn cho 2 người',
            price: 1000000,
            theNumOfRoom: 1,
            image: require('../assets/img/hotel/deluxe.png'),
          },
        ],
        services: [],
        totalPriceRoom: 1000000,
        totalPriceService: 100000,
        totalDiscount: 100000,
        totalPrice: 1000000,
      },
      timeUpdateStt1: '2025-07-09 09:37:17',
      timeUpdateStt2: '2025-07-09 10:37:17',
      timeUpdateStt3: '2025-07-09 11:37:17',
    },
    {
      type: '1',
      idBooking: '100102',
      status: '3',
      userInfo: {
        name: 'Nam Nguyễn',
        phone: '0123456789',
        note: 'Chuẩn bị ghế cho em bé',
      },
      placeInfo: {
        name: 'Hotel de la Coupole - MGallery by Sofitel',
        dayStart: '2025-07-12',
        dayEnd: '2025-07-14',
        address: 'Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa',
        rooms: [
          {
            name: 'Phòng Deluxe có giường đôi cỡ lớn cho 2 người',
            price: 1000000,
            theNumOfRoom: 1,
            image: require('../assets/img/hotel/deluxe.png'),
          },
          {
            name: 'Phòng Deluxe có giường đôi cỡ lớn cho 2 người',
            price: 1000000,
            theNumOfRoom: 1,
            image: require('../assets/img/hotel/deluxe.png'),
          },
          {
            name: 'Phòng Deluxe có giường đôi cỡ lớn cho 2 người',
            price: 1000000,
            theNumOfRoom: 1,
            image: require('../assets/img/hotel/deluxe.png'),
          },
        ],
        services: [
          {
            name: 'Giặt là',
            price: 100000,
            quantity: 1,
          },
        ],
        totalPriceRoom: 1000000,
        totalPriceService: 100000,
        totalDiscount: 100000,
        totalPrice: 1000000,
      },
      timeUpdateStt1: '2025-07-09 09:37:17',
      timeUpdateStt2: '2025-07-09 10:37:17',
      timeUpdateStt3: '2025-07-09 11:37:17',
    },
    {
      type: '1',
      idBooking: '100103',
      status: '4',
      userInfo: {
        name: 'Nam Nguyễn',
        phone: '0123456789',
        note: 'Chuẩn bị ghế cho em bé',
      },
      placeInfo: {
        name: 'Hotel de la Coupole - MGallery by Sofitel',
        dayStart: '2025-07-13',
        dayEnd: '2025-07-15',
        address: 'Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa',
        rooms: [
          {
            name: 'Phòng Deluxe có giường đôi cỡ lớn cho 2 người',
            price: 1000000,
            theNumOfRoom: 1,
            image: require('../assets/img/hotel/deluxe.png'),
          },
          {
            name: 'Phòng Deluxe có giường đôi cỡ lớn cho 2 người',
            price: 1000000,
            theNumOfRoom: 1,
            image: require('../assets/img/hotel/deluxe.png'),
          },
          {
            name: 'Phòng Deluxe có giường đôi cỡ lớn cho 2 người',
            price: 1000000,
            theNumOfRoom: 1,
            image: require('../assets/img/hotel/deluxe.png'),
          },
        ],
        services: [
          {
            name: 'Giặt là',
            price: 100000,
            quantity: 1,
          },
        ],
        totalPriceRoom: 1000000,
        totalPriceService: 100000,
        totalDiscount: 100000,
        totalPrice: 1000000,
      },
      timeUpdateStt1: '2025-07-09 09:37:17',
      timeUpdateStt2: '2025-07-09 10:37:17',
      timeUpdateStt3: '2025-07-09 11:37:17',
    },
    {
      type: '1',
      idBooking: '100103',
      status: '5',
      userInfo: {
        name: 'Nam Nguyễn',
        phone: '0123456789',
        note: 'Chuẩn bị ghế cho em bé',
      },
      placeInfo: {
        name: 'Hotel de la Coupole - MGallery by Sofitel',
        dayStart: '2025-07-13',
        dayEnd: '2025-07-15',
        address: 'Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa',
        rooms: [
          {
            name: 'Phòng Deluxe có giường đôi cỡ lớn cho 2 người',
            price: 1000000,
            theNumOfRoom: 1,
            image: require('../assets/img/hotel/deluxe.png'),
          },
          {
            name: 'Phòng Deluxe có giường đôi cỡ lớn cho 2 người',
            price: 1000000,
            theNumOfRoom: 1,
            image: require('../assets/img/hotel/deluxe.png'),
          },
          {
            name: 'Phòng Deluxe có giường đôi cỡ lớn cho 2 người',
            price: 1000000,
            theNumOfRoom: 1,
            image: require('../assets/img/hotel/deluxe.png'),
          },
        ],
        services: [
          {
            name: 'Giặt là',
            price: 100000,
            quantity: 1,
          },
        ],
        totalPriceRoom: 1000000,
        totalPriceService: 100000,
        totalDiscount: 100000,
        totalPrice: 1000000,
      },
      timeUpdateStt1: '2025-07-09 09:37:17',
      timeUpdateStt2: '2025-07-09 10:37:17',
      timeUpdateStt3: '2025-07-09 11:37:17',
    },
    {
      type: '1',
      idBooking: '100103',
      status: '6',
      userInfo: {
        name: 'Nam Nguyễn',
        phone: '0123456789',
        note: 'Chuẩn bị ghế cho em bé',
      },
      placeInfo: {
        name: 'Hotel de la Coupole - MGallery by Sofitel',
        dayStart: '2025-07-13',
        dayEnd: '2025-07-15',
        address: 'Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa',
        rooms: [
          {
            name: 'Phòng Deluxe có giường đôi cỡ lớn cho 2 người',
            price: 1000000,
            theNumOfRoom: 1,
            image: require('../assets/img/hotel/deluxe.png'),
          },
          {
            name: 'Phòng Deluxe có giường đôi cỡ lớn cho 2 người',
            price: 1000000,
            theNumOfRoom: 1,
            image: require('../assets/img/hotel/deluxe.png'),
          },
          {
            name: 'Phòng Deluxe có giường đôi cỡ lớn cho 2 người',
            price: 1000000,
            theNumOfRoom: 1,
            image: require('../assets/img/hotel/deluxe.png'),
          },
        ],
        services: [
          {
            name: 'Giặt là',
            price: 100000,
            quantity: 1,
          },
        ],
        totalPriceRoom: 1000000,
        totalPriceService: 100000,
        totalDiscount: 100000,
        totalPrice: 1000000,
      },
      timeUpdateStt1: '2025-07-09 09:37:17',
      timeUpdateStt2: '2025-07-09 10:37:17',
      timeUpdateStt3: '2025-07-09 11:37:17',
    },
  ],
  '2': [
    {
      type: '2',
      idBooking: '200100',
      status: '1',
      userInfo: {
        name: 'Nam Nguyễn',
        phone: '0123456789',
        note: 'Chuẩn bị ghế cho em bé',
      },
      placeInfo: {
        name: 'Nhà hàng Đỗ Quyên',
        image: require('../assets/img/hotel/doquyen.png'),
        dayStart: '2025-07-10',
        timeStart: '10:00',
        address: 'Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa',
        numberOfPeople: 2,
        bill: [
          {
            name: 'Vịt ôm chuối đậu',
            price: 100000,
            quantity: 1,
          },
          {
            name: 'Gà hầm thuốc bắc',
            price: 100000,
            quantity: 1,
          },
          {
            name: 'Gà quay lá mắc mật nguyên con 3 cân',
            price: 100000,
            quantity: 3,
          },
        ],
        totalBill: 500000,
        totalDiscount: 100000,
        totalPrice: 400000,
      },
      timeUpdateStt1: '2025-07-09 09:37:17',
      timeUpdateStt2: '2025-07-09 10:37:17',
      timeUpdateStt3: '2025-07-09 11:37:17',
    },
    {
      type: '2',
      idBooking: '200101',
      status: '2',
      userInfo: {
        name: 'Nam Nguyễn',
        phone: '0123456789',
        note: 'Chuẩn bị ghế cho em bé',
      },
      placeInfo: {
        name: 'Nhà hàng Đỗ Quyên',
        image: require('../assets/img/hotel/doquyen.png'),
        dayStart: '2025-07-11',
        timeStart: '10:00',
        address: 'Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa',
        numberOfPeople: 2,
        bill: [
          {
            name: 'Vịt ôm chuối đậu',
            price: 100000,
            quantity: 1,
          },
          {
            name: 'Gà hầm thuốc bắc',
            price: 100000,
            quantity: 1,
          },
          {
            name: 'Gà quay lá mắc mật nguyên con 3 cân',
            price: 100000,
            quantity: 3,
          },
        ],
        totalBill: 500000,
        totalDiscount: 100000,
        totalPrice: 400000,
      },
      timeUpdateStt1: '2025-07-09 09:37:17',
      timeUpdateStt2: '2025-07-09 10:37:17',
      timeUpdateStt3: '2025-07-09 11:37:17',
    },
    {
      type: '2',
      idBooking: '200102',
      status: '4.1',
      userInfo: {
        name: 'Nam Nguyễn',
        phone: '0123456789',
        note: 'Chuẩn bị ghế cho em bé',
      },
      placeInfo: {
        name: 'Nhà hàng Đỗ Quyên',
        image: require('../assets/img/hotel/doquyen.png'),
        dayStart: '2025-07-12',
        timeStart: '10:00',
        address: 'Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa',
        numberOfPeople: 2,
        bill: [
          {
            name: 'Vịt ôm chuối đậu',
            price: 100000,
            quantity: 1,
          },
          {
            name: 'Gà hầm thuốc bắc',
            price: 100000,
            quantity: 1,
          },
          {
            name: 'Gà quay lá mắc mật nguyên con 3 cân',
            price: 100000,
            quantity: 3,
          },
        ],
        totalBill: 500000,
        totalDiscount: 100000,
        totalPrice: 400000,
      },
      timeUpdateStt1: '2025-07-09 09:37:17',
      timeUpdateStt2: '2025-07-09 10:37:17',
      timeUpdateStt3: '2025-07-09 11:37:17',
    },
    {
      type: '2',
      idBooking: '200103',
      status: '5',
      userInfo: {
        name: 'Nam Nguyễn',
        phone: '0123456789',
        note: 'Chuẩn bị ghế cho em bé',
      },
      placeInfo: {
        name: 'Nhà hàng Đỗ Quyên',
        image: require('../assets/img/hotel/doquyen.png'),
        dayStart: '2025-07-13',
        timeStart: '10:00',
        address: 'Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa',
        numberOfPeople: 2,
        bill: [
          {
            name: 'Vịt ôm chuối đậu',
            price: 100000,
            quantity: 1,
          },
          {
            name: 'Gà hầm thuốc bắc',
            price: 100000,
            quantity: 1,
          },
          {
            name: 'Gà quay lá mắc mật nguyên con 3 cân',
            price: 100000,
            quantity: 3,
          },
        ],
        totalBill: 500000,
        totalDiscount: 100000,
        totalPrice: 400000,
      },
      timeUpdateStt1: '2025-07-09 09:37:17',
      timeUpdateStt2: '2025-07-09 10:37:17',
      timeUpdateStt3: '2025-07-09 11:37:17',
    },
    {
      type: '2',
      idBooking: '200103',
      status: '6',
      userInfo: {
        name: 'Nam Nguyễn',
        phone: '0123456789',
        note: 'Chuẩn bị ghế cho em bé',
      },
      placeInfo: {
        name: 'Nhà hàng Đỗ Quyên',
        image: require('../assets/img/hotel/doquyen.png'),
        dayStart: '2025-07-13',
        timeStart: '10:00',
        address: 'Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa',
        numberOfPeople: 2,
        bill: [
          {
            name: 'Vịt ôm chuối đậu',
            price: 100000,
            quantity: 1,
          },
          {
            name: 'Gà hầm thuốc bắc',
            price: 100000,
            quantity: 1,
          },
          {
            name: 'Gà quay lá mắc mật nguyên con 3 cân',
            price: 100000,
            quantity: 3,
          },
        ],
        totalBill: 500000,
        totalDiscount: 100000,
        totalPrice: 400000,
      },
      timeUpdateStt1: '2025-07-09 09:37:17',
      timeUpdateStt2: '2025-07-09 10:37:17',
      timeUpdateStt3: '2025-07-09 11:37:17',
    },
  ],
};
