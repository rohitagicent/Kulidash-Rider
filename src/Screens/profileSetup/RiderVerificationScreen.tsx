import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StepIndicator from 'react-native-step-indicator';
import { fp, hp, wp } from '../../utils/dimensions';
import { typography } from '../../../assets/fonts/typography';
import { colors } from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface RiderVerificationScreenProps {}

const RiderVerificationScreen: React.FC<RiderVerificationScreenProps> = () => {
  type RootStackParamList = {
    VehicleInfoScreen: undefined;
    DocumentUploadScreen: undefined;
    VehicleImagesScreen: undefined;
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Step data
  const steps = [
    "Vehicle Information",
    "Document Uploaded",
    "Vehicle Images"
  ];

  const stepDescriptions = [
    "Add details to the vehicle you'll use for deliveries",
    "Verify your identity by submitting required documents.",
    "Upload clear photos of your vehicle from all sides"
  ];

  const customStyles = {
    stepIndicatorSize: wp(8),
    currentStepIndicatorSize: wp(6),
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: colors.BLUE,
    stepStrokeWidth:3,
    stepStrokeFinishedColor: colors.BLUE,
    stepStrokeUnFinishedColor: colors.WHITE,
    separatorFinishedColor: colors.BLUE,
    separatorUnFinishedColor: colors.BLUE,
    stepIndicatorFinishedColor: colors.WHITE, 
    stepIndicatorUnFinishedColor: colors.WHITE,
    stepIndicatorCurrentColor: colors.WHITE,
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: 'transparent',
    stepIndicatorLabelFinishedColor: 'transparent',
    stepIndicatorLabelUnFinishedColor: 'transparent',
    labelColor: colors.BLUE,
    labelSize: fp(1.5),
    currentStepLabelColor: colors.BLUE,
    labelAlign: 'flex-start' as const,
    separatorStrokeUnfinishedWidth: 3,
    separatorStrokeFinishedWidth: 3,
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#18378B', '#2A60F1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.5 }}
        style={styles.gradient}>
            
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Hii, John</Text>
            <Text style={styles.text}>Complete Your Profile!</Text>
          </View>

          {/* Image View */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://picsum.photos/200/300?grayscale' }}
              style={styles.image}
            />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.infoView}>
        <View style={styles.textView}>
          <Text style={styles.verificationText}>Rider Verification</Text>
          <Text style={styles.subtext}>Verify your details to start accepting deliveries seamlessly</Text>
        </View>

        <View style={styles.stepIndicatorContainer}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={0}
            stepCount={3}
            labels={steps}
            direction="vertical"
            renderStepIndicator={({ position, stepStatus }) => {
              return (
                <View style={[
                  styles.customStepIndicator,
                  {
                    backgroundColor: colors.WHITE,
                    borderColor: colors.BLUE,
                  }
                ]} />
              );
            }}
            renderLabel={({ position, stepStatus, label }) => {
              return (
                <View style={styles.labelContainer}>
                  <Text style={[
                    styles.stepLabelText,
                    stepStatus === 'finished' || stepStatus === 'current'
                      ? styles.activeStepLabel
                      : styles.inactiveStepLabel
                  ]}>
                    {label}
                  </Text>
                  <Text style={styles.stepDescription}>
                    {stepDescriptions[position]}
                  </Text>
                </View>
              );
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('VehicleInfoScreen')}
          style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RiderVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    width: '100%',
    height: hp(26),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: wp(4),
    borderBottomRightRadius: wp(4),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: hp(4),
    marginRight: wp(4),
    marginLeft: wp(4),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginRight: wp(4),
  },
  text: {
    color: 'white',
    fontSize: fp(2.4),
    fontWeight: 'bold',
    fontFamily: typography.DMSans_Bold_700,
  },
  imageContainer: {
    width: hp(12),
    height: hp(12),
    borderRadius: hp(6),
    overflow: 'hidden',
    borderWidth: wp(1),
    borderColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoView: {
    backgroundColor: colors.WHITE,
    marginVertical: hp(1),
    marginHorizontal: wp(4),
    borderRadius: hp(1),
    marginTop: hp(4),
    paddingBottom: hp(2),
    flex: 1,
  },
  textView: {
    marginTop: hp(3),
    marginHorizontal: hp(1),
  },
  verificationText: {
    fontSize: 23,
    fontFamily: typography.DMSans_Bold_700,
  },
  subtext: {
    fontSize: fp(1.5),
    fontFamily: typography.DMSans_Regular_400,
    color: colors.GREY,
    marginBottom: hp(2),
  },
  stepIndicatorContainer: {
    flex: 1,
    marginLeft: wp(4),
    marginTop: hp(1),
  },
  labelContainer: {
    marginTop: hp(4),
    width: wp(70),
    paddingLeft: wp(2),
    marginBottom: hp(3), 
  },
  stepLabelText: {
    fontSize: fp(2),
    fontFamily: typography.DMSans_Semibold_600,
  },
  activeStepLabel: {
    color: colors.BLACK,
  },
  inactiveStepLabel: {
    color: colors.BLACK,
  },
  stepDescription: {
    fontSize: fp(1.6),
    fontFamily: typography.DMSans_Regular_400,
    color: colors.GREY,
    marginTop: hp(0.5),
  },
  continueButton: {
    borderRadius: wp(2),
    marginHorizontal: wp(3),
    marginTop: hp(2),
    paddingVertical: hp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.BLUE,
  },
  continueButtonText: {
    color: colors.WHITE,
    fontSize: fp(2.2),
    fontFamily: typography.DMSans_Semibold_600,
  },
  customStepIndicator: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    borderWidth: 2,
  },
});