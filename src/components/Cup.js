import React, { useState, useRef, useEffect } from "react";
import { TouchableWithoutFeedback, View, Image, Animated } from "react-native";

const cupImage = require("../../assets/images/Cup.png");
const ballImage = require("../../assets/images/ball_cropped.png");

const Cup = ({ cupSize = 0, onPress, data, onAnimation, disablePress, resetPending }) => {
  const translateY = useRef(new Animated.Value(800)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const [ballVisible, setBallVisible] = useState(false);

  const resetBallState = () => { 
    translateY.setValue(800);
    scale.setValue(1);
    setBallVisible(false);
  };

  useEffect(() => {
    resetBallState();
  }, [resetPending]);

  const animateClose = () => {
    onAnimation(true);
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
        setTimeout(() => {
          onPress(data);
          onAnimation(false);
        }, 200);
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
        alignContent: "center",
        justifyContent: "center",
      }}
      onPress={disablePress ? undefined : animateClose}
    >
      <View>
        <Image style={{ height: cupSize, width: cupSize }} source={cupImage} />
        {ballVisible && (
          <Animated.Image source={ballImage}
            style={[
              {
                height: cupSize / 2,
                width: cupSize / 2,
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "grey",
                position: "absolute",
                borderRadius: cupSize / 4,
                left: cupSize / 4,
                zIndex: 99,
              },
              {
                transform: [{ translateY }, { scale }],
              },
            ]}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Cup;
