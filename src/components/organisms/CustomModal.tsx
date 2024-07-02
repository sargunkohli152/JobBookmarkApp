import React from 'react';
import { Modal, Text, Pressable, View, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

type CustomModalProps = {
    isVisible: boolean;
    message: string;
    onClose: () => void;
}

const CustomModal = ({ isVisible, message, onClose }: CustomModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText} numberOfLines={1}>{message}</Text>
          <Pressable
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.opacityOverlay,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: `${colors.black}`,
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: `${colors.darkBlue}`,
    borderRadius: 5,
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomModal;
