import React from "react";
import {View, Text} from "react-native";
import styles from "./ButtonStyles";

function StyledButton(props) {
    return (
        <View>
            <TouchableOpacity>
                style={styles.StyledButton}
                onPress={() => {navigate('Welcome')

                }}
                <Text>Button Text</Text>
            </TouchableOpacity>
    );
}

export default StylesButton;