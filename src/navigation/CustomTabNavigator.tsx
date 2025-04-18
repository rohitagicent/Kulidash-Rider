import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { fp, hp, wp } from '../utils/dimensions';
import { colors } from '../utils/colors';
import HomeFill from '../Assets/homefill.svg';
import Home from '../Assets/home.svg';
import PaymentFill from '../Assets/walletfill.svg';
import Payment from '../Assets/wallet.svg';
import NotificationFill from '../Assets/notification-fill.svg';
import Notification from '../Assets/notification.svg';
import AccountFill from '../Assets/accountfill.svg';
import Account from '../Assets/account.svg';
import VehicleMaintenance from '../Assets/FAB.svg';
import { typography } from '../../assets/fonts/typography';

const { width } = Dimensions.get('window');

export const CustomTabNavigator: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const renderIcon = (routeName: string, focused: boolean) => {
    const iconSize = hp(3.2);
    const centerIconSize = hp(12);

    const icons = {
      Home: focused ? (
        <HomeFill width={iconSize} height={iconSize} />
      ) : (
        <Home width={iconSize} height={iconSize} />
      ),
      Payment: focused ? (
        <PaymentFill width={iconSize} height={iconSize} />
      ) : (
        <Payment width={iconSize} height={iconSize} />
      ),
      Notification: focused ? (
        <NotificationFill width={iconSize} height={iconSize} />
      ) : (
        <Notification width={iconSize} height={iconSize} />
      ),
      Account: focused ? (
        <AccountFill width={iconSize} height={iconSize} />
      ) : (
        <Account width={iconSize} height={iconSize} />
      ),
      Maintenance: <VehicleMaintenance width={centerIconSize} height={centerIconSize} />,
    };

    return icons[routeName as keyof typeof icons] || icons.Home;
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../Assets/BottomImage.png')}
        resizeMode="cover"
        style={styles.backgroundImage}
      />
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const label = options.title || route.name;
          const isCenterButton = options.title === 'Maintenance';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              activeOpacity={0.7}
              style={[
                styles.tabButton,
                isCenterButton && styles.centerButton,
              ]}
            >
              <View style={styles.iconContainer}>
                {renderIcon(options.title || route.name, isFocused)}
                {!isCenterButton && (
                  <>
                    <Text
                      style={[
                        styles.label,
                        isFocused && styles.labelFocused,
                      ]}
                    >
                      {label}
                    </Text>
                    {isFocused && <View style={styles.indicator} />}
                  </>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    backgroundColor: colors.WHITE,
  },
  backgroundImage: {
    width: '100%',
    height: Platform.select({
      ios: hp(12),
      android: hp(11),
    }),
  },
  tabBar: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: Platform.select({
      ios: hp(10),
      android: hp(9),
    }),
    bottom: 9,
    paddingHorizontal: wp(2),
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingVertical: hp(2),
  },
  centerButton: {
    position: 'relative',
    bottom: hp(5),
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: fp(1.5),
    color: colors.GREY,
    fontFamily: typography.DMSans_Medium_500,
  },
  labelFocused: {
    color: colors.BLUE,
    fontFamily:typography.DMSans_Semibold_600,
  },
  indicator: {
    position: 'absolute',
    bottom: -hp(0.8),
    width: wp(12),
    height: 2,
    backgroundColor: colors.BLUE,
    borderRadius: 2,
  },
});
