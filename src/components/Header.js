import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import logo from '../assets/logo.png';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#075757',
  },
  logo: {
    resizeMode: 'center',
  },
});
