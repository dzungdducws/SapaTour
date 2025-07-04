import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

type Item = {
  label: string;
  value: string;
};

type CusDropdownProps = {
  items: Item[];
  placeholder?: string;
  onChange?: (value: string | null) => void;
  disabled?: boolean;
};

export const CusDropdown: React.FC<CusDropdownProps> = ({
  items,
  placeholder = 'Chọn một mục...',
  onChange,
  disabled = false,
}) => {
  const [value, setValue] = useState<string | null>(null);

  const handleValueChange = (newValue: string | null) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  const commonInputStyle = {
    backgroundColor: disabled ? '#f3f3f3' : '#F4F6F8',
    color: disabled ? '#a0a0a0' : '#000',

    paddingHorizontal: 0,
    paddingVertical: 0,
  };

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={handleValueChange}
        value={value}
        placeholder={{
          label: placeholder,
          value: null,
        }}
        items={items}
        disabled={disabled}
        style={{
          inputIOS: commonInputStyle,
          inputAndroid: commonInputStyle,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F4F6F8',
    height: 40,
    fontSize: 12,
    fontWeight: 400,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
    justifyContent: 'center',
  },
});
