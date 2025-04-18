import React, {JSX, useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../utils/colors';
import {fp, wp} from '../utils/dimensions';
import Pickup from '../Assets/Pickup.svg';
import Dropoff from '../Assets/DropOff.svg';
import PizzaSVG from '../Assets/food.svg';
import {typography} from '../../assets/fonts/typography';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const {width} = Dimensions.get('window');

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  image: JSX.Element;
}

interface OrderDetailProps {
  visible: boolean;
  onClose: () => void;
  onAccept: () => void;
  orderItems?: OrderItem[];
}

const dummyItems: OrderItem[] = [
  {
    id: 1,
    name: 'Item Name',
    quantity: 2,
    image: <PizzaSVG width={40} height={40} />,
  },
  {
    id: 2,
    name: 'Item Name',
    quantity: 2,
    image: <PizzaSVG width={40} height={40} />,
  },
];

const OrderDetail: React.FC<OrderDetailProps> = ({
  visible,
  onClose,
  onAccept,
  orderItems = dummyItems,
}) => {
  const [seconds, setSeconds] = useState(45);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (visible) {
      setSeconds(45);
      interval = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [visible, onClose]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header with Close and Timer */}
          <View style={styles.header}>
            <View style={styles.timerClose}>
              <View style={styles.closeWrapper}>
                <AnimatedCircularProgress
                  size={50}
                  width={4}
                  fill={((45 - seconds) / 45) * 100}
                  tintColor={colors.YELLOW}
                  backgroundColor={colors.GREY}
                  rotation={0}
                  lineCap="round">
                  {() => (
                    <TouchableOpacity
                      onPress={onClose}
                      style={styles.closeButton}>
                      <Icon name="close" size={24} color={colors.BLACK} />
                    </TouchableOpacity>
                  )}
                </AnimatedCircularProgress>
              </View>
              <Text style={styles.timerText}>{seconds} Sec</Text>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {/* Customer Info */}
            <View style={styles.customerRow}>
              <Text style={styles.customerName}>Customer Name</Text>
              <View style={styles.payoutContainer}>
                <Text style={styles.payoutAmount}>₦30</Text>
                <Text style={styles.payoutLabel}>Guaranteed Payout</Text>
              </View>
            </View>

            <View style={styles.fullWidthLine} />

            {/* Delivery Info */}
            <View style={styles.deliveryInfo}>
              <View>
                <Text>
                  <Text style={styles.deliveryPrefix}>Deliver by </Text>
                  <Text style={styles.deliveryTime}>04:00 PM</Text>
                </Text>
                <Text style={styles.itemCount}>4 items</Text>
              </View>
              <View style={styles.timing}>
                <Text style={styles.timingText}>20 min</Text>
                <Text style={styles.timingText}>5 km</Text>
              </View>
            </View>

            <View style={styles.fullWidthLine} />

            {/* Pickup & Dropoff */}
            <View style={styles.locationContainer}>
              {/* Pickup */}
              <View style={styles.locationItem}>
                <Pickup />
                <View style={styles.label}>
                  <View>
                    <Text style={styles.locationLabel}>Pickup Location</Text>
                    <Text style={styles.locationText}>
                      Pickup location lorem ipsum dolor
                    </Text>
                  </View>
                  <View>
                    <Text>1.5 km</Text>
                  </View>
                </View>
              </View>

              {/* Dotted Line */}
              <View style={styles.dottedLine} />

              {/* Dropoff */}
              <View style={styles.locationItem}>
                <Dropoff />
                <View style={styles.label}>
                  <View>
                    <Text style={styles.locationLabel}>Drop off Location</Text>
                    <Text style={styles.locationText}>
                      Drop off location lorem ipsum
                    </Text>
                  </View>
                  <View>
                    <Text>3.5 km</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Order Items List */}
            <View style={styles.orderItemsContainer}>
              <Text style={styles.orderItemsHeader}>Order Details</Text>
              {orderItems.map((item, index) => (
                <View key={item.id} style={styles.orderItemCard}>
                  <View style={styles.itemIndex}>
                    <Text style={styles.itemIndexText}>{index + 1}</Text>
                  </View>
                  <View style={styles.itemImage}>{item.image}</View>
                  <View>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemQty}>{item.quantity} Units</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Accept Button */}
          <TouchableOpacity
            style={styles.acceptBtn}
            onPress={onAccept}>
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '57%',
    paddingBottom: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
  },
  timerClose: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: -25,
  },
  closeWrapper: {
    backgroundColor: colors.WHITE,
    borderRadius: 25,
    padding: 2,
  },
  closeButton: {
    backgroundColor: colors.WHITE,
    borderRadius: 25,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    color: colors.YELLOW,
    fontWeight: '600',
    fontSize: fp(1.6),
  },
  customerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: wp(5),
  },
  customerName: {
    fontSize: fp(2),
    fontFamily: typography.DMSans_Medium_500,
    color: colors.HEADING,
  },
  fullWidthLine: {
    height: 1,
    backgroundColor: colors.BORDER,
    width: '100%',
    marginTop: 10,
  },
  payoutContainer: {
    alignItems: 'flex-end',
  },
  payoutAmount: {
    fontSize: fp(2.8),
    fontFamily: typography.DMSans_Semibold_600,
  },
  payoutLabel: {
    fontSize: fp(1.4),
    color: colors.GREY,
  },
  deliveryInfo: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
  },
  deliveryPrefix: {
    fontFamily: typography.DMSans_Regular_400,
    color: colors.GREY,
  },
  deliveryTime: {
    fontFamily: typography.DMSans_Bold_700,
    color: colors.HEADING,
  },
  itemCount: {
    color: colors.GREY,
    fontFamily: typography.DMSans_Medium_500,
  },
  timing: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: wp(4),
  },
  timingText: {
    fontFamily: typography.DMSans_Bold_700,
    color: colors.HEADING,
    backgroundColor: colors.LIGHT_GREY,
    borderRadius: wp(5),
    padding: wp(2),
  },
  locationContainer: {
    marginTop: 15,
    paddingHorizontal: wp(4),
  },
  label: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  locationItem: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  dottedLine: {
    height: 26,
    borderLeftWidth: 2,
    borderColor: colors.GREY,
    borderStyle: 'dotted',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  locationLabel: {
    fontFamily: typography.DMSans_Regular_400,
    color: colors.BODY_TEXT,
  },
  locationText: {
    fontFamily: typography.Manrope_medium_500,
    color: colors.HEADING,
    fontSize: fp(1.8),
  },
  orderItemsContainer: {
    marginTop: 20,
  },
  orderItemsHeader: {
    fontSize: fp(2),
    fontFamily: typography.DMSans_Semibold_600,
    marginBottom: 10,
    color: colors.HEADING,
    marginHorizontal: wp(4),
  },
  orderItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.BORDER,
    marginHorizontal: wp(4),
  },
  itemIndex: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  itemIndexText: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  itemName: {
    fontSize: fp(2),
    fontWeight: '500',
    color: colors.HEADING,
  },
  itemQty: {
    fontSize: fp(1.6),
    color: colors.GREY,
  },
  acceptBtn: {
    marginTop: 10,
    backgroundColor: colors.BLUE,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: wp(4),
  },
  acceptText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OrderDetail;