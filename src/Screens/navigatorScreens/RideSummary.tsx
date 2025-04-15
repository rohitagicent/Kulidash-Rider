import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome6';
import {colors} from '../../utils/colors';
import {fp, hp, wp} from '../../utils/dimensions';
import {typography} from '../../../assets/fonts/typography';
import Food from '../../Assets/food.svg';

const RideSummary = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon
            name="chevron-back"
            size={28}
            color={colors.BUTTON_COLOR}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Ride Summary</Text>
      </View>

      {/* Order Status + Delivery Time Combined */}
      <View style={styles.statusDeliveryWrapper}>
        <View style={styles.orderStatusContainer}>
          <View style={styles.statusBox}>
            <View style={styles.statusRow}>
              <Icon2
                name="clipboard-text-outline"
                size={20}
                color={colors.BLUE}
              />
              <View>
                <Text style={styles.label}>Order ID</Text>
                <Text style={styles.value}>#12345678</Text>
              </View>
            </View>
          </View>

          <View style={styles.statusBox}>
            <View style={styles.statusRow}>
              <Icon2
                name="check-circle-outline"
                size={20}
                color={colors.BLUE}
              />
              <View>
                <Text style={styles.label}>Status</Text>
                <Text style={styles.value}>Completed</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Delivery Time */}
        <View style={styles.deliveryTimeContainerCombined}>
          <Icon name="checkmark-circle" size={16} color="green" />
          <Text style={styles.deliveryText}>
            Delivered on March 18, 2025, at 2:45 PM
          </Text>
        </View>
      </View>

      {/* Pickup & Drop-off Info */}
      <View style={styles.pickupcontainer}>
        <View style={styles.pickup}>
          <Icon3 name="map-pin" size={20} color={colors.GREY} />
          <Text style={styles.pickupText}>
            Pickup: Gourmet Burge, 123 Food St.
          </Text>
        </View>
        <View style={styles.pickup}>
          <Icon3 name="map-pin" size={20} color={colors.GREY} />
          <Text style={styles.pickupText}>
            Drop-off: Alexei Vostok, 456 Home Rd.
          </Text>
        </View>
        <View style={styles.distanceContainer}>
          <View style={styles.subConatiner}>
            <Icon name="compass-outline" size={20} color={colors.GREY} />
            <Text style={styles.pickupText}>Distance: 5.2 Km</Text>
          </View>
          <View style={styles.subConatiner}>
            <Icon3 name="map" size={20} color={colors.GREY} />
            <Text style={styles.pickupText}>Map Preview</Text>
          </View>
        </View>
      </View>

      {/* Earnings */}
      <View style={styles.EarningConatiner}>
        <View style={styles.BreakDown}>
          <Text style={styles.EarningText}>Earning BreakDown</Text>
          <Text style={styles.EarningText}>₦30</Text>
        </View>
        <View style={styles.fare}>
          <Text style={styles.baseText}>Base Fare</Text>
          <Text style={styles.priceText}>₦10</Text>
        </View>
        <View style={styles.fare}>
          <Text style={styles.baseText}>Distance fare</Text>
          <Text style={styles.priceText}>₦10</Text>
        </View>
        <View style={styles.fare}>
          <Text style={styles.baseText}>Tip</Text>
          <Text style={styles.priceText}>₦10</Text>
        </View>
      </View>

      {/* Order Details */}
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.sectionHeader}>Order Details</Text>

        {[1, 2].map((item, index) => (
          <View key={index}>
            <View style={styles.itemRow}>
              <Text style={styles.itemIndex}>{item}</Text>
              <View style={styles.itemInfo}>
                <Food width={wp(10)} height={wp(10)} />
                <View style={styles.itemTextContainer}>
                  <Text style={styles.itemName}>Item Name</Text>
                  <Text style={styles.itemUnits}>2 Units</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default RideSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(4),
    backgroundColor: colors.WHITE,
    marginTop: hp(3),
  },
  icon: {
    backgroundColor: colors.LIGHT_GREY,
    borderRadius: wp(2),
    padding: wp(1),
  },
  headerText: {
    fontSize: fp(1.8),
    fontFamily: typography.DMSans_Semibold_600,
    color: colors.HEADING,
    marginLeft: wp(3),
  },
  statusDeliveryWrapper: {
    backgroundColor: colors.WHITE,
    margin: wp(4),
    padding: wp(3),
    borderRadius: wp(3),
  },
  orderStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp(4),
    marginBottom: hp(1.5),
  },
  statusBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.LIGHT_GREY,
    padding: wp(3),
    borderRadius: wp(3),
  },
  statusRow: {
    flexDirection: 'row',
    gap: wp(3),
    alignItems: 'center',
  },
  label: {
    fontSize: fp(1.2),
    color: colors.TEXT_COLOR,
    fontFamily: typography.DMSans_Regular_400,
  },
  value: {
    fontSize: fp(1.6),
    fontFamily: typography.DMSans_Semibold_600,
    color: colors.HEADING,
  },
  deliveryTimeContainerCombined: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    backgroundColor: '#E9F9EF',
    padding: wp(2),
    borderRadius: wp(2),
  },
  deliveryText: {
    fontSize: fp(1.4),
    color: 'green',
    fontFamily: typography.DMSans_Regular_400,
  },
  pickupcontainer: {
    backgroundColor: colors.WHITE,
    margin: wp(3),
    borderRadius: wp(4),
    padding: wp(2),
  },
  pickup: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: wp(10),
    borderWidth: wp(0.2),
    borderColor: colors.BORDER,
    marginBottom: hp(2),
    paddingVertical: wp(2),
    borderRadius: wp(2),
    alignItems: 'center',
  },
  pickupText: {
    fontFamily: typography.DMSans_Regular_400,
    fontSize: fp(1.7),
  },
  distanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: wp(4),
  },
  subConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: wp(1.5),
    borderWidth: wp(0.2),
    borderColor: colors.BORDER,
    marginBottom: hp(2),
    paddingVertical: wp(2),
    paddingHorizontal: wp(5.5),
    borderRadius: wp(2),
    alignItems: 'center',
  },
  EarningConatiner: {
    backgroundColor: colors.WHITE,
    margin: wp(3),
    borderRadius: wp(4),
    padding: wp(2),
  },
  BreakDown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: wp(2),
    marginHorizontal: wp(2),
    borderBottomWidth: wp(0.05),
    borderColor: colors.HEADING,
  },
  fare: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: wp(1),
    marginHorizontal: wp(2),
    marginVertical: hp(0.4),
  },
  EarningText: {
    fontFamily: typography.DMSans_Bold_700,
    fontSize: fp(1.8),
    color: colors.BLACK,
  },
  baseText: {
    fontFamily: typography.DMSans_Medium_500,
    fontSize: fp(1.6),
    color: colors.TEXT_COLOR,
  },
  priceText: {
    fontFamily: typography.DMSans_Medium_500,
    fontSize: fp(2),
    color: colors.TEXT_COLOR,
  },

  // Order Details styles
  orderDetailsContainer: {
    backgroundColor: colors.WHITE,
    margin: wp(3),
    borderRadius: wp(4),
    padding: wp(3),
  },
  sectionHeader: {
    fontFamily: typography.DMSans_Semibold_600,
    fontSize: fp(1.8),
    marginBottom: hp(1.5),
    color: colors.HEADING,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth:wp(0.5),
    paddingVertical:wp(2),
    paddingHorizontal:hp(1),
    borderRadius:wp(2),
    borderColor:colors.BORDER,
    marginBottom:hp(2)
  },
  itemIndex: {
    width: wp(5),
    fontFamily: typography.DMSans_Medium_500,
    fontSize: fp(1.4),
    color: colors.WHITE,
    backgroundColor:colors.BLUE,
    borderRadius:wp(1),
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(2),
  },
  itemTextContainer: {
    marginLeft: wp(3),
  },
  itemName: {
    fontFamily: typography.DMSans_Semibold_600,
    fontSize: fp(1.6),
    color: colors.HEADING,
  },
  itemUnits: {
    fontFamily: typography.DMSans_Regular_400,
    fontSize: fp(1.4),
    color: colors.TEXT_COLOR,
  },
  line: {
    height: hp(0.1),
    backgroundColor: colors.LIGHT_GREY,
    marginVertical: hp(1),
    marginLeft: wp(5),
  },
});
