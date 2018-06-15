import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
  FlatList,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo";
import colors from "../colors";
import assets from "../assets";
import moment from "moment";
import { observer, inject } from "mobx-react";

class ChangeSettingsScreen extends Component {
  async componentDidMount() {
    if (!this.props.appState.state) {
      try {
        const response = await fetch(
          `https://fortnite.y3n.co/v2/player/${this.props.appState.nickname}`,
          {
            headers: {
              "User-Agent": "Buff",
              "X-Key": "PXvX3GV0H82xqcZES4sT"
            },
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors" // no-cors, cors, *same-origin
          }
        );

        const {
          br: { stats },
          displayName
        } = await response.json();
        this.props.appState.stats = stats[this.props.appState.platform];
      } catch (e) {
        Alert.alert("An Error Occurred While Fetching Stats", e);
      }
    }
  }

  render() {
    const overallKD =
      this.props.appState.stats &&
      this.props.appState.stats.all.kills /
        (this.props.appState.stats.all.matchesPlayed -
          this.props.appState.stats.all.wins);

    return this.props.appState.stats ? (
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.nickName}>{this.props.appState.nickname}</Text>
            <Text style={styles.overallStat}>
              TOTAL ELIMINATIONS: {this.props.appState.stats.all.kills}
            </Text>
            <Text style={styles.overallStat}>
              MATCHES PLAYED: {this.props.appState.stats.all.matchesPlayed}
            </Text>
            <Text style={styles.overallStat}>
              OVERALL K/D:{" "}
              {overallKD >= 10
                ? overallKD.toPrecision(4)
                : overallKD.toPrecision(3)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Stats")}
          >
            <Image
              source={assets.images[`avatar${this.props.appState.kd}`]}
              resizeMode="contain"
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.appState.reset(() => this.props.navigation.popToTop());
          }}
          style={styles.touchable}
        >
          <Text style={styles.text}>RESET APP</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center"
  },

  header: {
    backgroundColor: colors.background,
    padding: 16,
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "space-between"
  },
  avatar: {
    height: 72,
    width: 72
  },
  nickName: {
    fontFamily: "Josefin Sans Bold",
    fontSize: 18,
    color: "white",
    marginBottom: 4
  },
  overallStat: {
    marginTop: 4,
    fontFamily: "Inter UI Medium",
    fontSize: 12,
    color: "white"
  },
  prompt: {
    fontFamily: "Josefin Sans",
    color: "white",
    fontSize: 24,
    marginHorizontal: 32,
    textAlign: "center"
  },
  skin: { height: 300, alignSelf: "center" },
  text: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    textAlign: "center",
    fontSize: 24,
    color: "white",
    fontFamily: "Inter UI"
  },
  touchable: {
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.15)"
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

export default inject("appState")(observer(ChangeSettingsScreen));
