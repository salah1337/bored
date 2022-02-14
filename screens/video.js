import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  Button,
  FlatList,
  Platform,
} from "react-native";
import StyleSheet from "react-native-media-query";
import {
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import TopBar from "../components/topBar";
import { globalStyle } from "../styles/main";
import io from "socket.io-client";

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from "react-native-webrtc-web-shim";
import { videoStore } from "../store/Video";
import { render } from "react-dom";
import { ChatList } from "../components/ChatList";
import { VideoContainer } from "../components/VideoContainer";
import { userStore } from "../store/User";
import MovableView from "react-native-movable-view";

class Video extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      localStream: null,
      remoteStream: null,
      showLocal: false,
      msg: "",
      msgs: [],
      room: { us1: null, us2: null, id: null },
      started: false,
    };
    this.sdp;
    this.socket = null;
    this.candidates = [];
  }

  componentDidMount = () => {
    this.socket = io.connect("https://1c80-105-158-197-111.ngrok.io/video");

    this.socket.on("connection-success", (success) => {
      console.log(success);
    });

    this.socket.on("newMsg", (data) => {
      this.updateMsgs(data.msg, "stranger");
    });

    this.socket.on("foundStranger", (newRoom) => {
      this.updateMsgs("Found New Stranger, Say Hi!", "server", true);
      this.setState({ room: newRoom });
      if (newRoom.us1 == this.socket.id) this.createOffer();
    });
    this.socket.on("strangerLeft", () => {
      this.setState({ remoteStream: null });
      this.updateMsgs("Stranger Left, looking for new room...", "server");
      this.newConnection();
    });

    this.socket.on("joinRoom", (roomId) => {
      this.socket.emit("joinRoom", roomId);
    });

    this.socket.on("queueUp", () => {
      this.socket.emit("queueUp");
    });

    this.socket.on("refresh", () => {
      this.newConnection();
      if (this.state.room.us1 == this.socket.id) this.createOffer();
    });

    this.socket.on("addedToQueue", () => {
      this.updateMsgs("No Stranger Found, waiting on queue...", "server");
    });

    this.socket.on("offerOrAnswer", (sdp) => {
      // set sdp as remote description
      if (sdp != null) console.log("got sdp");
      if (this.socket.id == this.state.room.us1) console.log("i am s1");

      this.pc.setRemoteDescription(new RTCSessionDescription(sdp));
      if (this.state.room.us2 == this.socket.id) {
        this.createAnswer();
        console.log("i am s2");
      }
    });

    this.socket.on("candidate", (candidate) => {
      // console.log('From Peer... ', JSON.stringify(candidate))
      // this.candidates = [...this.candidates, candidate]
      this.pc.addIceCandidate(new RTCIceCandidate(candidate));
    });

    this.socket.on("count", (count) => {
      userStore.setUserCount(count);
    });

    let isFront = true;

    mediaDevices.enumerateDevices().then((sourceInfos) => {
      console.log("source Info: " + sourceInfos);
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == "videoinput" &&
          sourceInfo.facing == (isFront ? "front" : "environment")
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }

      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            width: 640,
            height: 480,
            frameRate: 30,
            facingMode: isFront ? "user" : "environment",
            deviceId: videoSourceId,
          },
        })
        .then((stream) => {
          // Got stream!
          this.setState({
            localStream: stream,
            showLocal: true,
          });
          console.log(this.state.showLocal);
          // success
        })
        .catch((error) => {
          failure;
        });

      // mediaDevices.getUserMedia()
      // .then(success)
      // .catch(failure);
    });
  };
  newConnection() {
    this.setState({ remoteStream: null });
    if (this.pc) this.pc.close();
    const pc_config = {
      iceServers: [
        // {
        //   urls: 'stun:[STUN_IP]:[PORT]',
        //   'credentials': '[YOR CREDENTIALS]',
        //   'username': '[USERNAME]'
        // },
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
    this.pc = new RTCPeerConnection(pc_config);
    this.pc.onicecandidate = (e) => {
      // send the candidates to the remote peer
      // see addCandidate below to be triggered on the remote peer
      if (e.candidate) {
        // console.log(JSON.stringify(e.candidate))
        this.sendToPeer("candidate", e.candidate);
      }
    };

    // triggered when there is a change in connection state
    this.pc.oniceconnectionstatechange = (e) => {
      console.log(e);
    };

    this.pc.onaddstream = (e) => {
      // this.remoteVideoref.current.srcObject = e.streams[0]
      console.log("updated remote stream");
      this.setState({
        remoteStream: e.stream,
      });
    };

    this.pc.addEventListener("iceconnectionstatechange", (event) => {
      if (this.pc.iceConnectionState === "failed") {
        /* possibly reconfigure the connection in some way here */
        /* then request ICE restart */
        this.pc.restartIce();
      }
    });
    this.pc.addStream(this.state.localStream);

    const failure = (e) => {
      console.log("getUserMedia Error: ", e);
    };
  }
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  queue = () => {
    this.socket.emit("start");
    this.updateMsgs("Looking for stranger...", "server", true);
  };
  start = () => {
    // if(!this.pc)
    this.state.started = true;
    this.newConnection();
    this.sleep(2000).then(() => {
      this.queue();
      //// code
    });
  };
  sendMsg = () => {
    this.socket.emit("newMsg", { msg: this.state.msg, id: this.socket.id });
    this.updateMsgs(this.state.msg);
  };
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
  stop() {
    this.setState({ started: false, remoteStream: null });
    this.socket.emit("unQueue");
    this.updateMsgs("Left queue, press start to rejoin!", "server", true);
  }
  getLocalStream() {
    let isFront = true;
    mediaDevices.enumerateDevices().then((sourceInfos) => {
      console.log("source Info: " + sourceInfos);
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == "videoinput" &&
          sourceInfo.facing == (isFront ? "front" : "environment")
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }

      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            width: 640,
            height: 480,
            frameRate: 30,
            facingMode: isFront ? "user" : "environment",
            deviceId: videoSourceId,
          },
        })
        .then((stream) => {
          // Got stream!
          this.setState({
            localStream: stream,
            showLocal: true,
          });
          console.log(this.state.showLocal);
          // success
        })
        .catch((error) => {
          failure;
        });

      // mediaDevices.getUserMedia()
      // .then(success)
      // .catch(failure);
    });
  }
  componentWillUnmount() {
    this.socket.emit("leftChat");

    // this.socket.disconnect()
  }
  sendToPeer = (messageType, payload) => {
    this.socket.emit(messageType, {
      socketID: this.socket.id,
      payload,
    });
  };

  refresh = () => {
    this.socket.emit("refresh", this.state.room);
  };

  createOffer = () => {
    console.log("Offer");

    // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer
    // initiates the creation of SDP
    this.pc
      .createOffer({ offerToReceiveVideo: 1, offerToReceiveAudio: 1 })
      .then((sdp) => {
        // console.log(JSON.stringify(sdp))

        // set offer sdp as local description
        this.pc.setLocalDescription(sdp);

        this.sendToPeer("offerOrAnswer", sdp);
      });
  };

  createAnswer = () => {
    console.log("Answer");
    this.pc
      .createAnswer({ offerToReceiveVideo: 1, offerToReceiveAudio: 1 })
      .then((sdp) => {
        // console.log(JSON.stringify(sdp))

        // set answer sdp as local description
        this.pc.setLocalDescription(sdp);

        this.sendToPeer("offerOrAnswer", sdp);
      });
  };

  setRemoteDescription = () => {
    // retrieve and parse the SDP copied from the remote peer
    const desc = JSON.parse(this.sdp);

    // set sdp as remote description
    this.pc.setRemoteDescription(new RTCSessionDescription(desc));
  };

  addCandidate = () => {
    // retrieve and parse the Candidate copied from the remote peer
    // const candidate = JSON.parse(this.textref.value)
    // console.log('Adding candidate:', candidate)

    // add the candidate to the peer connection
    // this.pc.addIceCandidate(new RTCIceCandidate(candidate))

    this.candidates.forEach((candidate) => {
      console.log(JSON.stringify(candidate));
      this.pc.addIceCandidate(new RTCIceCandidate(candidate));
    });
  };

  render() {
    const { localStream, remoteStream, showLocal, msg, msgs, started } =
      this.state;

    const localVideo = showLocal ? (
      // <RTCView
      //   style={{flex: 1}}
      //   stream={localStream}
      //   objectFit='contain'
      // />
      <VideoContainer stream={localStream} mirror={false} keyy={2} />
    ) : (
      <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 22, textAlign: "center", color: "black" }}>
          Please Allow Camera Permission and click start ...
        </Text>
      </View>
    );

    const remoteVideo = remoteStream ? (
      <VideoContainer keyy={1} mirror={true} stream={remoteStream} />
    ) : (
      <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 22, textAlign: "center", color: "black" }}>
          Waiting for Peer connection ...
        </Text>
      </View>
    );

    return (
      <ImageBackground
        resizeMode="repeat"
        source={require("../assets/img/bg.png")}
        style={styles.container}
      >
        <View style={styles.wrapper}>
          <TopBar navigation={this.props.navigation} />

          <View style={styles.videoBox}>
            <View style={styles.video}>
              {remoteVideo}
              <Button title="refresh" onPress={() => this.refresh()} />
            </View>
            <View style={styles.videosDevider}></View>
            <MovableView
              disabled={!(Platform.OS == "ios" || "android")}
              style={[styles.video, styles.video1]}
            >
              {localVideo}
            </MovableView>
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
              {/* <ChatList msgs={msgs} /> */}
              <FlatList
                inverted={-1}
                data={msgs}
                style={{ paddingHorizontal: 10, paddingTop: 10, flex: 1 }}
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
              <TextInput
                editable={started}
                onChangeText={(text) => this.setState({ msg: text })}
                value={msg}
                style={{
                  backgroundColor: "rgb(182, 182, 182)",
                  height: 35,
                  paddingHorizontal: 4,
                }}
                // onKeyPress={(e) => {
                //   if (e.nativeEvent.key == "Enter") this.sendMsg(msg);
                // }}
                onSubmitEditing={() => this.sendMsg(msg)}
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
export default Video;
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
  videoBox: {
    flex: 1,
    marginBottom: 10,
    flexDirection: "row",
    // position: 'relative',
    "@media (max-width: 500px)": {},
  },
  video: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  video1: {
    "@media (max-width: 500px)": {
      position: "absolute",
      bottom: 0,
      right: 0,
      height: "30%",
      width: "30%",
      backgroundColor: "#232323",
    },
    zIndex: 2,
  },
  videosDevider: {
    paddingHorizontal: 10,
    "@media (max-width: 500px)": {
      display: "none",
    },
  },
  bottomBar: {
    width: "100%",
    flexDirection: "row",
    height: 100,
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
  bottomBarBtn: {
    height: "100%",
    width: 200,
    "@media (max-width: 500px)": {
      width: 100,
    },
  },
});
