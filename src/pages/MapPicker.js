import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  ImageBackground,
} from 'react-native';

import Header from '../components/Header';
import api from '../services/api';

export default class MapPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maps: [],
    };
  }

  async componentDidMount() {
    const response = await api.get('/image-all');
    this.setState({
      maps: response.data,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.header}>
          <Header />
        </SafeAreaView>
        <View style={styles.cardListView}>
          <FlatList
            data={this.state.maps}
            keyExtractor={mapCard => mapCard._id}
            renderItem={({ item: mapCard }) => {
              return (
                <TouchableOpacity
                  style={styles.cardButton}
                  activeOpacity={0.8}
                  onPress={() => console.log(`Sou o ${mapCard.name}`)}
                >
                  <ImageBackground
                    source={{ uri: mapCard.urlImage }}
                    imageStyle={styles.img}
                    style={styles.imgBackground}
                  >
                    <Text style={styles.cardTitleText}> {mapCard.name}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 1,
  },
  cardListView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  cardButton: {
    backgroundColor: '#CCC',
    width: 360,
    height: 120,
    marginTop: 20,
    borderRadius: 10,
    borderColor: '#00000064',
    borderWidth: 1,
  },
  imgBackground: {
    flex: 1,
    resizeMode: 'contain',
    backgroundColor: '#000',
    borderRadius: 10,
  },
  img: {
    borderRadius: 10,
    opacity: 0.35,
  },
  cardTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    alignSelf: 'center',
  },
});
