import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import LinkedDevicesScreen from "./src/screens/linked-devices/linked-devices";

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      if (status !== "granted") {
        alert("Permission to access the camera was denied");
      }
    })();
  }, []);

  return (
    // <View style={styles.container}>
    //   <Camera
    //     style={{
    //       width: "100%",
    //       height: "50%",
    //     }}
    //     type={CameraType.back}
    //   />
    // </View>
    <LinkedDevicesScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
