import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import Map from '../components/Map';
import logo from '../assets/logo.png';

export default class Navigator extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Map points={this.props.route.params.points} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    resizeMode: 'contain',
    height: 90,
    alignSelf: 'center',
    marginTop: 10,
  },
});
