import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

type Props = {
  visible: boolean;
  idBooking?: boolean;
  onClose: () => void;
};

export const InformationPayModal: React.FC<Props> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      style={{ zIndex: 100 }}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <View
              style={{
                width: '90%',
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 16,
              }}
            >
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 16,
                  lineHeight: 24,
                  textAlign: 'center',
                  marginBottom: 16,
                }}
              >
                Thông tin thanh toán
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}
              >
                {/* Thông tin ngân hàng */}
                <View style={{ flex: 1 }}>
                  {[
                    {
                      label: 'CTK:',
                      value: 'Nguyen Thanh Long',
                      canCopy: false,
                    },
                    { label: 'STK:', value: '9999889988', canCopy: true },
                    {
                      label: 'Ngân hàng:',
                      value: 'Vietcombank',
                      canCopy: false,
                    },
                  ].map(({ label, value, canCopy }, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        marginBottom: 4,
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: '400',
                          fontSize: 14,
                          lineHeight: 22,
                          color: '#212B36',
                        }}
                      >
                        {label}{' '}
                      </Text>
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 14,
                          lineHeight: 22,
                        }}
                      >
                        {value}
                      </Text>
                      {canCopy && (
                        <TouchableOpacity onPress={() => {}}>
                          <Image
                            source={require('../../../assets/img/icon/copy.png')}
                            style={{ height: 20, width: 20, marginLeft: 4 }}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}

                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 12,
                      lineHeight: 18,
                      color: '#FF4842',
                      marginTop: 8,
                    }}
                  >
                    * Bạn có thể sao chép số tài khoản hoặc tải xuống mã QR để
                    tiến hành thanh toán
                  </Text>
                </View>

                <View style={{ alignItems: 'center', marginLeft: 12 }}>
                  <Image
                    source={require('../../../assets/img/qr.png')}
                    style={{
                      height: 80,
                      width: 80,
                      marginBottom: 8,
                    }}
                  />
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={require('../../../assets/img/icon/download.png')}
                      style={{ height: 16, width: 16, marginRight: 4 }}
                    />
                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: 12,
                        lineHeight: 18,
                        color: '#81BA41',
                      }}
                    >
                      Tải xuống
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={onClose}
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#C4CDD5',
                  paddingHorizontal: 24,
                  paddingVertical: 4,
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 13,
                    lineHeight: 22,
                    textAlign: 'center',
                  }}
                >
                  Đóng
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
