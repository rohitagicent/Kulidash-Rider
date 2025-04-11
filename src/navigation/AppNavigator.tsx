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
import RiderVerificationScreen from '../Screens/profileSetup/RiderVerificationScreen';
import VehicleInfoScreen from '../Screens/profileSetup/VehicleInfoScreen';
import UploadDocument from '../Screens/profileSetup/UploadDocument';
import VehicleImage from '../Screens/profileSetup/VehicleImage';
import AllsetScreen from '../Screens/profileSetup/AllsetScreen';
import RiderNavigator from './RiderNavigator';

type RootStackParamList = {
  OnboardingScreen: undefined; 
  LoginScreen: { loginId: string; password: string };
  SingupScreen:{name:string, phone:number, email:string, preferredArea:string}
  UploadImageScreen:{Image: string}
  UserDetailScreen:{name:string, phone:number, email:string, preferredArea:string}
  RiderVerificationScreen:undefined;
  VehicleInfoScreen:undefined;
  UploadDocument:undefined;
  VehicleImage:undefined;
  AllsetScreen:undefined;
  RiderNavigator:undefined;
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
        <Stack.Screen
          name="RiderVerificationScreen"
          component={RiderVerificationScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="VehicleInfoScreen"
          component={VehicleInfoScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="UploadDocument"
          component={UploadDocument}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="VehicleImage"
          component={VehicleImage}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="AllsetScreen"
          component={AllsetScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="RiderNavigator"
          component={RiderNavigator}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
