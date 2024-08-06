import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import * as Sharing from "expo-sharing";

export default function FormScreen({ route }) {
  const { fileUri, fileName } = route.params || {}; // Получаем URI и имя файла
  console.log("Получено имя файла:", fileName); // Логируем для отладки

  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [comments, setComments] = useState("");

  const shareData = async () => {
    if (!fileUri) {
      Alert.alert("Файл не выбран", "Пожалуйста, выберите файл для отправки.");
      return;
    }

    try {
      const message = `
        Здравствуйте, ${recipientName}
        отправляю Вам результаты работы устройства

        Клиент: ${recipientName}
        Email отправителя: ${senderEmail}
        Комментарий: ${comments}
        Дата актуальности файла: ${new Date().toLocaleString()}
      `;

      // Проверка возможности шаринга
      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(fileUri, {
          dialogTitle: "Отправка данных AndroScan",
          mimeType: "text/plain",
          UTI: "public.text",
        });

        Alert.alert("Успех", "Данные успешно отправлены.");
      } else {
        Alert.alert("Отправка недоступна");
      }
    } catch (error) {
      console.error("Ошибка отправки данных:", error); // Логируем ошибки
      Alert.alert("Ошибка", "Не удалось отправить данные.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Заполните форму</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail получателя"
        value={recipientEmail}
        onChangeText={setRecipientEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="ФИО получателя"
        value={recipientName}
        onChangeText={setRecipientName}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail отправителя"
        value={senderEmail}
        onChangeText={setSenderEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="ФИО отправителя"
        value={senderName}
        onChangeText={setSenderName}
      />
      <TextInput
        style={styles.input}
        placeholder="Комментарии"
        value={comments}
        onChangeText={setComments}
      />
      <Button title="Отправить письмо" onPress={shareData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
