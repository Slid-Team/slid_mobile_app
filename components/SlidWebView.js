import React, {useEffect, useRef, useState} from 'react';
import {Alert, BackHandler, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Config from 'react-native-config';

const SlidWebView = ({handleClose}) => {
  const MY_DOCS_URL = Config.MY_DOCS_URL
    ? Config.MY_DOCS_URL
    : 'https://app.slid.cc/docs';
  const HOST = Config.HOST ? Config.HOST : 'https://app.slid.cc/docs';
  const webviewRef = useRef();
  const [ableToGoBack, setAbleToGoBack] = useState(false);

  useEffect(() => {
    if (Config.ENV && Config.ENV !== 'production') {
      Alert.alert(`Running on ${Config.ENV}`, Config.MY_DOCS_URL);
    }
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (!ableToGoBack) handleClose();
        else webviewRef.current?.goBack();
        return true;
      },
    );
    return () => backHandler.remove();
  }, [ableToGoBack]);

  useEffect(() => {
    if (webviewRef && webviewRef.clearCache) webviewRef.clearCache();
  }, [webviewRef]);

  return (
    <WebView
      style={styles.container}
      userAgent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36 Mobile" // Is it right way?
      pullToRefreshEnabled={true}
      startInLoadingState={true}
      allowsInlineMediaPlayback={true}
      source={{uri: MY_DOCS_URL}}
      onContentProcessDidTerminate={() => {
        webviewRef?.current?.reload();
      }}
      allowsBackForwardNavigationGestures={true}
      mixedContentMode="always"
      originWhitelist={['https://*', 'http://*']}
      overScrollMode={'never'}
      ref={webviewRef}
      injectedJavaScript={``}
      onMessage={event => {
        if (event.nativeEvent.data.includes(HOST)) {
          const url = event.nativeEvent.data;
          setAbleToGoBack(url !== MY_DOCS_URL && url !== `${HOST}/sign-in`);
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default SlidWebView;
