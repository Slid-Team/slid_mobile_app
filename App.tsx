import React from 'react';
import {Alert, BackHandler, SafeAreaView, StyleSheet} from 'react-native';

import SlidWebView from './components/SlidWebView';

const App = () => {
  return (
    <SafeAreaView style={style.container}>
      <SlidWebView
        handleClose={() => {
          Alert.alert('앱 종료', '앱을 종료하시겠습니까?', [
            {
              text: '아니오',
              onPress: () => null,
            },
            {text: '예', onPress: () => BackHandler.exitApp()},
          ]);
        }}
      />
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
export default App;
