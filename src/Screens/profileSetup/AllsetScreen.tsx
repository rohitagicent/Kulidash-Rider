import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { colors } from '../../utils/colors';
import { fp, hp, wp } from '../../utils/dimensions';
import { typography } from '../../../assets/fonts/typography';

// Define the type for the navigation stack
type RootStackParamList = {
  RiderNavigator: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'RiderNavigator'>;

const AllsetScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleExploreFeatures = () => {
    navigation.navigate('RiderNavigator');
  };

  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          source={require('/Users/surajsingh/Desktop/Kulidash-Rider/src/Assets/animation.json')}
          resizeMode="center"
          autoPlay
          loop
          duration={1000}
          style={{
            height: hp(15),
            width: '30%',
            alignSelf: 'center',
            position: 'absolute',
            marginBottom: hp(9),
          }}
        />
      </View>

      <View style={styles.heading}>
        <Text style={styles.setText}>You are all set!</Text>
        <Text style={styles.profileText}>
          Your profile is complete. You'll be notified once your account is verified and ready for deliveries.
        </Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleExploreFeatures}>
        <Text style={styles.btnText}>Explore all features</Text>
        <Icon name="arrowright" size={20} color={colors.WHITE} />
      </TouchableOpacity>
    </View>
  );
};

export default AllsetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(3),
  },
  lottie: {
    width: wp(50),
    height: wp(50),
  },
  heading: {
    alignItems: 'center',
  },
  setText: {
    color: colors.BLACK,
    fontFamily: typography.DMSans_Semibold_600,
    fontSize: fp(2.2),
    marginBottom: hp(1),
  },
  profileText: {
    textAlign: 'center',
    fontFamily: typography.DMSans_Regular_400,
    color: colors.GREY,
    fontSize: fp(1.6),
    marginBottom: hp(2.5),
    marginHorizontal: wp(5),
  },
  btn: {
    backgroundColor: colors.BLUE,
    borderRadius: wp(6),
    marginHorizontal: wp(26),
    paddingVertical: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: wp(1),
  },
  btnText: {
    fontSize: fp(1.6),
    fontFamily: typography.DMSans_Medium_500,
    color: colors.WHITE,
  },
});
