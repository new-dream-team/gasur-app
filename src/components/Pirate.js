/* eslint-disable no-console */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { Pedometer, Magnetometer } from 'expo-sensors';

import walkingIcon from '../assets/walking-icon.svg';

const iconSize = 30;
const buttonHeight = 20;
const buttonWitdh = 45;

export default class Pirate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentY: props.points[0].y,
      currentX: props.points[0].x,
      cumulativeSteps: 0,
      direction: 'N',
    };
  }

  componentDidMount() {
    Magnetometer.setUpdateInterval(1000);
    Magnetometer.addListener(this.handleMagnetometer.bind(this));
    Pedometer.watchStepCount(this.handleWalking.bind(this));
  }

  handleMagnetometer({ x, y }) {
    // eslint-disable-next-line no-unused-vars
    let angle;
    if (Math.atan2(y, x) >= 0) {
      angle = Math.atan2(y, x) * (180 / Math.PI);
    } else {
      angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
    }
    angle = Math.round(angle);

    angle = angle - 90 >= 0 ? angle - 90 : angle + 271;
    // console.log(`angle: ${angle}`);
    let direction;

    if (angle >= 22.5 && angle < 67.5) {
      direction = 'NE';
    } else if (angle >= 67.5 && angle < 112.5) {
      direction = 'E';
    } else if (angle >= 112.5 && angle < 157.5) {
      direction = 'SE';
    } else if (angle >= 157.5 && angle < 202.5) {
      direction = 'S';
    } else if (angle >= 202.5 && angle < 247.5) {
      direction = 'SW';
    } else if (angle >= 247.5 && angle < 292.5) {
      direction = 'W';
    } else if (angle >= 292.5 && angle < 337.5) {
      direction = 'NW';
    } else {
      direction = 'N';
    }

    // eslint-disable-next-line no-undef
    this.setState({ direction });
  }

  // eslint-disable-next-line class-methods-use-this
  handleWalking({ steps }) {
    const currentSteps = steps - this.state.cumulativeSteps;
    console.log(currentSteps);
    console.log(this.state.direction);
    this.setState({ cumulativeSteps: steps });

    if (this.state.direction === 'N') {
      this._goNorth(currentSteps);
    } else if (this.state.direction === 'NE') {
      this._goNortheast(currentSteps);
    } else if (this.state.direction === 'E') {
      this._goEast(currentSteps);
    } else if (this.state.direction === 'SE') {
      this._goSoutheast(currentSteps);
    } else if (this.state.direction === 'S') {
      this._goSouth(currentSteps);
    } else if (this.state.direction === 'SW') {
      this._goSouthwest(currentSteps);
    } else if (this.state.direction === 'W') {
      this._goWest(currentSteps);
    } else if (this.state.direction === 'NW') {
      this._goNorthwest(currentSteps);
    }
  }

  _goNorth(stepsTaken) {
    this.setState({ currentY: this.state.currentY - 10 * stepsTaken });
  }

  _goNortheast(stepsTaken) {
    this.setState({ currentY: this.state.currentY - 5 * stepsTaken });
    this.setState({ currentX: this.state.currentX - 5 * stepsTaken });
  }

  _goEast(stepsTaken) {
    this.setState({ currentX: this.state.currentX - 10 * stepsTaken });
  }

  _goSoutheast(stepsTaken) {
    this.setState({ currentX: this.state.currentX - 5 * stepsTaken });
    this.setState({ currentY: this.state.currentY + 5 * stepsTaken });
  }

  _goSouth(stepsTaken) {
    this.setState({ currentY: this.state.currentY + 10 * stepsTaken });
  }

  _goSouthwest(stepsTaken) {
    this.setState({ currentY: this.state.currentY + 10 * stepsTaken });
    this.setState({ currentX: this.state.currentX + 10 * stepsTaken });
  }

  _goWest(stepsTaken) {
    this.setState({ currentX: this.state.currentX + 10 * stepsTaken });
  }

  _goNorthwest(stepsTaken) {
    this.setState({ currentX: this.state.currentX + 10 * stepsTaken });
    this.setState({ currentY: this.state.currentY - 10 * stepsTaken });
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
