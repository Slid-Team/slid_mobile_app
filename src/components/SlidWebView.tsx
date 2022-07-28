import React, {useEffect, useRef, useState} from 'react';
import {Alert, BackHandler, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Config from 'react-native-config';
import {useTranslation} from 'react-i18next';

interface Props {
  handleClose(): void;
}

const MY_DOCS_URL_PROD = 'https://app.slid.cc/docs';

const SlidWebView = ({handleClose}: Props) => {
  const MY_DOCS_URL = Config.MY_DOCS_URL
    ? Config.MY_DOCS_URL
    : MY_DOCS_URL_PROD;
  const HOST = Config.HOST ? Config.HOST : MY_DOCS_URL_PROD;
  const webviewRef = useRef<any>(null);
  const [ableToGoBack, setAbleToGoBack] = useState<boolean>(false);
  const {t} = useTranslation();

  useEffect(() => {
    if (Config.ENV && Config.ENV !== 'production') {
      Alert.alert(
        t('RunningOn', {ns: 'common', env: Config.ENV}),
        Config.MY_DOCS_URL,
      );
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
    if (webviewRef.current.clearCache) webviewRef.current.clearCache();
  }, [webviewRef.current]);

  return (
    <WebView
      userAgent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36 Mobile" // Is it right way?
      pullToRefreshEnabled={true}
      startInLoadingState={true}
      allowsInlineMediaPlayback={true}
      source={{uri: MY_DOCS_URL}}
      allowsBackForwardNavigationGestures={true}
      mixedContentMode="always"
      originWhitelist={['https://*', 'http://*']}
      overScrollMode={'never'}
      ref={webviewRef}
      style={styles.container}
      injectedJavaScript={`
        (function() {
            function wrap(fn) {
            return function wrapper() {
                var res = fn.apply(this, arguments);
                window.ReactNativeWebView.postMessage(window.location.href);
                return res;
              }
            }
            history.pushState = wrap(history.pushState);
            history.replaceState = wrap(history.replaceState);
            window.addEventListener('popstate', function() {
            window.ReactNativeWebView.postMessage(window.location.href);
            });
        })();
        true;
        // Debug
        console = new Object();
        console.log = function(log) {
          window.ReactNativeWebView.postMessage(log)
        };
        console.debug = console.log;
        console.error = console.log;

        `}
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
  container: {},
});
export default SlidWebView;
