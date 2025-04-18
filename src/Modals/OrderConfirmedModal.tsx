import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Scooter from '../Assets/Scooter.svg';
import Pickup from '../Assets/Pickup.svg';
import Dropoff from '../Assets/DropOff.svg';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../utils/colors';
import {fp, hp, wp} from '../utils/dimensions';
import {typography} from '../../assets/fonts/typography';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

interface OrderConfirmedModalProps {
  visible: boolean;
  onClose: () => void;
  onStartRide?: () => void;
}

type RootStackParamList = {
  MapScreen: undefined;
};

const OrderConfirmedModal: React.FC<OrderConfirmedModalProps> = ({
  visible,
  onClose,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Top handle */}
          <TouchableOpacity style={styles.dragHandle}>
            <MaterialIcons
              name="keyboard-double-arrow-up"
              size={fp(2.4)}
              color={colors.HEADING}
            />
          </TouchableOpacity>

          {/* Top Info */}
          <View style={styles.topSection}>
            <View style={styles.leftSection}>
              <Scooter width={wp(8)} height={hp(4)} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>Riding to Pickup Point</Text>
                <Text style={styles.time}>Pickup by 03:45 PM</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.directionButton} onPress={onClose}>
              <Text style={styles.buttonText}>Get Direction</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          {/* Locations */}
          <View style={styles.locationSection}>
            <View style={styles.locationRow}>
              <Pickup width={wp(5)} height={hp(5)} />
              <View style={styles.locationText}>
                <Text style={styles.locationTitle}>Your Location</Text>
                <Text style={styles.locationDetails}>
                  Your location lorem ipsum dolor
                </Text>
              </View>
            </View>

            <View style={styles.dottedLine} />

            <View style={styles.locationRow}>
              <Dropoff width={wp(5)} height={hp(5)} />
              <View style={styles.locationText}>
                <Text style={styles.locationTitle}>Pick Up Location</Text>
                <Text style={styles.locationDetails}>
                  Pick up location lorem ipsum
                </Text>
              </View>
            </View>
          </View>
          

          {/* Bottom Actions */}
          <View style={styles.actions}>
            <View style={styles.iconGroup}>
              <TouchableOpacity
                style={[styles.iconAction, {backgroundColor: colors.GREY}]}>
                <Icon2
                  name="chatbubble-ellipses-outline"
                  size={fp(2.2)}
                  color={colors.WHITE}
                />
                <Text style={styles.iconText}>Chat</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.iconAction, {backgroundColor: 'green'}]}>
                <Icon name="phone-call" size={fp(2)} color={colors.WHITE} />
                <Text style={styles.iconText}>Call</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.startRideButton}
              onPress={() => navigation.navigate('MapScreen')}>
              <Text style={styles.startRideText}>Start Ride</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    paddingVertical: hp(3),
    paddingHorizontal: wp(5),
    marginBottom: hp(8),
  },
  dragHandle: {
    position: 'absolute',
    top: hp(-2.4),
    alignSelf: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: wp(10),
    padding: wp(3.5),
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: wp(3),
  },
  title: {
    fontSize: fp(1.9),
    fontFamily: typography.DMSans_Semibold_600,
    color: colors.HEADING,
  },
  time: {
    fontSize: fp(1.6),
    color: colors.GREY,
    fontFamily: typography.DMSans_Medium_500,
  },
  directionButton: {
    paddingVertical: hp(0.8),
    paddingHorizontal: wp(3),
    borderRadius: wp(2),
  },
  buttonText: {
    color: colors.BLUE,
    fontFamily: typography.DMSans_Semibold_600,
    fontSize: fp(1.5),
  },
  separator: {
    height: hp(0.2),
    backgroundColor: colors.LIGHT_GREY,
    marginVertical: hp(2),
  },
  locationSection: {
    marginBottom: hp(2),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',

  },
  locationText: {
    marginLeft: wp(3),
    flex: 1,
  },
  locationTitle: {
    fontFamily: typography.DMSans_Regular_400,
    color: colors.BODY_TEXT,
    marginBottom: hp(0.5),
    fontSize: fp(1.5),
  },
  dottedLine: {
    height: 26,
    borderLeftWidth: 2,
    borderColor: colors.GREY,
    borderStyle: 'dotted',
    alignSelf: 'flex-start',
    marginLeft: 6,
  },
  locationDetails: {
    fontSize: fp(1.7),
    color: colors.HEADING,
    fontFamily: typography.DMSans_Medium_500,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconGroup: {
    flexDirection: 'row',
    gap: wp(2),
  },
  iconAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(18),
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    borderRadius: wp(6),
    flexDirection: 'row',
  },
  iconText: {
    color: colors.WHITE,
    fontSize: fp(1.4),
    fontFamily: typography.DMSans_Regular_400,
    marginLeft: wp(1),
  },
  startRideButton: {
    backgroundColor: colors.BLUE,
    paddingVertical: hp(1.5),
    borderRadius: wp(10),
    flex: 1,
    marginLeft: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  startRideText: {
    color: colors.WHITE,
    fontSize: fp(2.2),
    fontFamily: typography.DMSans_Semibold_600,
  },
});

export default OrderConfirmedModal;
