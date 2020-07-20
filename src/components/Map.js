import React, {Component} from 'react';
import {View, ImageBackground, StyleSheet, Dimensions} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {Svg, Line} from 'react-native-svg';
import SvgUri from 'react-native-svg-uri';

import Pirate from './Pirate';

import map from '../assets/map.png';
import finishIcon from '../assets/finish-icon.svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const imgWidth = windowWidth-20;
const tamanhoImagem = 1024;
const imgRatio = imgWidth /tamanhoImagem;
const finishIconSize = 25;


export default class Map extends Component{
    render() { 
        return(
            <View>
                <ImageZoom 
                cropWidth={windowWidth}
                cropHeight={windowHeight * 0.8}
                imageWidth={imgWidth}
                imageHeight={windowHeight}
                minScale={1.0}
                >
                    <ImageBackground style={styles.map} source={map} resizeMode={'contain'}>
                        <Svg width={imgWidth} height={windowHeight} position= 'absolute'>
                            {
                                this.props.points.map( (point,key) =>{
                                    if( key != 0){
                                        let lastPoint = this.props.points[key-1];
                                        return(
                                            <Line x1={lastPoint.x * imgRatio} y1={lastPoint.y * imgRatio} x2={point.x * imgRatio} y2={point.y * imgRatio} stroke="blue" strokeWidth="2" />
                                            );
                                        }
                                    })
                                }                       
                        </Svg>
                    <View style={styles.iconView} 
                    top={(this.props.points[this.props.points.length-1].y * imgRatio) - finishIconSize} 
                    left={(this.props.points[this.props.points.length-1].x * imgRatio)}>
                        <SvgUri width={finishIconSize} height={finishIconSize} source={finishIcon} fill={'#00FFCC'}  /> 
                    </View>
                    <Pirate points={this.props.points} imgRatio={imgRatio}/>
                    </ImageBackground>
                </ImageZoom>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map:{
        width: imgWidth,
        height: imgWidth,
        alignSelf: 'center',
        top: (windowHeight-90)/2 - imgWidth/2
    },
    iconView: {
        position: 'absolute',
        alignContent: 'center',
        height: finishIconSize,
        width: finishIconSize
    },
})