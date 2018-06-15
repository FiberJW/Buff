import "babel-polyfill";
import React from "react";
import { Font, AppLoading, Asset } from "expo";
import { StyleSheet, Text, View, StatusBar, Platform } from "react-native";
import { createStackNavigator, SafeAreaView } from "react-navigation";
import colors from "./colors";
import assets from "./assets";
import Entry from "./screens/Entry";
import PlatformSelect from "./screens/PlatformSelect";
import ConfirmPlatform from "./screens/ConfirmPlatform";
import ChooseGoalKD from "./screens/ChooseGoalKD";
import ChooseTargetDate from "./screens/ChooseTargetDate";
import ChangeSettings from "./screens/ChangeSettings";
import Stats from "./screens/Stats";
import { observer, Provider } from "mobx-react";
import State from "./State";

const Navigator = createStackNavigator(
  {
    Entry,
    PlatformSelect,
    ConfirmPlatform,
    ChooseGoalKD,
    ChooseTargetDate,
    ChangeSettings,
    Stats
  },
  {
    initialRouteName: "Entry",
    headerMode: "none",
    cardStyle: { shadowRadius: 0, shadowColor: "transparent" }
  }
);

class App extends React.Component {
  state = {
    isReady: false
  };

  startAsync = async () => {
    const images = Object.values(assets.images);

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    await Promise.all([Font.loadAsync(assets.fonts), ...cacheImages]);
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.startAsync}
          onFinish={() => {
            this.setState({ isReady: true });
          }}
          onError={console.warn}
        />
      );
    }

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
          paddingTop: StatusBar.currentHeight
        }}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.background}
        />
        <View style={styles.container}>
          <Provider appState={State}>
            <Navigator persistenceKey="jw" />
          </Provider>
        </View>
      </SafeAreaView>
    );
  }
}

export default observer(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
});
