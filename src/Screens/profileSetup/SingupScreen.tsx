import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import React, { useState } from 'react';
import { hp, wp, fp } from '../../utils/dimensions';
import { colors } from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import LoginFrame from '../../Assets/loginFrame.svg';
import Logo from '../../Assets/Logo.svg';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Modal from 'react-native-modal';
import PhoneVerify from '../../Modals/PhoneVerify';
import MailVerify from '../../Modals/MailVerify';
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { typography } from '../../../assets/fonts/typography';

type RootStackParamList = {
  LoginScreen: undefined;
  UploadImageScreen: undefined;
};

const SignupScreen: React.FC = () => {
  const { width } = Dimensions.get('window');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [preferredArea, setPreferredArea] = useState('');
  const [countryCode, setCountryCode] = useState('91');
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [country, setCountry] = useState<Country | null>(null);

  const [isPhoneModalVisible, setIsPhoneModalVisible] = useState(false);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);

  const [isPhoneVerifyEnabled, setIsPhoneVerifyEnabled] = useState(false);
  const [isEmailVerifyEnabled, setIsEmailVerifyEnabled] = useState(false);

  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const isButtonDisabled =
    !name.trim() ||
    !phoneNumber.trim() ||
    !email.trim() ||
    !preferredArea.trim();

  const onSelectCountry = (selectedCountry: Country) => {
    setCountry(selectedCountry);
    setCountryCode(selectedCountry.callingCode[0]);
    setCountryPickerVisible(false);
  };

  const togglePhoneModal = () => {
    setIsPhoneModalVisible(!isPhoneModalVisible);
  };

  const toggleEmailModal = () => {
    setIsEmailModalVisible(!isEmailModalVisible);
  };

  const handlePhoneNumberChange = (text: string) => {
    if (/^\d+$/.test(text)) {
      setPhoneNumber(text);
      setPhoneError('');
      setIsPhoneVerifyEnabled(!!text.trim());
    } else {
      setPhoneError('Only numeric characters are allowed');
      setIsPhoneVerifyEnabled(false);
    }
  };

  const handleEmailChange = (text: string) => {
    if (/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(text)) {
      setEmail(text);
      setEmailError('');
      setIsEmailVerifyEnabled(true);
    } else {
      setEmail(text);
      setEmailError('Please enter a valid Gmail address');
      setIsEmailVerifyEnabled(false);
    }
  };

  const handlePhoneOtpVerified = () => {
    setIsPhoneVerified(true);
    togglePhoneModal();
  };

  const handleEmailOtpVerified = () => {
    setIsEmailVerified(true);
    toggleEmailModal();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={styles.frameContainer}>
              <LoginFrame width={width} height={hp(38)} style={styles.Frame} />
              <Logo width={wp(40)} height={hp(10)} style={styles.logo} />
              <Text style={styles.welcomeText}>
                Welcome to Kulidash! {'\n'}Just A Few Steps To Complete Your Profile
              </Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.signInText}>Create Account</Text>
              <View style={styles.signInUnderline} />

              {/* Name */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Your Name</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIconContainer}>
                    <Icon name="account" size={24} color={colors.BLUE} />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Name"
                    placeholderTextColor={colors.GREY}
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              {/* Phone Number */}
              <View style={styles.inputContainer}>
                <View style={styles.subText}>
                  <Text style={styles.label}>Phone Number</Text>
                  {isPhoneVerifyEnabled && (
                    <TouchableOpacity onPress={togglePhoneModal}>
                      <Text
                        style={[
                          styles.verifyText,
                          isPhoneVerified
                            ? { color: colors.GREEN }
                            : { color: colors.BLUE },
                        ]}
                      >
                        {isPhoneVerified ? 'Verified' : 'Verify'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.inputWrapper}>
                  <View style={styles.inputIconContainer}>
                    <Icon3 name="mobile1" size={24} color={colors.BLUE} />
                  </View>
                  <TouchableOpacity
                    style={styles.countryCodeContainer}
                    onPress={() => setCountryPickerVisible(true)}
                  >
                    <Text style={styles.countryCodeText}>+{countryCode}</Text>
                    <AntDesign name="down" size={fp(2)} color={'#818181'} style={styles.dropdownIcon} />
                  </TouchableOpacity>
                  <CountryPicker
                    countryCode={country?.cca2 || 'US'}
                    withFilter
                    withFlag
                    withCallingCode
                    withAlphaFilter
                    withCallingCodeButton
                    withEmoji
                    visible={countryPickerVisible}
                    onSelect={onSelectCountry}
                    onClose={() => setCountryPickerVisible(false)}
                    containerButtonStyle={{ display: 'none' }}
                  />
                  <TextInput
                    style={[styles.input, { flex: 2 }]}
                    placeholder="Enter Phone Number"
                    placeholderTextColor={colors.GREY}
                    value={phoneNumber}
                    onChangeText={handlePhoneNumberChange}
                    keyboardType="phone-pad"
                  />
                </View>
                {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
              </View>

              {/* Email */}
              <View style={styles.inputContainer}>
                <View style={styles.subText}>
                  <Text style={styles.label}>Email</Text>
                  {isEmailVerifyEnabled && (
                    <TouchableOpacity onPress={toggleEmailModal}>
                      <Text
                        style={[
                          styles.verifyText,
                          isEmailVerified
                            ? { color: colors.GREEN }
                            : { color: colors.BLUE },
                        ]}
                      >
                        {isEmailVerified ? 'Verified' : 'Verify'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.inputWrapper}>
                  <View style={styles.inputIconContainer}>
                    <Icon name="email" size={24} color={colors.BLUE} />
                  </View>
                  <TextInput
                    style={[styles.input, { flex: 2 }]}
                    placeholder="Enter Email"
                    placeholderTextColor={colors.GREY}
                    value={email}
                    onChangeText={handleEmailChange}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
              </View>

              {/* Preferred Area */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Preferred Working Area</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIconContainer}>
                    <Icon2 name="location-sharp" size={24} color={colors.BLUE} />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Preferred Working Area"
                    placeholderTextColor={colors.GREY}
                    value={preferredArea}
                    onChangeText={setPreferredArea}
                  />
                </View>
              </View>

              {/* Continue */}
              <TouchableOpacity
                onPress={() => navigation.navigate('UploadImageScreen')}
                style={[
                  styles.continueButton,
                  isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled,
                ]}
                disabled={isButtonDisabled}
              >
                <Text
                  style={[
                    styles.continueButtonText,
                    isButtonDisabled && { color: colors.LIGHT_GREY_TEXT },
                  ]}
                >
                  Continue
                </Text>
              </TouchableOpacity>

              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                  <Text style={styles.signUpLink}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Modals */}
            <Modal
              isVisible={isPhoneModalVisible}
              onBackdropPress={togglePhoneModal}
              onBackButtonPress={togglePhoneModal}
            >
              <PhoneVerify onVerifyOtp={handlePhoneOtpVerified} />
            </Modal>

            <Modal
              isVisible={isEmailModalVisible}
              onBackdropPress={toggleEmailModal}
              onBackButtonPress={toggleEmailModal}
            >
              <MailVerify onVerifyOtp={handleEmailOtpVerified} />
            </Modal>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    color: colors.RED,
    fontSize: fp(1.5),
    marginTop: hp(0.5),
    fontFamily: typography.DMSans_Medium_500,
  },
  frameContainer: {
    width: '100%',
    height: hp(38),
    position: 'absolute',
    top: 0,
    alignItems: 'center',
  },
  Frame: {
    position: 'absolute',
    top: hp(-9),
  },
  logo: {
    position: 'absolute',
    top: hp(4),
  },
  welcomeText: {
    position: 'absolute',
    fontFamily: typography.DMSans_Semibold_600,
    top: hp(14),
    fontSize: fp(2),
    color: colors.WHITE,
    textAlign: 'center',
    
  },
  content: {
    paddingHorizontal: wp(5),
    marginTop: hp(24),
  },
  signInText: {
    fontSize: fp(2.8),
    fontFamily: typography.DMSans_Bold_700,
    color: colors.BLACK,
    textAlign: 'center',
    marginBottom: hp(0.2),
  },
  signInUnderline: {
    height: hp(0.5),
    width: wp(14),
    borderRadius:wp(12),
    backgroundColor: colors.BLUE,
    alignSelf: 'flex-start',
    marginBottom: hp(3),
    marginLeft: wp(25),

  },
  inputContainer: {
    marginBottom: hp(2),
  },
  label: {
    fontSize: fp(1.6),
    color: colors.DARK_GREY,
    fontFamily: typography.DMSans_Medium_500,
    marginBottom: hp(0.5),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: wp(4),
    padding: wp(2),
    backgroundColor: colors.WHITE,
  },
  inputIconContainer: {
    backgroundColor: colors.LIGHT_GREY_BACKGROUND,
    borderRadius: wp(3),
    padding: wp(2),
    marginRight: wp(2),
  },
  subText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:wp(1.5)
  },
  input: {
    flex: 1,
    fontSize: fp(1.5),
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    color: colors.DARK_GREY,
    backgroundColor: colors.WHITE,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    backgroundColor: '#F8F9FA',
    borderRadius: wp(1.5),
    marginRight: wp(2),
  },
  countryCodeText: {
    color: '#818181',
  },
  dropdownIcon: {
    marginLeft: wp(1),
  },
  verifyText: {
    color: colors.LIGHT_BLUE,
    fontFamily: typography.DMSans_Semibold_600,
  },
  continueButton: {
    borderRadius: wp(2),
    paddingVertical: hp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1),
  },
  buttonEnabled: {
    backgroundColor: colors.BLUE,
  },
  buttonDisabled: {
    backgroundColor: '#EDEDED',
  },
  continueButtonText: {
    color: colors.WHITE,
    fontSize: fp(2.2),
    fontFamily: typography.DMSans_Semibold_600,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
  },
  signUpText: {
    color: colors.LIGHT_GREY_TEXT,
    fontSize: fp(2),
    fontFamily: typography.DMSans_Medium_500,
  },
  signUpLink: {
    color: colors.BLUE,
    fontSize: fp(2),
    fontFamily: typography.DMSans_Medium_500,
  },
});
