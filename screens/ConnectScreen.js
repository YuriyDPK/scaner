import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

export default function ConnectScreen({ navigation }) {
  const [deviceConnected, setDeviceConnected] = useState(false);

  useEffect(() => {
    // Функция для проверки подключения устройства
    const checkDeviceConnection = async () => {
      const isConnected = simulateUSBConnectionCheck();
      if (isConnected) {
        setDeviceConnected(true);
        Alert.alert("Устройство подключено", "USB-C устройство подключено.");
        navigation.navigate("PermissionScreen");
      }
    };

    // Запуск интервала для проверки подключения устройства каждые 3 секунды
    const intervalId = setInterval(() => {
      checkDeviceConnection();
    }, 3000);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [navigation]);

  const simulateUSBConnectionCheck = () => {
    // Замените на фактическую логику обнаружения с использованием нативного кода
    return Math.random() > 0.7; // Симуляция случайного подключения устройства (30% шанс)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ANDROSCAN</Text>
      {!deviceConnected && (
        <Text>Ожидание подключения USB-C устройства...</Text>
      )}
      {deviceConnected && <Text>USB-C устройство подключено</Text>}
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
