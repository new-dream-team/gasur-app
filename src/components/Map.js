import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { Svg, Line } from 'react-native-svg';
import SvgUri from 'react-native-svg-uri';

import Pirate from './Pirate';

import finishIcon from '../assets/finish-icon.svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const imgWidth = windowWidth - 20;
const finishIconSize = 25;

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xRatio: null,
      yRatio: null,
    };
  }

  async componentDidMount() {
    await Image.getSize(this.props.mapUrl, (width, height) => {
      this.setState({
        xRatio: imgWidth / width,
        yRatio: imgWidth / height,
      });
    });
  }

  render() {
    return (
      <View>
        <ImageZoom
          cropWidth={windowWidth}
          cropHeight={windowHeight * 0.8}
          imageWidth={imgWidth}
          imageHeight={windowHeight}
          minScale={1.0}
        >
          <ImageBackground
            style={styles.map}
            source={{ uri: this.props.mapUrl }}
            resizeMode="contain"
          >
            <Svg width={imgWidth} height={windowHeight} position="absolute">
              {this.props.points.map((point, key) => {
                if (key !== 0) {
                  const lastPoint = this.props.points[key - 1];
                  return (
                    <Line
                      // eslint-disable-next-line react/no-array-index-key
                      key={key}
                      x1={lastPoint.x * this.state.xRatio}
                      y1={lastPoint.y * this.state.yRatio}
                      x2={point.x * this.state.xRatio}
                      y2={point.y * this.state.yRatio}
                      stroke="blue"
                      strokeWidth="2"
                    />
                  );
                }
              })}
            </Svg>
            <View
              style={styles.iconView}
              top={
                this.props.points[this.props.points.length - 1].y *
                  this.state.yRatio -
                finishIconSize
              }
              left={
                this.props.points[this.props.points.length - 1].x *
                this.state.xRatio
              }
            >
              <SvgUri
                width={finishIconSize}
                height={finishIconSize}
                source={finishIcon}
                fill="#00FFCC"
              />
            </View>
            <Pirate
              points={this.props.points}
              xRatio={this.state.xRatio}
              yRatio={this.state.yRatio}
            />
          </ImageBackground>
        </ImageZoom>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: imgWidth,
    height: imgWidth,
    alignSelf: 'center',
    top: (windowHeight - 90) / 2 - imgWidth / 2,
  },
  iconView: {
    position: 'absolute',
    alignContent: 'center',
    height: finishIconSize,
    width: finishIconSize,
  },
});
