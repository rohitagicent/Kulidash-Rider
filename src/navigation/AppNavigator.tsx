import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import OnboardingScreen from '../Screens/OnboardingScreen';
import LoginScreen from '../Screens/profileSetup/LoginScreen';
import SingupScreen from '../Screens/profileSetup/SingupScreen';
import UploadImageScreen from '../Screens/profileSetup/UploadImageScreen';
import UserDetailScreen from '../Screens/profileSetup/UserDetailScreen';

type RootStackParamList = {
  OnboardingScreen: undefined; 
  LoginScreen: { loginId: string; password: string };
  SingupScreen:{name:string, phone:number, email:string, preferredArea:string}
  UploadImageScreen:{Image: string}
  UserDetailScreen:{name:string, phone:number, email:string, preferredArea:string}
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="SingupScreen"
          component={SingupScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="UploadImageScreen"
          component={UploadImageScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="UserDetailScreen"
          component={UserDetailScreen}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
