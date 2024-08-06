import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as FileSystem from "expo-file-system";

export default function FileSearchScreen({ navigation }) {
  const [fileFound, setFileFound] = useState(false);

  useEffect(() => {
    const searchForFile = async () => {
      try {
        // Simulate accessing a USB device's file system
        const files = await simulateFileSearchOnDevice();
        if (files.includes("DataXYZ.txt")) {
          setFileFound(true);
          navigation.navigate("FormScreen");
        } else {
          Alert.alert(
            "File not found",
            "DataXYZ.txt could not be found on the device."
          );
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred while searching for the file.");
      }
    };

    searchForFile();
  }, [navigation]);

  const simulateFileSearchOnDevice = async () => {
    // Replace with actual file search logic when handling native code
    // For now, we simulate a search
    return ["DataXYZ.txt"]; // Simulate the presence of the file
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>File Search</Text>
      {!fileFound && <Text>Searching for DataXYZ.txt on USB device...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
