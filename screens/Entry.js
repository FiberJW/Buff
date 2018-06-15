import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from "react-native";
import { LinearGradient } from "expo";
import colors from "../colors";
import assets from "../assets";

export default class EntryScreen extends Component {
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
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.logo}>BUFF</Text>
        <View style={{ width: "100%", alignItems: "center" }}>
          {!this.state.keyboardIsVisible && (
            <View style={styles.wickInABox}>
              <Image
                source={assets.images.johnWick}
                style={styles.wick}
                resizeMode="contain"
              />
              <LinearGradient
                elevation={10}
                colors={colors.goldGradient}
                style={styles.wickTextBox}
              >
                <Text style={styles.wickText}>
                  {"So, you want to\nimprove your\nfortnite stats, huh?".toUpperCase()}
                </Text>
              </LinearGradient>
            </View>
          )}
          <View style={{ width: "100%", alignItems: "center", marginTop: 32 }}>
            <Text style={styles.usernameFieldLabel}>WHO ARE YOU?</Text>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid="transparent"
              placeholder="Enter Epic nickname here"
              placeholderTextColor="rgba(255,255,255,0.3)"
            />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate("PlatformSelect")}
            >
              <Text style={styles.buttonText}>ENTER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  logo: {
    fontFamily: "Josefin Sans Bold",
    fontSize: 32,
    position: "absolute",
    color: "white",
    top: Platform.OS === "ios" ? 16 : 0,
    left: 16
  },
  wickInABox: {
    alignItems: "center",
    width: "100%"
  },
  wick: {
    height: 256,
    width: 256
  },
  wickTextBox: {
    elevation: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    marginTop: -32,
    justifyContent: "center",
    alignItems: "center",
    width: "90%"
  },
  wickText: {
    paddingVertical: 16,
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Josefin Sans SemiBold Italic"
  },
  usernameFieldLabel: {
    fontFamily: "Josefin Sans",
    color: "white",
    fontSize: 24,
    textAlign: "center"
  },
  textInput: {
    fontFamily: "Inter UI",
    fontSize: 18,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.15)",
    padding: 16,
    width: "80%",
    textAlign: "center",
    marginVertical: 32
  },
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
