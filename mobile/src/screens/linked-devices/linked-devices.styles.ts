import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    width: "100%",
    height: "100%",
  },
  textWhite: {
    color: "#FFFFFF",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  addDevice: {
    justifyContent: "center",
    alignItems: "center",
  },
  addDeviceButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#00A884",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  linkedDevices: {
    marginTop: 30,
    width: "100%",
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#707070",
  },
  linkedDevice: {
    marginTop: 20,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: "#00A884",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addDeviceContainer: {
    zIndex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
});
