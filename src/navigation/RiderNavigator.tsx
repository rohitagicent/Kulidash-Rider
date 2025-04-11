import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomTabNavigator } from './CustomTabNavigator';

// Screens - replace these with your actual screens
import HomeScreen from '../Screens/navigatorScreens/HomeScreen';
import PaymentScreen from '../Screens/navigatorScreens/PaymentScreen';
import NotificationScreen from '../Screens/navigatorScreens/NotificationScreen';
import AccountScreen from '../Screens/navigatorScreens/AccountScreen';
import VehicleMaintenanceScreen from '../Screens/navigatorScreens/VehicleScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/** Home Stack */
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

/** Payment Stack */
const PaymentStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

/** Notification Stack */
const NotificationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

/** Account Stack */
const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

/** Vehicle Maintenance Stack */
const VehicleMaintenanceStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VehicleMaintenance"
        component={VehicleMaintenanceScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

/** Bottom Tab Navigator */
const RiderNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabNavigator {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="PaymentTab"
        component={PaymentStack}
        options={{ title: 'Payment' }}
      />
      <Tab.Screen
        name="VehicleMaintenanceTab"
        component={VehicleMaintenanceStack}
        options={{ title: 'Maintenance' }}
      />
      <Tab.Screen
        name="NotificationTab"
        component={NotificationStack}
        options={{ title: 'Notification' }}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountStack}
        options={{ title: 'Account' }}
      />
    </Tab.Navigator>
  );
};

export default RiderNavigator;