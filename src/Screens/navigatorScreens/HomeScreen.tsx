import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker, Region} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {fp, hp, wp} from '../../utils/dimensions';
import {typography} from '../../../assets/fonts/typography';
import {colors} from '../../utils/colors';
import OrderDetail from '../../Modals/OrderDetail';
import OrderConfirmedModal from '../../Modals/OrderConfirmedModal';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const DEFAULT_REGION: Region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
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

const HomeScreen: React.FC = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isOrderConfirmedVisible, setIsOrderConfirmedVisible] =
    useState<boolean>(false);

  const mapRef = useRef<MapView | null>(null);

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
          },
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
      if (!hasPermission) {
        setLoading(false);
        return;
      }

      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          const coords = {latitude, longitude};
          setLocation(coords);
          setLoading(false);

          mapRef.current?.animateToRegion(
            {
              ...coords,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            1000,
          );
        },
        error => {
          console.warn(error.message);
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 20000,
        },
      );
    };

    getCurrentLocation();

    const timer = setTimeout(() => {
      setIsModalVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {!isOrderConfirmedVisible && (
        <View style={styles.topBar}>
          <Text style={styles.orderText}>
            {isModalVisible ? 'Accept or Decline' : 'Looking for Orders'}
          </Text>

          {!isModalVisible && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.toggleButton,
                {backgroundColor: isOnline ? colors.GREEN : colors.RED},
              ]}
              onPress={() => setIsOnline(!isOnline)}>
              <Text style={styles.toggleText}>
                {isOnline ? 'Online' : 'Offline'}
              </Text>
              <View style={styles.radioOuter}>
                {isOnline && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}

      <MapView
        ref={mapRef}
        style={styles.map}
        customMapStyle={customMapStyle}
        initialRegion={DEFAULT_REGION}>
        {location && (
          <Marker
            coordinate={location}
            title="You are here"
            pinColor="blue"
          />
        )}
      </MapView>

      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.BLUE} />
        </View>
      )}

      <OrderDetail
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAccept={() => {
          setIsModalVisible(false);
          setIsOrderConfirmedVisible(true);
        }}
      />

      <OrderConfirmedModal
        visible={isOrderConfirmedVisible}
        onClose={() => setIsOrderConfirmedVisible(false)}
      />
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
    paddingTop: hp(4),
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
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.7),
    borderRadius: wp(5),
  },
  toggleText: {
    color: colors.WHITE,
    fontFamily: typography.DMSans_Medium_500,
    fontSize: fp(1.6),
    marginRight: wp(1),
  },
  radioOuter: {
    width: wp(3),
    height: wp(3),
    borderRadius: wp(1.5),
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
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
