import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo";
import colors from "../colors";
import assets from "../assets";
import State from "../State";

export default class ConfirmPlatformScreen extends Component {
  state = { keyboardIsVisible: false };

  render() {
    const platform = this.props.navigation.getParam("platform", "pc");

    let platformName;
    let source;
    switch (platform) {
      case "pc":
        platformName = "PC";
        source = assets.images.pc;
        break;
      case "xb1":
        platformName = "Xbox One";
        source = assets.images.xb1;
        break;
      case "ps4":
        platformName = "PS4";
        source = assets.images.ps4;
        break;
      default:
        break;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.prompt}>
          {`You want to Improve your stats on ${platformName}, right?`.toUpperCase()}
        </Text>
        <Image source={source} style={styles.platform} resizeMode="contain" />
        <View
          style={{
            position: "absolute",
            bottom: 64,
            left: 0,
            right: 0
          }}
        >
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              State.platform = platform;
              this.props.navigation.navigate("ChooseGoalKD");
            }}
          >
            <Text style={styles.buttonText}>CONFIRM</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background
  },
  prompt: {
    fontFamily: "Josefin Sans",
    color: "white",
    position: "absolute",
    top: 74,
    right: 0,
    left: 0,
    fontSize: 24,
    marginHorizontal: 32,
    textAlign: "center"
  },
  platformContainer: { marginTop: 32 },
  platform: { height: 96 },
  buttonContainer: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },

  buttonText: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    textAlign: "center",
    fontSize: 18,
    color: "white",
    fontFamily: "Josefin Sans SemiBold"
  }
});
