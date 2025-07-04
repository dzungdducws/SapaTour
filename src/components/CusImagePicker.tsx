import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

type CusImagePickerProps = {
  placeholder?: string;
  onChange?: (image: ImageData | null) => void;
  disabled?: boolean;
  iconSource?: any; // Thêm prop cho icon
};

type ImageData = {
  uri: string;
  name?: string;
  type?: string;
};

export const CusImagePicker: React.FC<CusImagePickerProps> = ({
  placeholder = 'Chọn ảnh...',
  onChange,
  disabled = false,
  iconSource = require('../../assets/img/icon/pic.png'), // Giá trị mặc định
}) => {
  const [image, setImage] = useState<ImageData | null>(null);

  const handlePickImage = () => {
    if (disabled) return;
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
      },
      response => {
        if (
          response.didCancel ||
          response.errorCode ||
          !response.assets?.[0]?.uri
        ) {
          return;
        }
        const selectedImage = {
          uri: response.assets[0].uri,
          name: response.assets[0].fileName || `image_${Date.now()}`,
          type: response.assets[0].type,
        };
        setImage(selectedImage);
        onChange?.(selectedImage);
      },
    );
  };

  return (
    <View style={[styles.container, disabled && styles.disabled]}>
      <TouchableOpacity
        onPress={handlePickImage}
        disabled={disabled}
        style={styles.touchableArea}
      >
        <View style={styles.contentContainer}>
          {image ? (
            <>
              <Image source={{ uri: image.uri }} style={styles.image} />
              <Text style={styles.imageName} numberOfLines={1}>
                {image.name}
              </Text>
            </>
          ) : (
            <Text style={[styles.placeholder, disabled && styles.disabledText]}>
              {placeholder}
            </Text>
          )}
          <Image
            source={iconSource}
            style={[styles.icon, disabled && styles.disabledIcon]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: '#F4F6F8',
    height: 40,
    paddingHorizontal: 16,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  disabled: {
    backgroundColor: '#f3f3f3',
  },
  touchableArea: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeholder: {
    color: '#888',
    fontSize: 12,
    flex: 1,
  },
  disabledText: {
    color: '#a0a0a0',
  },
  disabledIcon: {
    tintColor: '#a0a0a0',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#81BA41',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 4,
    marginRight: 8,
  },
  imageName: {
    flex: 1,
    color: '#333',
    fontSize: 12,
    marginRight: 8,
  },
});