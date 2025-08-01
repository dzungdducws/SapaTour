import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['VI'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Thg.1',
    'Thg.2',
    'Thg.3',
    'Thg.4',
    'Thg.5',
    'Thg.6',
    'Thg.7',
    'Thg.8',
    'Thg.9',
    'Thg.10',
    'Thg.11',
    'Thg.12',
  ],
  dayNames: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay',
};
LocaleConfig.defaultLocale = 'VI';

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (startDate: string, endDate: string) => void;
};

export const RangePickerModal: React.FC<Props> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const [range, setRange] = useState<{ startDate?: string; endDate?: string }>(
    {},
  );

  const handleDayPress = (day: any) => {
    const selectedDate = day.dateString;

    if (!range.startDate || (range.startDate && range.endDate)) {
      setRange({ startDate: selectedDate, endDate: undefined });
    } else if (selectedDate < range.startDate) {
      setRange({ startDate: selectedDate, endDate: range.startDate });
    } else {
      setRange({ ...range, endDate: selectedDate });
    }
  };

  const getMarkedDates = () => {
    const marked: any = {};
    const { startDate, endDate } = range;

    if (startDate) {
      marked[startDate] = {
        startingDay: true,
        color: '#70d7c7',
        textColor: 'white',
      };
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let current = new Date(start);

      while (current <= end) {
        const dateString = current.toISOString().split('T')[0];
        if (dateString !== startDate && dateString !== endDate) {
          marked[dateString] = {
            color: '#95e6da',
            textColor: 'white',
          };
        }
        current.setDate(current.getDate() + 1);
      }

      marked[endDate] = {
        endingDay: true,
        color: '#70d7c7',
        textColor: 'white',
      };
    }

    return marked;
  };

  const handleConfirm = () => {
    if (range.startDate && range.endDate) {
      onConfirm(range.startDate, range.endDate);
      setRange({});
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Chọn khoảng ngày</Text>
          <Calendar
            markingType="period"
            markedDates={getMarkedDates()}
            onDayPress={handleDayPress}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirm}
              style={[
                styles.confirmButton,
                !(range.startDate && range.endDate) && { opacity: 0.5 },
              ]}
              disabled={!(range.startDate && range.endDate)}
            >
              <Text style={styles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  confirmButton: {
    padding: 10,
    backgroundColor: '#00c3a1',
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
