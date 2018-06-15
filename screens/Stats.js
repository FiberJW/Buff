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
  ScrollView
} from "react-native";
import { LinearGradient } from "expo";
import colors from "../colors";
import assets from "../assets";

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

export default class StatsScreen extends Component {
  state = { matchType: "solo" };
  render() {
    return (
      <View behavior="padding" style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.nickName}>FIBERJW</Text>
            <Text style={styles.overallStat}>TOTAL ELIMINATIONS: {495}</Text>
            <Text style={styles.overallStat}>MATCHES PLAYED: {5}</Text>
            <Text style={styles.overallStat}>OVERALL K/D: {99}</Text>
          </View>
          <Image
            source={assets.images.avatar4}
            resizeMode="contain"
            style={styles.avatar}
          />
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
              active={this.state.matchType === "squads"}
              onPress={() => {
                this.setState({ matchType: "squads" });
              }}
            />
          </View>

          <View style={styles.statsBorder}>
            <View style={styles.statsContainer}>
              <Stat name="wins" value={15} />
              <Stat name="Eliminations" value={128} />
              <Stat name="K/D" value={97} />
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
                12 MATCHES
              </Text>
              <Text
                style={{
                  fontFamily: "Inter UI Bold",
                  fontSize: 20,
                  textAlign: "center",
                  color: "white"
                }}
              >
                5 ELIMINATIONS/MATCH
              </Text>
            </View>
          </View>
        </ScrollView>
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
