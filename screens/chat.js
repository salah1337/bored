import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  Button,
  Platform,
} from "react-native";
import StyleSheet from "react-native-media-query";
import { FlatList, TextInput, TouchableOpacity } from "react-native";
import TopBar from "../components/topBar";
import Abutton from "../components/abutton";
import { globalStyle } from "../styles/main";
import { API_URL, DEV } from "@env";
import io from "socket.io-client";
import { userStore } from "../store/User";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: "",
      msgs: [],
      started: false,
    };
  }
  componentDidMount() {
    this.setState({
      msgs: [
        {
          text: "Welcome to text chat, click start to begin!",
          fromServer: true,
        },
      ],
    });

    this.socket = io.connect("https://1c80-105-158-197-111.ngrok.io/chat");

    this.socket.on("rooms", (rooms) => {
      console.log("rooms: " + JSON.stringify(rooms));
    });

    this.socket.on("newMsg", (data) => {
      this.updateMsgs(data.msg, "stranger");
    });

    this.socket.on("foundStranger", () => {
      this.updateMsgs("Found New Stranger, Say Hi!", "server", true);
    });

    this.socket.on("strangerLeft", () => {
      this.updateMsgs("Stranger Left, looking for new room...", "server");
    });

    this.socket.on("joinRoom", (roomId) => {
      this.socket.emit("joinRoom", roomId);
    });

    this.socket.on("queueUp", () => {
      this.socket.emit("queueUp");
    });

    this.socket.on("addedToQueue", () => {
      this.updateMsgs("No Stranger Found, waiting on queue...", "server");
    });

    this.socket.on("count", (count) => {
      userStore.setUserCount(count);
    });
  }
  start = () => {
    this.state.started = true;
    this.socket.emit("start");
    this.updateMsgs("Looking for stranger...", "server", true);
  };
  sendMsg = () => {
    this.socket.emit("newMsg", { msg: this.state.msg, id: this.socket.id });
    this.updateMsgs(this.state.msg);
  };
  componentWillUnmount() {
    this.socket.emit("leftChat");
    // this.socket.disconnect()
  }
  stop() {
    this.setState({ started: false });
    this.socket.emit("unQueue");
    this.updateMsgs("Left queue, press start to rejoin!", "server", true);
  }
  updateMsgs = (newMsg, from, reset) => {
    if (newMsg) {
      if (reset) {
        this.setState({
          msgs: [
            {
              text: newMsg,
              romStranger: from == "stranger",
              fromServer: from == "server",
            },
          ],
          msg: "",
        });
      } else {
        this.setState({
          msgs: [
            {
              text: newMsg,
              fromStranger: from == "stranger",
              fromServer: from == "server",
            },
            ...this.state.msgs,
          ],
          msg: "",
        });
      }
    }
  };
  render() {
    const { msg, msgs, started } = this.state;
    return (
      <ImageBackground
        resizeMode="repeat"
        source={require("../assets/img/bg.png")}
        style={styles.container}
      >
        <View style={styles.wrapper}>
          <TopBar navigation={this.props.navigation} />

          <View style={styles.chatBox}>
            <FlatList
              inverted={-1}
              data={msgs}
              style={{ padding: 10 }}
              renderItem={({ item }) => (
                <Text>
                  {item.fromStranger ? (
                    <Text style={{ color: "#ff0000", fontWeight: "bold" }}>
                      Stranger:{" "}
                    </Text>
                  ) : item.fromServer ? (
                    <Text style={{ color: "#000", fontWeight: "bold" }}>
                      Server:{" "}
                    </Text>
                  ) : (
                    <Text style={{ color: "#0000ff", fontWeight: "bold" }}>
                      You:{" "}
                    </Text>
                  )}
                  {item.text}
                </Text>
              )}
            />
          </View>

          <View style={styles.bottomBar}>
            <TouchableOpacity
              onPress={this.start}
              style={[
                styles.bottomBarBtn,
                {
                  width: this.state.started
                    ? Platform.OS == "ios" || "android"
                      ? 60
                      : 100
                    : Platform.OS == "ios" || "android"
                    ? 80
                    : 200,
                  marginRight: 8,
                },
              ]}
            >
              <View
                style={[
                  {
                    flex: 1,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  this.state.started
                    ? globalStyle.blueBtn
                    : globalStyle.greenBtn,
                ]}
              >
                <Text style={[globalStyle.textMd, globalStyle.textWhite]}>
                  {this.state.started ? "Skip" : "Start"}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.stop()}
              style={[
                styles.bottomBarBtn,
                {
                  width: this.state.started
                    ? Platform.OS == "ios" || "android"
                      ? 60
                      : 100
                    : Platform.OS == "ios" || "android"
                    ? 80
                    : 200,
                },
                this.state.started ? { display: "flex" } : { display: "none" },
              ]}
            >
              <View
                style={[
                  {
                    flex: 1,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  globalStyle.redBtn,
                ]}
              >
                <Text style={[globalStyle.textMd, globalStyle.textWhite]}>
                  Stop
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.chatInput}>
              <TextInput
                editable={started}
                onChangeText={(text) => this.setState({ msg: text })}
                value={msg}
                style={{ flex: 1 }}
                onKeyPress={(e) => {
                  if (e.nativeEvent.key == "Enter") this.sendMsg(msg);
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.sendMsg(msg)}
              style={[styles.chatSend, globalStyle.grayBtn]}
            >
              <Text>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
export default Chat;
const { ids, styles } = StyleSheet.create({
  wrapper: {
    width: "90%",
    height: "100%",
    paddingBottom: 15,
  },
  container: {
    alignItems: "center",
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttons: {
    margin: 10,
    padding: 10,
  },
  chatBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 4,
    marginBottom: 10,
  },
  bottomBar: {
    width: "100%",
    flexDirection: "row",
    height: "20%",
  },
  bottomBarBtn: {
    height: "100%",
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 500px)": {
      width: 100,
    },
  },
  chatInput: {
    height: "100%",
    flex: 1,
    backgroundColor: "#fff",
    marginLeft: 10,
    borderRadius: 2,
  },
  chatSend: {
    height: "100%",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 500px)": {
      width: 50,
    },
  },
});
