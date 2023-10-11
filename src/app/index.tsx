import React from "react";
import * as SplashScreen from "expo-splash-screen";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import Navigation from "./navigation";

const App = () => {
  const [appIsReady, setAppIsReady] = React.useState(false);

  /** **************************************** */

  // effect

  React.useEffect(() => {
    (async () => {
      setAppIsReady(true);
    })();
  }, []);

  /** **************************************** */

  // function

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  /** **************************************** */

  // render

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
