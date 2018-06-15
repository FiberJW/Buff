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

export default class PlatformSelectScreen extends Component {
  state = { keyboardIsVisible: false };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({ keyboardIsVisible: true });
  };

  _keyboardDidHide = () => {
    this.setState({ keyboardIsVisible: false });
  };

  render() {
    const linkedPLatforms = this.props.navigation.getParam("validPlatforms");

    return (
      <View style={styles.container}>
        <Text style={styles.prompt}>
          {"what’s your primary platform?".toUpperCase()}
        </Text>

        {linkedPLatforms.map((p, i) => {
          let source;
          switch (p.name) {
            case "pc":
              source = assets.images.pc;
              break;
            case "xb1":
              source = assets.images.xb1;
              break;
            case "ps4":
              source = assets.images.ps4;
              break;
            default:
              source = assets.images.pc;
              break;
          }
          return (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("ConfirmPlatform", {
                  platform: p.name
                })
              }
              key={i}
              style={styles.platformContainer}
            >
              <Image
                style={styles.platform}
                source={source}
                resizeMode="contain"
              />
            </TouchableOpacity>
          );
        })}
        <Image
          source={assets.images.monkaS}
          style={styles.monkaS}
          resizeMode="contain"
        />
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
  monkaS: { position: "absolute", bottom: 0, left: 0, height: 72 }
});
