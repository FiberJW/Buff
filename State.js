require("babel-polyfill");
import { observable, action, computed, decorate, autorun } from "mobx";
import moment from "moment";
import { AsyncStorage } from "react-native";

class State {
  constructor() {
    AsyncStorage.getItem("state").then(s => {
      const state = JSON.parse(s);
      if (state) {
        this.nickname = state.nickname;
        this.platform = state.platform;
        this.kd = state.kd;
      }
    });

    autorun(() => {
      const self = this;
      const o = {
        nickname: self.nickname,
        platform: self.platform,
        kd: self.kd
      };
      AsyncStorage.setItem("state", JSON.stringify(o));
    });
  }

  reset = async next => {
    await AsyncStorage.removeItem("state");
    this.nickname = "";
    this.platform = null;
    this.kd = 2.0;
    this.stats = null;
    next();
  };

  nickname = "";
  platform = null;
  kd = 2.0;
  stats = null;
}

decorate(State, {
  nickname: observable,
  platform: observable,
  kd: observable,
  targetDate: observable,
  stats: observable,
  reset: action
});

export default new State();
