const type = {
  '1': 'Địa điểm lưu trú',
  '2': 'Địa điểm ẩm thực',
};

const sttBooking = {
  '1': 'Chờ xác nhận',
  '2': 'Đã xác nhận',
  '3': 'Đã hủy',
};

const list = {
  '1': [
    {
      type: '1',
      idBooking: '100144',
      status: '2',
      userInfo: {
        name: 'Nam Nguyễn',
        phone: '0123456789',
        note: 'Chuyển bị ghế cho em bé',
      },
      placeInfo: {
        name: 'Hotel de la Coupole - MGallery by Sofitel',
        dayStart: '2021-01-01',
        dayEnd: '2021-01-05',
        address: 'Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa',
        rooms: [
          {
            name: 'Phòng Deluxe có giường đôi cỡ lớn cho 2 người',
            price: 1000000,
            theNumOfRoom: 1,
            image: '',
          },
        ],
        services: [
          {
            name: 'Giặt là',
            price: 100000,
            quantity: 1,
          },
          {
            name: 'Nước lọc',
            price: 100000,
            quantity: 1,
          },
        ],
        totalPriceRoom: 1000000,
        totalPriceService: 100000,
        totalDiscount: 100000,
        totalPrice: 1000000,
      },
      timeUpdateStt1: '2021-01-01 00:00:00',
      timeUpdateStt2: '2021-01-01 00:00:00',
      timeUpdateStt3: '2021-01-01 00:00:00',
    },
  ],
  '2': [
    {
      type: '1',
      idBooking: '100144',
      status: '2',
      userInfo: {
        name: 'Nam Nguyễn',
        phone: '0123456789',
        note: 'Chuyển bị ghế cho em bé',
      },
      placeInfo: {
        name: 'Nhà hàng Đỗ Quyên',
        dayStart: '2021-01-01',
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
            quantity: 1,
          },
          {
            name: 'Gà quay lá mắc mật nguyên con 3 cân',
            price: 100000,
            quantity: 2,
          },
        ],
        totalBill: 500000,
        totalDiscount: 100000,
        totalPrice: 400000,
      },
      timeUpdateStt1: '2021-01-01 00:00:00',
      timeUpdateStt2: '2021-01-01 00:00:00',
      timeUpdateStt3: '2021-01-01 00:00:00',
    },
  ],
};
