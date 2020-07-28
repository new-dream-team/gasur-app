/* eslint-disable no-console */
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { Accelerometer } from 'expo-sensors';

import walkingIcon from '../assets/walking-icon.svg';

const iconSize = 30;
const buttonHeight = 20;
const buttonWitdh = 45;

let passo = 0;

export default class Pirate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentY: props.points[0].y,
      currentX: props.points[0].x,
      oldAccelarationSample: 1.41,
    };
  }

  componentDidMount() {
    // Accelerometer.addListener(this._handleAcceleration.bind(this));
    // Accelerometer.setUpdateInterval(100);
  }

  _handleAcceleration(accelerationData) {
    // const aceleracaoXY = Math.sqrt(accelerationData.x^2 + accelerationData.y^2) * 9.81;
    // const aceleracaoYZ = Math.sqrt(accelerationData.y^2 + accelerationData.z^2 ) * 9.81;
    const xyzAccelaration = Math.sqrt(
      accelerationData.y ** 2 +
        accelerationData.z ** 2 +
        accelerationData.x ** 2,
    );

    if (this.state.oldAccelarationSample === 0 && xyzAccelaration === 1) {
      console.log(`Dei ${++passo} passos`);
    }
    this.setState({
      oldAccelarationSample: xyzAccelaration,
    });

    console.log(
      `${new Date().getMinutes()}:${new Date().getSeconds()};${xyzAccelaration}`,
    );
  }

  _goUp() {
    this.setState({ currentY: this.state.currentY - 20 });
  }

  _goLeft() {
    this.setState({ currentX: this.state.currentX - 20 });
  }

  _goRight() {
    this.setState({ currentX: this.state.currentX + 20 });
  }

  _goDown() {
    this.setState({ currentY: this.state.currentY + 20 });
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={styles.svgContainer}
          top={this.state.currentY * this.props.imgRatio - iconSize}
          left={this.state.currentX * this.props.imgRatio - iconSize / 2}
        >
          <SvgUri
            width={iconSize}
            height={iconSize}
            source={walkingIcon}
            fill="#00FFCC"
          />
        </View>
        {/* <TouchableOpacity
          style={(styles.button, styles.up)}
          onPress={() => this._goUp()}
        >
          <Text style={styles.buttonText}>Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(styles.button, styles.left)}
          onPress={() => this._goLeft()}
        >
          <Text style={styles.buttonText}>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(styles.button, styles.right)}
          onPress={() => this._goRight()}
        >
          <Text style={styles.buttonText}>Right</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(styles.button, styles.down)}
          onPress={() => this._goDown()}
        >
          <Text style={styles.buttonText}>Down</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: buttonHeight * 4,
    width: buttonWitdh * 2 + 20,
  },
  svgContainer: {
    height: iconSize,
    width: iconSize,
  },
  icon: {
    height: iconSize,
    width: iconSize,
  },
  button: {
    height: buttonHeight,
    width: buttonWitdh,
    backgroundColor: '#075757',
    borderRadius: 4,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  down: {
    top: buttonHeight * 3,
    left: buttonWitdh / 2 + 10,
  },
  up: {
    top: 0,
    left: buttonWitdh / 2 + 10,
  },
  left: {
    top: buttonHeight * 1.5,
    left: 0,
  },
  right: {
    top: buttonHeight * 1.5,
    left: buttonWitdh + 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
