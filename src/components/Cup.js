import React, { useState, useRef, useEffect } from 'react';
import {
  TouchableWithoutFeedback, View, Image, Animated,
} from 'react-native';

const cupImage = require('../../assets/images/Cup.png');

const Cup = ({ cupSize, onPress, data }) => {
  const translateY = useRef(new Animated.Value(300)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const [ballVisible, setBallVisible] = useState(false);

  const animateClose = () => {
    setBallVisible(true);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: cupSize / 4,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 2,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
    ]).start(({ finished }) => {
      if (finished) {
        setTimeout(() => { onPress(data); }, 200);
      }
    });
  };

  if (!data.active) {
    return <View style={{ height: cupSize, width: cupSize }} />;
  }

  return (
    <TouchableWithoutFeedback
      style={{
        width: cupSize,
        height: cupSize,
        borderRadius: cupSize / 2,
        alignContent: 'center',
        justifyContent: 'center',
      }}
      onPress={animateClose}
    >
      <View>
        <Image style={{ height: cupSize, width: cupSize }} source={cupImage} />
        {ballVisible && (
        <Animated.View style={[{
          height: cupSize / 2,
          width: cupSize / 2,
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: 'grey',
          position: 'absolute',
          borderRadius: cupSize / 4,
          left: cupSize / 4,
          zIndex: 99,
        }, {
          transform: [
            { translateY },
            { scale },
          ],
        }]}
        />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Cup;
