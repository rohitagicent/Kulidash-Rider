import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {fp, hp, wp} from '../../utils/dimensions';
import {typography} from '../../../assets/fonts/typography';
import {colors} from '../../utils/colors';
import NoRide from '../../Assets/NoRide.svg';
import Bike from '../../Assets/bike.svg';
import Money from '../../Assets/money.svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

interface Ride {
  id: string;
  customerName: string;
  orderNo: string;
  amount: string;
  date: string;
}

type RootStackParamList = {
  RideSummary: undefined;
};

const dummyRides: Ride[] = [
  {
    id: '1',
    customerName: 'Customer Name',
    orderNo: '#298401',
    amount: '₦30',
    date: '23 Mar, 2025 04:00 PM',
  },
  {
    id: '2',
    customerName: 'Customer Name',
    orderNo: '#298401',
    amount: '₦30',
    date: '23 Mar, 2025 04:00 PM',
  },
  {
    id: '3',
    customerName: 'Customer Name',
    orderNo: '#298401',
    amount: '₦30',
    date: '23 Mar, 2025 04:00 PM',
  },
  {
    id: '4',
    customerName: 'Customer Name',
    orderNo: '#298401',
    amount: '₦30',
    date: '23 Mar, 2025 04:00 PM',
  },
  {
    id: '5',
    customerName: 'Customer Name',
    orderNo: '#298401',
    amount: '₦30',
    date: '23 Mar, 2025 04:00 PM',
  },
  {
    id: '6',
    customerName: 'Customer Name',
    orderNo: '#298401',
    amount: '₦30',
    date: '23 Mar, 2025 04:00 PM',
  },
  {
    id: '7',
    customerName: 'Customer Name',
    orderNo: '#298401',
    amount: '₦30',
    date: '23 Mar, 2025 04:00 PM',
  },
  {
    id: '8',
    customerName: 'Customer Name',
    orderNo: '#298401',
    amount: '₦30',
    date: '23 Mar, 2025 04:00 PM',
  },
];

const VehicleScreen: React.FC = () => {
  const hasRides = dummyRides.length > 0;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#18378B', '#2A60F1']} style={styles.gradient}>
        <Text style={styles.rideText}>My Rides</Text>
      </LinearGradient>

      <View style={styles.card}>
        <View style={styles.cardSection}>
          <Bike width={wp(8)} height={wp(8)} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.cardLabel}>Total Rides</Text>
            <Text style={styles.cardValue}>
              {hasRides ? dummyRides.length : '0'}
            </Text>
          </View>
        </View>
        <View style={styles.verticalDivider} />
        <View style={styles.cardSection}>
          <Money width={wp(8)} height={wp(8)} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.cardLabel}>Total Earned</Text>
            <Text style={styles.cardValue}>{hasRides ? '₦500' : '0'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.searchBox}>
        <Icon name="search" size={20} color={colors.BLACK} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={colors.BLACK}
          style={styles.searchInput}
        />
      </View>

      {!hasRides ? (
        <View style={styles.emptyContainer}>
          <NoRide height={hp(12)} />
          <Text style={styles.noRideText}>No Rides Yet!</Text>
          <Text style={styles.noRideSubText}>
            Once you start accepting orders, your completed and ongoing rides
            will appear here.
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.filterContainer}>
            <Text style={styles.filterText}>All Rides</Text>
            <Text style={styles.filterText}>Sort</Text>
          </View>

          <FlatList
            data={dummyRides}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.rideItem}
                onPress={() => navigation.navigate('RideSummary')}>
                <View>
                  <Text style={styles.customerName}>{item.customerName}</Text>
                  <Text style={styles.orderNo}>Order No. {item.orderNo}</Text>
                </View>
                <View style={styles.rightSection}>
                  <Text style={styles.amount}>{item.amount}</Text>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
};

export default VehicleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  gradient: {
    width: '100%',
    height: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rideText: {
    fontFamily: typography.DMSans_Bold_700,
    fontSize: fp(2.8),
    color: colors.WHITE,
  },
  card: {
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
    paddingVertical: hp(2),
    borderRadius: wp(4),
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 4,
    position: 'absolute',
    top: hp(16),
    left: 0,
    right: 0,
    zIndex: 2,
    paddingHorizontal: wp(5),
  },
  cardSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: wp(3),
  },
  textContainer: {
    justifyContent: 'center',
  },
  cardLabel: {
    fontFamily: typography.DMSans_Regular_400,
    fontSize: fp(1.6),
    color: colors.GREY,
  },
  cardValue: {
    fontFamily: typography.DMSans_Bold_700,
    fontSize: fp(2.0),
    color: colors.HEADING,
    marginTop: hp(0.3),
  },
  verticalDivider: {
    width: wp(0.5),
    backgroundColor: '#CFCFCF',
    marginHorizontal: wp(3),
  },
  searchBox: {
    marginTop: hp(8),
    marginHorizontal: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderWidth: hp(0.2),
    borderColor: colors.BORDER,
    borderRadius: wp(4),
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.4),
  },
  searchInput: {
    flex: 1,
    fontSize: fp(1.8),
    color: colors.BLACK,
    paddingLeft: wp(3),
    fontFamily: typography.DMSans_Regular_400,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(5),
    paddingHorizontal: wp(10),
  },
  noRideText: {
    fontSize: fp(2.4),
    fontFamily: typography.DMSans_Bold_700,
    color: colors.HEADING,
    marginTop: hp(2),
  },
  noRideSubText: {
    textAlign: 'center',
    fontSize: fp(1.7),
    fontFamily: typography.DMSans_Regular_400,
    color: colors.HEADING,
    marginTop: hp(1),
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    marginTop: hp(3),
  },
  filterText: {
    fontFamily: typography.DMSans_Medium_500,
    fontSize: fp(1.8),
    color: colors.BODY_TEXT,
  },
  listContainer: {
    paddingHorizontal: wp(5),
    paddingTop: hp(1),
  },
  rideItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    backgroundColor: '#F9F9F9',
    borderRadius: wp(3),
    marginBottom: hp(1.5),
    borderWidth: wp(0.2),
    borderColor: colors.LIGHT_GREY,
  },
  customerName: {
    fontFamily: typography.DMSans_Medium_500,
    fontSize: fp(1.8),
    color: colors.HEADING,
  },
  orderNo: {
    fontFamily: typography.DMSans_Regular_400,
    fontSize: fp(1.6),
    color: colors.LIGHT_BODY_TEXT,
    marginTop: hp(0.3),
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontFamily: typography.DMSans_Medium_500,
    fontSize: fp(1.8),
    color: colors.HEADING,
  },
  date: {
    fontFamily: typography.DMSans_Regular_400,
    fontSize: fp(1.6),
    color: colors.LIGHT_BODY_TEXT,
    marginTop: hp(0.3),
  },
});
