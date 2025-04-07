import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import OnboardingScreen from '../Screens/OnboardingScreen';

// Define RootStackParamList (types for the screens)
type RootStackParamList = {
  OnboardingScreen: undefined; // 'undefined' means no parameters passed to this screen
};

// Create the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

// Define the AppNavigator component
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
