import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,

} from 'react-native';
import { Toast, Root } from 'popup-ui';
import { Dropdown } from 'react-native-material-dropdown';

import api from '../services/api';
import logo from '../assets/logo.png';

const multiLanguage = require('../../multi-language/en-US.json');

const availableLanguages = [{ value: 'pt-BR' }, { value: 'en-US' }];
const windowWidth = Dimensions.get('screen').width;

export default function Main({ navigation }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [idMap, setIdMap]= useState('');
  const [language, setLanguage] = useState(multiLanguage);
  const maps=[];

  async function handleSubmit() {
    try {
      const response = await api.post('/generateMap', { origin, destination });
      const res = await api.get(`/image`, {params:{id:idMap}})
      navigation.navigate('Navigator', { points: response.data , mapUrl: res.data[0].urlImage});
    } catch (error) {
      if (error.message === 'Network Error') {
        return Toast.show({
          title: language.main.toast.networkErrorTitle,
          text: language.main.toast.networkErrorDescription,
          color: '#F29091',
          timing: 2000,
          icon: (
            <Image
              source={require('../assets/Error.png')}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
          ),
        });
      }
      let msg;
      if (error.response.request._response === 'Origin not found') {
        msg = language.main.toast.invalidOriginTitle;
      } else {
        msg = language.main.toast.invalidDestinationTitle;
      }
      return Toast.show({
        title: msg,
        text: language.main.toast.invalidPointDescription,
        color: '#fbd10d',
        timing: 2000,
        icon: (
          <Image
            source={require('../assets/Warning.png')}
            style={{ width: 80, height: 80 }}
            resizeMode="contain"
          />
        ),
      });
    }
  }
  async function changeLanguage(cLanguage) {
    if (cLanguage === 'en-US') {
      setLanguage(require('../../multi-language/en-US.json'));
    } else if (cLanguage === 'pt-BR') {
      setLanguage(require('../../multi-language/pt-BR.json'));
    }
  }

  async function getMap(){
    await api.get('/image-all').then(res => {
    
      for(const map of res.data){
        maps.push({ label:map.name , value:map._id })
      }
    }).catch(error => {
        console.log(error);
    });
  }

  return (
    getMap(),
    <Root>
      <Dropdown
        dropdownPosition={0}
        value="en-US"
        containerStyle={styles.dropdown}
        onChangeText={value => changeLanguage(value)}
        data={availableLanguages}
        fontSize={12}
      />
      <View style={styles.container}>
        <Image source={logo} />
        <Dropdown
          dropdownPosition={0}
          value=''
          containerStyle={styles.mapsDropdown}
          onChangeText={value => {setIdMap(value)}}
          data={maps}
          fontSize={12}
        />
        
        <View style={styles.form}>
          <Text style={styles.label}> {language.main.form.labelOrigin} </Text>
          <TextInput
            style={styles.input}
            placeholder="T01"
            placeholderTextColor="#999"
            autoCorrect={false}
            value={origin}
            onChangeText={setOrigin}
          />
          <Text style={styles.label}>
            {' '}
            {language.main.form.labelDestination}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="T09"
            placeholderTextColor="#999"
            autoCorrect={false}
            value={destination}
            onChangeText={setDestination}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {language.main.form.buttonCalculate}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },
  button: {
    height: 42,
    backgroundColor: '#075757',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dropdown: {
    width: 60,
    marginLeft: windowWidth - 65,
  },
  mapsDropdown: {
    width: '80%',
  }
});
