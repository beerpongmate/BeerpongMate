import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const Cup = ({ cupSize, onPress, data }) => {
  if (!data.active) {
    return <View style={{ height: cupSize, width: cupSize }} />;
  }

  return (
    <TouchableOpacity
      style={{
        width: cupSize,
        height: cupSize,
        borderRadius: cupSize / 2,
        backgroundColor: '#fff',
        borderColor: 'red',
        borderWidth: 2,
        alignContent: 'center',
        justifyContent: 'center',
      }}
      onPress={() => onPress(data)}
    >
      <View style={{}} />
    </TouchableOpacity>
  );
};

export default Cup;
