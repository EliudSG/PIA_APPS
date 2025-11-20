import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import ContactFormScreen from "./screens/ContactFormScreen";
import ContactDetailScreen from "./screens/ContactDetailScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Form" component={ContactFormScreen} />
        <Stack.Screen name="Detail" component={ContactDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}