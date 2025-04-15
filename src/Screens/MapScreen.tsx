import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {wp, hp, fp} from '../utils/dimensions';
import {colors} from '../utils/colors';
import { typography } from '../../assets/fonts/typography';

type RootStackParamList = {
  Home: undefined;
};

const customMapStyle = [
  {elementType: 'geometry', stylers: [{color: '#f5f5f5'}]},
  {elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#616161'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#f5f5f5'}]},
  {featureType: 'administrative.land_parcel', stylers: [{visibility: 'off'}]},
  {featureType: 'poi', stylers: [{visibility: 'off'}]},
  {featureType: 'road', elementType: 'geometry', stylers: [{color: '#ffffff'}]},
  {featureType: 'road.arterial', stylers: [{color: '#e0e0e0'}]},
  {featureType: 'road.highway', stylers: [{color: '#dadada'}]},
  {featureType: 'road.local', stylers: [{color: '#f0f0f0'}]},
  {featureType: 'transit', stylers: [{visibility: 'off'}]},
  {featureType: 'water', stylers: [{color: '#c9c9c9'}]},
];

const MapScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()}>
        <Icon name="chevron-back" size={24} color={colors.BUTTON_COLOR} />
      </TouchableOpacity>

      {/* Map */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={customMapStyle}
        initialRegion={{
          latitude: 6.5244,
          longitude: 3.3792,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />

      {/* Back to Home Button */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.homeButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  backArrow: {
    position: 'absolute',
    top: hp(5),
    left: wp(4),
    zIndex: 1,
    backgroundColor: colors.LIGHT_GREY,
    padding: wp(1.5),
    borderRadius: wp(3),
    elevation: 2,
  },
  map: {
    flex: 1,
  },
  homeButton: {
    position: 'absolute',
    bottom: hp(4),
    alignSelf: 'center',
    backgroundColor: colors.BLUE,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(10),
    borderRadius: wp(6),
  },
  homeButtonText: {
    color: colors.WHITE,
    fontSize: fp(2.2),
    fontFamily:typography.DMSans_Semibold_600
  },
});
