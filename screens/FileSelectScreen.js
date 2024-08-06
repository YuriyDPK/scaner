import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";

export default function FileSelectScreen({ navigation }) {
  const [fileUri, setFileUri] = useState(null);
  const [fileName, setFileName] = useState(""); // Хранение названия файла

  // Функция для выбора файла вручную
  const selectFileManually = async () => {
    try {
      // Используем DocumentPicker для выбора файла
      const result = await DocumentPicker.getDocumentAsync({});
      console.log("Результат выбора файла:", result); // Логируем результат выбора

      // Проверяем, что выбор файла не был отменен и файл выбран успешно
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const fileAsset = result.assets[0]; // Получаем первый элемент из массива assets
        setFileUri(fileAsset.uri);
        setFileName(fileAsset.name);
        Alert.alert("Файл выбран", `Выбран файл: ${fileAsset.name}`);

        // Переход на FormScreen с передачей данных о файле
        navigation.navigate("FormScreen", {
          fileUri: fileAsset.uri,
          fileName: fileAsset.name,
        });
      } else {
        Alert.alert("Выбор файла отменен", "Пожалуйста, выберите файл.");
      }
    } catch (error) {
      console.error("Ошибка при выборе файла:", error); // Логируем ошибки
      Alert.alert("Ошибка", "Не удалось выбрать файл.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выбор файла</Text>
      <Button title="Выбрать файл вручную" onPress={selectFileManually} />
      {fileUri ? (
        <Text style={styles.fileName}>Выбранный файл: {fileName}</Text> // Отображение названия файла
      ) : (
        <Text style={styles.fileName}>Файл не выбран</Text>
      )}
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
  fileName: {
    fontSize: 16,
    marginTop: 20,
  },
});
