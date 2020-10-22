import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import logo from '../assets/logo.png';

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
