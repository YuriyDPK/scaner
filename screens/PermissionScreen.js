import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function PermissionScreen({ navigation }) {
  useEffect(() => {
    const requestPermissions = async () => {
      // Запрашиваем разрешения на доступ к файловой системе
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === "granted") {
        // Если разрешение получено, переходим на экран выбора файла
        navigation.navigate("FileSelectScreen");
      } else {
        Alert.alert(
          "Требуется разрешение",
          "Доступ к файловой системе необходим для работы приложения."
        );
      }
    };

    requestPermissions();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Запрос разрешений</Text>
      <Text>Запрашиваем доступ к файловой системе...</Text>
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
