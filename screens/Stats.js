import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo";
import colors from "../colors";
import assets from "../assets";
import { observer, inject } from "mobx-react";
import moment from "moment";

const MatchType = ({ type, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.matchTypeContainer,
      active ? { backgroundColor: colors.blue } : null
    ]}
  >
    <Text
      includeFontPadding={false}
      textAlignVertical="center"
      style={[styles.matchType, active ? null : { color: colors.blue }]}
    >
      {type.toUpperCase()}
    </Text>
  </TouchableOpacity>
);

const Stat = ({ name, value }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8
    }}
  >
    <Text
      style={{ textAlign: "left", fontFamily: "Inter UI Medium", fontSize: 16 }}
    >
      {name.toUpperCase()}:
    </Text>
    <Text
      style={{ textAlign: "right", fontFamily: "Inter UI Bold", fontSize: 16 }}
    >
      {value}
    </Text>
  </View>
);

class StatsScreen extends Component {
  state = { matchType: "solo", displayName: "" };

  async componentDidMount() {
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
      this.setState({ displayName });
      this.props.appState.stats = stats[this.props.appState.platform];
    } catch (e) {
      Alert.alert("An Error Occurred While Fetching Stats", e);
    }
  }

  render() {
    const overallKD =
      this.props.appState.stats &&
      this.props.appState.stats.all.kills /
        (this.props.appState.stats.all.matchesPlayed -
          this.props.appState.stats.all.wins);

    let elimsNeededToday = null;
    let matchesToPlayToday = null;
    if (this.props.appState.stats) {
      elimsNeededToday = Math.ceil(
        (this.props.appState.kd *
          (this.props.appState.stats.all.matchesPlayed -
            this.props.appState.stats.all.wins) -
          this.props.appState.stats.all.kills) /
          365
      );
      matchesToPlayToday = Math.ceil(elimsNeededToday / this.props.appState.kd);
    }

    return this.props.appState.stats ? (
      <View behavior="padding" style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.nickName}>{this.state.displayName}</Text>
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
            onPress={() => this.props.navigation.navigate("ChangeSettings")}
          >
            <Image
              source={assets.images[`avatar${this.props.appState.kd}`]}
              resizeMode="contain"
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.matchTypes}>
            <MatchType
              type="solo"
              active={this.state.matchType === "solo"}
              onPress={() => {
                this.setState({ matchType: "solo" });
              }}
            />
            <MatchType
              type="duo"
              active={this.state.matchType === "duo"}
              onPress={() => {
                this.setState({ matchType: "duo" });
              }}
            />
            <MatchType
              type="squad"
              active={this.state.matchType === "squad"}
              onPress={() => {
                this.setState({ matchType: "squad" });
              }}
            />
          </View>

          <View style={styles.statsBorder}>
            <View style={styles.statsContainer}>
              {Object.keys(this.props.appState.stats[this.state.matchType])
                .filter(k => {
                  if (k === "lastMatch" || k === "minutesPlayed" || k == "tpm")
                    return false;
                  return true;
                })
                .map((k, i) => (
                  <Stat
                    name={k}
                    key={i}
                    value={this.props.appState.stats[this.state.matchType][k]}
                  />
                ))}
            </View>
          </View>
          <View
            style={{
              backgroundColor: colors.yellow,
              shadowColor: "black",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.35,
              shadowRadius: 4,
              margin: 24
            }}
          >
            <Text
              style={{
                fontFamily: "Josefin Sans SemiBold Italic",
                fontSize: 18,
                textAlign: "center",
                marginTop: 16
              }}
            >
              DAILY GOAL
            </Text>
            <View
              style={{
                flex: 1,
                borderRadius: 18,
                backgroundColor: "rgba(0,0,0,0.5)",
                margin: 16,
                padding: 16,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter UI Bold",
                  fontSize: 20,
                  textAlign: "center",
                  color: "white"
                }}
              >
                {matchesToPlayToday} MATCHES
              </Text>
              <Text
                style={{
                  fontFamily: "Inter UI Bold",
                  fontSize: 20,
                  textAlign: "center",
                  color: "white"
                }}
              >
                {Math.ceil(elimsNeededToday / matchesToPlayToday)}{" "}
                ELIMINATIONS/MATCH
              </Text>
            </View>
          </View>
        </ScrollView>
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
    flex: 1
  },
  header: {
    backgroundColor: colors.background,
    padding: 16,
    flexDirection: "row",
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
  matchTypes: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 24
  },
  matchTypeContainer: {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  matchType: {
    fontFamily: "Josefin Sans Bold",
    fontSize: 18,
    textAlignVertical: "center",
    textAlign: "center",
    color: "white",
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  statsBorder: {
    paddingVertical: 24,
    backgroundColor: colors.blue,
    borderRadius: 12,
    marginHorizontal: 24
  },
  statsContainer: {
    width: "100%",
    backgroundColor: "white",
    padding: 16
  }
});

export default inject("appState")(observer(StatsScreen));
