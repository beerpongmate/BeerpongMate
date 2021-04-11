import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import ThemedText from './ThemedComponents/ThemedText';

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF90',
        justifyContent: "center",
        alignItems: "center",
    },
    innererContainer: {
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: "center",
        marginVertical: "10%",
        marginHorizontal: "10%",
        padding: 20,
        borderRadius: 10
    },
    text: {
        marginBottom: 20,
        fontSize: 20,
        textAlign: 'center'
    }
});

const ThemedOverlay = ({ visible, title, onDismiss, children }) => (
  <Modal
    visible={visible}
    animationType='fade'
    transparent
  >
    <TouchableOpacity style={styles.innerContainer} onPress={onDismiss}>
      <TouchableWithoutFeedback>
        <View style={styles.innererContainer}>
          <ThemedText style={styles.text}>{title}</ThemedText>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  </Modal>
    );

export default ThemedOverlay;