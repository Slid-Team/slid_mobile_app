import React, {useEffect} from 'react';
import {Alert, BackHandler, SafeAreaView, StyleSheet, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import SlidWebView from './components/SlidWebView';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen?.hide();
    }, 500);
  }, []);
  return (
    <View style={style.container}>
      <SlidWebView
        handleClose={() => {
          BackHandler.exitApp();
        }}
      />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
export default App;
