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
  const [linkedDevices, setLinkedDevices] = useState<string[]>([]);

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

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScannedData({
      data: data,
      date: new Date().toLocaleString(),
    });
    setAddDevice(false);
    setLinkedDevices([...linkedDevices, scannedData.data]);
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
              {linkedDevices.length} of 1 devices linked
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
              <View style={styles.circle}></View>
              <View>
                <Text style={styles.textWhite}>
                  {scannedData.data || "No Device Linked"}
                </Text>
                <Text style={styles.textWhite}>
                  {scannedData.date || "No Date"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LinkedDevicesScreen;
