import React from 'react';
import { Text } from 'react-native';
import theme from '../../../assets/theme';

const ThemedText = ({ style, children }) => (<Text style={[style, theme?.components?.text]}>{children}</Text>);

export default ThemedText;