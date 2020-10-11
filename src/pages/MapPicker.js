import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import Header from '../components/Header';

export default class MapPicker extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.header}>
          <Header />
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  header: {
    height: 80,
  },
});
