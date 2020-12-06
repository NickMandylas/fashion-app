import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Onboarding } from "./src/screens/authentication";
import { NavigationContainer } from "@react-navigation/native";

const AuthenticationStack = createStackNavigator();
const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
    </AuthenticationStack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AuthenticationNavigator />
    </NavigationContainer>
  );
}
