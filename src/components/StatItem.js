import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
    color: '#fff',
  },
  label: {
    fontSize: 18,
  },
  stat: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});

const StatItem = ({ stat, iconName, label }) => (
  <View style={styles.container}>
    <Icon name={iconName} size={42} color="#fff" />
    <Text style={[styles.textCenter, styles.stat]}>{stat}</Text>
    <Text style={[styles.textCenter, styles.label]}>{label}</Text>
  </View>
);

export default StatItem;
