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
  ScrollView
} from "react-native";
import { LinearGradient } from "expo";
import colors from "../colors";
import assets from "../assets";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

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

export default class ChooseTargetDateScreen extends Component {
  state = {
    isDateTimePickerVisible: false,
    date: moment()
      .add(1, "week")
      .utc()
      .format()
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({ date });
    this._hideDateTimePicker();
  };

  render() {
    let kd = this.props.navigation.getParam("kd", 2.0);

    return (
      <View style={styles.container}>
        <Text style={styles.prompt}>
          {`by when do you want to have a k/d ratio greater than ${
            kd >= 10 ? kd.toPrecision(3) : kd.toPrecision(2)
          }?`.toUpperCase()}
        </Text>

        <TouchableOpacity
          onPress={this._showDateTimePicker}
          style={styles.dateTouchable}
        >
          <Text style={styles.date}>
            {moment(this.state.date).format("MMMM Do YYYY")}
          </Text>
        </TouchableOpacity>

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
              Alert.alert(
                "complete your daily goal to reach your goal k/d on time!".toUpperCase(),
                null,
                [{ text: "👌", onPress: () => console.log("OK Pressed") }]
              );
              this.props.navigation.navigate("Stats");
            }}
          >
            <Text style={styles.buttonText}>SHOW ME HOW</Text>
          </TouchableOpacity>
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
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
  skin: { height: 300, alignSelf: "center" },
  date: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    textAlign: "center",
    fontSize: 24,
    color: "white",
    fontFamily: "Inter UI"
  },
  dateTouchable: {
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
