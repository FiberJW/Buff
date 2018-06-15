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
  Keyboard,
  FlatList,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo";
import colors from "../colors";
import assets from "../assets";
import Carousel from "react-native-snap-carousel";

const ranges = [
  {
    value: 2.0,
    image: assets.images.KD2,
    key: "2kd"
  },
  {
    value: 4.0,
    image: assets.images.KD4,
    key: "4kd"
  },
  {
    value: 6.0,
    image: assets.images.KD6,
    key: "6kd"
  },
  {
    value: 8.0,
    image: assets.images.KD8,
    key: "8kd"
  },
  {
    value: 10.0,
    image: assets.images.KD10,
    key: "10kd"
  }
];

export default class ChooseGoalKDScreen extends Component {
  state = {
    activeSlide: 0
  };
  render() {
    let kd = ranges[this.state.activeSlide].value;

    return (
      <View style={styles.container}>
        <Text style={styles.prompt}>
          {`choose a goal k/d ratio`.toUpperCase()}
        </Text>

        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 3,
            borderColor: "white"
          }}
          onSnapToItem={index => this.setState({ activeSlide: index })}
          containerCustomStyle={{ flexGrow: 0 }}
          data={ranges}
          renderItem={({ item }) => (
            <Image
              style={styles.skin}
              source={item.image}
              resizeMode="contain"
            />
          )}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={230}
        />
        <Text style={styles.kdText}>
          KD > {kd >= 10 ? kd.toPrecision(3) : kd.toPrecision(2)}
        </Text>
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
            onPress={() =>
              this.props.navigation.navigate("ChooseTargetDate", { kd })
            }
          >
            <Text style={styles.buttonText}>CONTINUE</Text>
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
  skin: { height: 300, alignSelf: "center" },
  kdText: {
    paddingTop: 32,
    textAlign: "center",
    fontSize: 36,
    color: "white",
    fontFamily: "Josefin Sans SemiBold"
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
