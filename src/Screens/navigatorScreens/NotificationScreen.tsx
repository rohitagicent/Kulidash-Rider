import React, { FC, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  findNodeHandle,
  UIManager,
} from 'react-native';
import ShoppingBag from '../../Assets/ShoppingBag.svg';
import Payout from '../../Assets/Payout.svg';
import Update from '../../Assets/Update.svg';
import Approved from '../../Assets/Approved.svg';
import { SvgProps } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../utils/colors';
import { fp, hp, wp } from '../../utils/dimensions';
import { typography } from '../../../assets/fonts/typography';

interface Item {
  id: number;
  title: string;
  text: string;
  icon: FC<SvgProps>;
  time: string;
}

const items: Item[] = [
  {
    id: 1,
    title: 'New Order Request',
    text: 'You have a new delivery request from Restaurant Name. Tap to view details.',
    icon: ShoppingBag,
    time: '2m',
  },
  {
    id: 2,
    title: 'Payout Processed!',
    text: 'Your earnings of $120 have been transferred to your wallet.',
    icon: Payout,
    time: '8h',
  },
  {
    id: 3,
    title: 'New Order Request',
    text: 'You have a new delivery request from Restaurant Name. Tap to view details.',
    icon: ShoppingBag,
    time: '14h',
  },
  {
    id: 4,
    title: 'App Update Required',
    text: 'A new version of the app is available. Update now for the latest features.',
    icon: Update,
    time: '14h',
  },
  {
    id: 5,
    title: 'Profile Verification Approved',
    text: 'Your verification is successful! You can now start accepting deliveries.',
    icon: Approved,
    time: '15h',
  },
];

const NotificationCard: FC<Item & {
  index: number;
  onOptionsPress: (id: number, y: number, x: number) => void;
}> = ({
  icon: IconSvg,
  title,
  text,
  time,
  index,
  id,
  onOptionsPress,
}) => {
  const backgroundColor = index % 2 === 0 ? colors.LIGHT_GREY : colors.WHITE;
  const dotRef = useRef<View>(null);

  const handlePress = () => {
    const handle = findNodeHandle(dotRef.current);
    if (handle) {
      UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        onOptionsPress(id, pageY + height, pageX);
      });
    }
  };

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <View style={styles.leftSection}>
        <IconSvg width={wp(10)} height={wp(10)} />
      </View>
      <View style={styles.middleSection}>
        <Text style={styles.title}>{title}</Text>
        <Text numberOfLines={2} style={styles.description}>{text}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.time}>{time}</Text>
        <TouchableOpacity ref={dotRef} onPress={handlePress}>
          <Text style={styles.dots}>⋯</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const NotificationScreen = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleOptionsPress = (id: number, y: number, x: number) => {
    setSelectedId(id);
    setPosition({ top: y, left: x });
  };

  const closeModal = () => setSelectedId(null);

  const markAsRead = () => {
    console.log('Mark as read:', selectedId);
    closeModal();
  };

  const deleteNotification = () => {
    console.log('Delete notification:', selectedId);
    closeModal();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      {/* Filter Row */}
      <View style={styles.filterContainer}>
        <Text style={styles.recentText}>Recent</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Icon name="filter" size={22} color={colors.GREY} />
        </TouchableOpacity>
      </View>

      {/* Notification List */}
      <ScrollView contentContainerStyle={{ paddingBottom: hp(4) }}>
        {items.map((item, index) => (
          <NotificationCard
            key={item.id}
            index={index}
            {...item}
            onOptionsPress={handleOptionsPress}
          />
        ))}
      </ScrollView>

      {/* Options Dropdown */}
      {selectedId !== null && (
        <Pressable style={StyleSheet.absoluteFill} onPress={closeModal}>
          <View
            style={[
              styles.dropdownMenu,
              {
                top: position.top + 5,
                left: position.left - wp(30), // Adjust based on screen
              },
            ]}
          >
            <TouchableOpacity onPress={markAsRead} style={styles.optionItem}>
              <Text style={styles.optionText}>Mark as Read</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteNotification} style={styles.optionItem}>
              <Text style={[styles.optionText, { color: 'red' }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp(12),
  },
  headerText: {
    fontSize: fp(2.6),
    fontFamily: typography.DMSans_Bold_700,
    color: colors.HEADING,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    marginTop: hp(3),
    marginBottom: hp(2),
    alignItems: 'center',
  },
  recentText: {
    fontFamily: typography.DMSans_Semibold_600,
    fontSize: fp(1.8),
    color: colors.HEADING,
  },
  card: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
  },
  leftSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: fp(1.8),
    fontFamily: typography.DMSans_Semibold_600,
    color: colors.NOTIFICATION,
  },
  description: {
    fontSize: fp(1.4),
    fontFamily: typography.Manrope_medium_500,
    textAlign: 'auto',
    color: colors.BODY_TEXT,
    marginTop: hp(0.5),
  },
  time: {
    fontSize: fp(1.6),
    color: '#475569',
    fontFamily: typography.DMSans_Regular_400,
  },
  dots: {
    fontSize: fp(3),
    fontWeight: 'bold',
    color: '#1E293B',
  },
  dropdownMenu: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 6,
    elevation: 5,
    width: wp(40),
  },
  optionItem: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: fp(1.6),
    fontFamily: typography.DMSans_Regular_400,
    color: colors.HEADING,
  },
});
