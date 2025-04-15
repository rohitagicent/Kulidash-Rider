import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from '../utils/colors';
import { fp, hp, wp } from '../utils/dimensions';
import Congrats from '../Assets/congrats.svg';
import { typography } from '../../assets/fonts/typography';

const CongratulationsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Congrats width={140} height={140} />
        <Text style={styles.title}>Congratulations!</Text>
        <View style={styles.rewardContainer}>
          <Text style={styles.rewardText}>You have earned ₦30</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.outlinedButton}>
          <Text style={styles.outlinedButtonText}>View Order Details</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filledButton}>
          <Text style={styles.filledButtonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CongratulationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BLUE,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: fp(2.8),
    fontFamily: typography.DMSans_Bold_700,
    color: colors.WHITE,
    marginTop: 20,
  },
  rewardContainer: {
    backgroundColor: colors.YELLOW,
    borderRadius: wp(4),
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
    marginTop: 10,
    borderWidth: wp(0.5),
    borderColor: colors.WHITE,
  },
  rewardText: {
    color: colors.WHITE,
    fontFamily: typography.DMSans_Semibold_600,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: wp(12),
  },
  outlinedButton: {
    borderWidth: wp(0.5),
    borderColor: colors.WHITE,
    borderRadius: wp(2),
    paddingVertical: wp(3),
    paddingHorizontal: wp(6),
    marginBottom: hp(2),
    width: '90%',
    alignItems: 'center',
  },
  outlinedButtonText: {
    color: colors.WHITE,
    fontFamily: typography.DMSans_Semibold_600,
    fontSize: fp(2.2),
  },
  filledButton: {
    backgroundColor: colors.WHITE,
    borderRadius: wp(2),
    paddingVertical: wp(3),
    paddingHorizontal: wp(6),
    width: '90%',
    alignItems: 'center',
  },
  filledButtonText: {
    color: colors.BLUE,
    fontFamily: typography.DMSans_Semibold_600,
    fontSize: fp(2.2),
  },
});
