import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Импорт экранов
import ConnectScreen from "./screens/ConnectScreen";
import PermissionScreen from "./screens/PermissionScreen";
import FileSelectScreen from "./screens/FileSelectScreen";
import FormScreen from "./screens/FormScreen";

// Создание стек-навигации
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ConnectScreen" // Устанавливаем начальный экран
        screenOptions={{ headerShown: false }} // Отключаем отображение заголовка
      >
        <Stack.Screen name="ConnectScreen" component={ConnectScreen} />
        <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
        <Stack.Screen name="FileSelectScreen" component={FileSelectScreen} />
        <Stack.Screen name="FormScreen" component={FormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
