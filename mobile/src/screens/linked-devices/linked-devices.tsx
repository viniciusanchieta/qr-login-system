import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./linked-devices.styles";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";

function LinkedDevicesScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [addDevice, setAddDevice] = useState(false);
  const [scannedData, setScannedData] = useState({
    data: "",
    date: "",
  });
  const [linkedDevices, setLinkedDevices] = useState(false);

  const userId = "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed";

  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      if (status !== "granted") {
        alert("Permission to access the camera was denied");
      }
    })();
  }, []);

  const handleAddDevice = () => {
    setAddDevice(!addDevice);
  };

  const handleBarCodeScanned = async ({ data = "" }) => {
    setAddDevice(false);

    const tokenDecode = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/decode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "insomnia/8.4.0",
        },
        body: `{
        "token": "${data}"
      }`,
      }
    );

    const tokenDecodeJson = (await tokenDecode.json()) as {
      code: string;
      browserName: string;
      deviceName: string;
      fullBrowserVersion: string;
    };

    await fetch(`${process.env.EXPO_PUBLIC_API_URL}/linked-device`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "insomnia/8.4.0",
      },
      body: JSON.stringify({
        code: tokenDecodeJson.code,
        authToken: data,
        browserName: tokenDecodeJson.browserName,
        deviceName: tokenDecodeJson.deviceName,
        fullBrowserVersion: tokenDecodeJson.fullBrowserVersion,
        userId,
      }),
    });

    setLinkedDevices(true);

    setScannedData({
      data: `${tokenDecodeJson.deviceName} - ${tokenDecodeJson.browserName}`,
      date: new Date().toLocaleString(),
    });
  };

  const handleDeleteDevice = async () => {
    await fetch(`${process.env.EXPO_PUBLIC_API_URL}/linked-device/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "insomnia/8.4.0",
      },
    });

    setLinkedDevices(false);
    setScannedData({
      data: "",
      date: "",
    });
  };

  return (
    <SafeAreaView
      style={{
        borderColor: "red",
      }}
    >
      <View style={styles.container}>
        {addDevice && (
          <View style={styles.addDeviceContainer}>
            <Camera
              style={{
                width: "100%",
                height: "50%",
              }}
              type={CameraType.back}
              onBarCodeScanned={handleBarCodeScanned}
            />
            <TouchableOpacity
              style={styles.addDeviceButton}
              onPress={handleAddDevice}
            >
              <Text style={styles.textWhite}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.header}>
          <Text style={styles.textWhite}>Linked Devices</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.addDevice}>
            <Text style={styles.textWhite}>
              {linkedDevices ? "1" : "0"} of 1 devices linked
            </Text>
            <TouchableOpacity
              style={styles.addDeviceButton}
              onPress={handleAddDevice}
            >
              <Text style={styles.textWhite}>Add Device</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.linkedDevices}>
            <Text style={styles.textWhite}>Linked Devices</Text>
            <View style={styles.linkedDevice}>
              {linkedDevices ? (
                <View style={styles.circleActive} />
              ) : (
                <View style={styles.circleInactive} />
              )}
              <View>
                <Text style={styles.textWhite}>
                  {scannedData.data || "No Device Linked"}
                </Text>
                <Text style={styles.textWhite}>
                  {scannedData.date || "No Date"}
                </Text>
              </View>
              {linkedDevices && (
                <TouchableOpacity
                  style={styles.deleteDeviceButton}
                  onPress={handleDeleteDevice}
                >
                  <Text style={styles.textWhite}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LinkedDevicesScreen;
