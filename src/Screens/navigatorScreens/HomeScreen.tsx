import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { fp, hp, wp } from '../../utils/dimensions';
import { typography } from '../../../assets/fonts/typography';
import { colors } from '../../utils/colors';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const customMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }],
  },
  {
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#616161' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#f5f5f5' }],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road.arterial',
    stylers: [{ color: '#e0e0e0' }],
  },
  {
    featureType: 'road.highway',
    stylers: [{ color: '#dadada' }],
  },
  {
    featureType: 'road.local',
    stylers: [{ color: '#f0f0f0' }],
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'water',
    stylers: [{ color: '#c9c9c9' }],
  },
];

const HomeScreen: React.FC = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [loading, setLoading] = useState(true);

  const requestLocationPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const getCurrentLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return;

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setLoading(false);
        },
        (error) => {
          console.warn(error.message);
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    };

    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.orderText}>Looking for Orders</Text>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            {
              backgroundColor: isOnline ? colors.GREEN : colors.RED,
            },
          ]}
          onPress={() => setIsOnline(!isOnline)}
        >
          <Text style={styles.toggleText}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
          <View style={styles.radioOuter}>
            {isOnline && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
      </View>

      {/* Map or Loader */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.BLUE} />
        </View>
      ) : location ? (
        <MapView
          style={styles.map}
          customMapStyle={customMapStyle}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          } as Region}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="You are here"
            description="This is your current location"
            pinColor="blue"
          />
        </MapView>
      ) : null}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: hp(8),
    paddingHorizontal: hp(3),
    paddingBottom: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  orderText: {
    fontSize: fp(2),
    fontFamily: typography.DMSans_Semibold_600,
    color: colors.HEADING,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.7),
    borderRadius: wp(5),
  },
  toggleText: {
    color: colors.WHITE,
    fontFamily: typography.DMSans_Bold_700,
    fontSize: fp(1.8),
    marginRight: wp(1.5),
  },
  radioOuter: {
    width: wp(4),
    height: wp(4),
    borderRadius: wp(2),
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: colors.WHITE,
  },
  map: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
