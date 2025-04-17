import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {colors} from '../../utils/colors';
import {fp, hp, wp} from '../../utils/dimensions';
import {typography} from '../../../assets/fonts/typography';
import User from '../../Assets/user.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

type RootStackParamList = {
  Account: undefined;
  MyProfile: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SectionItemProps {
  icon: string;
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  iconColor?: string;
}

const SectionItem: React.FC<SectionItemProps> = ({
  icon,
  label,
  onPress,
  iconColor = colors.BLUE,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.itemRow}>
    <View style={styles.iconCircle}>
      <Icon name={icon} size={22} color={iconColor} />
    </View>
    <Text style={styles.itemLabel}>{label}</Text>
    <Icon name="chevron-forward" size={20} color={colors.SUBHEADING} />
  </TouchableOpacity>
);

const AccountScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={{flex: 1, backgroundColor: colors.LIGHT_GREY}}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-back"
            size={28}
            color={colors.BUTTON_COLOR}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Account</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={{paddingTop: hp(8)}}
        showsVerticalScrollIndicator={false}>
        {/* Profile Intro */}
        <View style={styles.introContainer}>
          <View>
            <Text style={styles.name}>Name ipsum</Text>
            <Text style={styles.email}>Example@mail.com</Text>

            <TouchableOpacity>
              <Text style={styles.editProfile}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <User width={100} height={100} />
        </View>

        {/* Sections */}
        <Text style={styles.sectionTitle}>Profile</Text>
        <View style={styles.section}>
          <SectionItem
            icon="person-outline"
            label="My Profile"
            onPress={() => navigation.navigate('MyProfile')}
          />
          <SectionItem icon="document-text-outline" label="Documents" />
          <SectionItem icon="bicycle-outline" label="Vehicle Information" />
          <SectionItem icon="wallet-outline" label="My Wallet" />
          <SectionItem icon="location-outline" label="My Delivery Area" />
        </View>

        <Text style={styles.sectionTitle}>Setting</Text>
        <View style={styles.section}>
          <SectionItem icon="lock-closed-outline" label="Password & Security" />
          <SectionItem icon="notifications-outline" label="Notification" />
          <SectionItem icon="headset-outline" label="Help Center" />
        </View>

        <Text style={styles.sectionTitle}>Account Management</Text>
        <View style={styles.section}>
          <SectionItem
            icon="log-out-outline"
            label="Sign Out"
            iconColor={colors.BLUE}
          />
          <SectionItem
            icon="trash-outline"
            label="Delete Account"
            iconColor={colors.RED}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(4),
    backgroundColor: colors.WHITE,
    borderBottomWidth: wp(0.2),
    borderColor: colors.GREY,
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  icon: {
    backgroundColor: colors.LIGHT_GREY,
    borderRadius: wp(2),
    padding: wp(1),
    marginTop: wp(2),
  },
  headerText: {
    fontSize: fp(1.8),
    fontFamily: typography.DMSans_Semibold_600,
    color: colors.HEADING,
    marginLeft: wp(3),
    marginTop: wp(2),
  },
  introContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.WHITE,
    borderRadius: wp(2),
    margin: wp(4),
    marginTop: hp(4),
    paddingVertical: wp(4),
    paddingHorizontal: hp(1),
  },
  name: {
    fontSize: fp(2.8),
    fontFamily: typography.DMSans_Bold_700,
    color: '#1D1D1D',
  },
  email: {
    fontSize: fp(1.8),
    color: colors.BODY_TEXT,
    marginVertical: hp(0.4),
  },
  editProfile: {
    color: colors.BLUE,
    fontFamily: typography.DMSans_Regular_400,
    fontSize: fp(1.6),
    marginTop: hp(2),
  },
  sectionTitle: {
    marginHorizontal: wp(4),
    marginBottom: hp(1),
    fontSize: fp(1.6),
    color: colors.HEADING,
    fontFamily: typography.DMSans_Regular_400,
  },
  section: {
    backgroundColor: colors.WHITE,
    borderRadius: wp(2),
    marginHorizontal: wp(4),
    marginBottom: hp(2),
    paddingVertical: hp(1),
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(2),
  },
  iconCircle: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(4),
  },
  itemLabel: {
    flex: 1,
    fontSize: fp(1.9),
    color: colors.SUBHEADING,
    fontFamily: typography.DMSans_Medium_500,
  },
});
