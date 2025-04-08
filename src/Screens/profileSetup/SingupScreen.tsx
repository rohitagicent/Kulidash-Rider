import { Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { hp, wp, fp } from '../../utils/dimensions';
import { colors } from '../../utils/colors'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import LoginFrame from "../../Assets/loginFrame.svg";
import Logo from "../../Assets/Logo.svg";
import { useNavigation } from '@react-navigation/native';  
import { StackNavigationProp } from '@react-navigation/stack';
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import Modal from 'react-native-modal';
import PhoneVerify from '../../Modals/PhoneVerify'; 
import MailVerify from '../../Modals/MailVerify';  

type RootStackParamList = {
  LoginScreen: undefined;
};

const SingupScreen: React.FC = () => {
  const { width } = Dimensions.get('window');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); 

  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [preferredArea, setPreferredArea] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<string>('US');
  const [callingCode, setCallingCode] = useState<string>('1');
  const [showCountryPicker, setShowCountryPicker] = useState<boolean>(false);

  const [isPhoneModalVisible, setIsPhoneModalVisible] = useState<boolean>(false); 
  const [isEmailModalVisible, setIsEmailModalVisible] = useState<boolean>(false);  

  const isButtonDisabled = !name.trim() || !phoneNumber.trim() || !email.trim() || !preferredArea.trim();

  const onSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  const togglePhoneModal = () => {
    setIsPhoneModalVisible(!isPhoneModalVisible); 
  };

  const toggleEmailModal = () => {
    setIsEmailModalVisible(!isEmailModalVisible);  // Toggle email modal visibility
  };

  return (
    <View style={styles.container}>

      <View style={styles.frameContainer}>
        <LoginFrame 
          width={width} 
          height={hp(38)} 
          style={styles.Frame}
        />

        <Logo 
          width={wp(40)} 
          height={hp(10)} 
          style={styles.logo}
        />

        <Text style={styles.welcomeText}>Welcome to Kulidash! Just A Few Steps To Complete Your Profile</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.signInText}>Create Account</Text>
  
        <View style={styles.signInUnderline} />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              placeholderTextColor={colors.GREY} 
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.subText}>
            <Text style={styles.label}>Phone Number</Text>
            <TouchableOpacity onPress={togglePhoneModal}> 
              <Text style={styles.verifyText}>Verify</Text>
            </TouchableOpacity>
          </View>
        
          <View style={styles.inputWrapper}>
            <View style={styles.inputIconContainer}>
              <Icon 
                name="phone" 
                size={24} 
                color={colors.BLUE} 
              />
            </View>
            <TouchableOpacity 
              style={styles.countryCodeButton}
              onPress={() => setShowCountryPicker(true)}
            >
              <Text style={styles.countryCodeText}>+{callingCode}</Text>
            </TouchableOpacity>
            <TextInput
              style={[styles.input, { flex: 2 }]}
              placeholder="Enter Phone Number"
              placeholderTextColor={colors.GREY} 
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>
          
          <CountryPicker
            countryCode={countryCode}
            withCallingCode
            withFilter
            withFlag
            withEmoji
            withAlphaFilter
            withCallingCodeButton
            visible={showCountryPicker}
            onSelect={onSelectCountry}
            onClose={() => setShowCountryPicker(false)}
            containerButtonStyle={styles.hiddenCountryPicker}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.subText}>
            <Text style={styles.label}>Email</Text>
            <TouchableOpacity onPress={toggleEmailModal}>  
              <Text style={styles.verifyText}>Verify</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIconContainer}>
              <Icon 
                name="account" 
                size={24} 
                color={colors.BLUE} 
              />
            </View>
            <TextInput
              style={[styles.input, { flex: 2 }]}
              placeholder="Enter Email"
              placeholderTextColor={colors.GREY} 
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Preferred Working Area</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIconContainer}>
              <Icon2 
                name="location-sharp" 
                size={24} 
                color={colors.BLUE} 
              />
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

        <TouchableOpacity 
          style={[
            styles.continueButton, 
            isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled
          ]}
          disabled={isButtonDisabled}
        >
          <Text 
            style={[
              styles.continueButtonText, 
              isButtonDisabled && { color: colors.LIGHT_GREY_TEXT } 
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

      {/* Phone Verification Modal */}
      <Modal 
        isVisible={isPhoneModalVisible} 
        onBackdropPress={togglePhoneModal} 
        onBackButtonPress={togglePhoneModal}
      >
        <PhoneVerify /> 
      </Modal>

  
      <Modal 
        isVisible={isEmailModalVisible} 
        onBackdropPress={toggleEmailModal} 
        onBackButtonPress={toggleEmailModal}
      >
        <MailVerify />  
      </Modal>
    </View>
  );
}

export default SingupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: colors.WHITE, 
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
    top: hp(14),
    fontSize: fp(2),
    fontWeight: 'bold',
    color: colors.WHITE, 
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: wp(5),
    marginTop: hp(24), 
  },
  signInText: {
    fontSize: fp(2.8), 
    color: colors.BLACK, 
    textAlign: 'center',
    marginBottom: hp(0.8), 
    fontWeight: '700',
  },
  signInUnderline: {
    height: 3, 
    width: '22%',
    backgroundColor: colors.LIGHT_BLUE,
    alignSelf: 'flex-start',
    marginBottom: hp(2), 
    marginLeft: hp(11),
  },
  inputContainer: {
    marginBottom: hp(2), 
  },
  label: {
    fontSize: fp(1.6), 
    color: colors.DARK_GREY, 
    marginBottom: hp(0.5),
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    fontSize: fp(1.5), 
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    color: colors.DARK_GREY, 
    backgroundColor: colors.WHITE,
  },
  countryCodeButton: {
    paddingHorizontal: wp(2),
    borderRightWidth: 1,
    borderColor: '#ddd',
    marginRight: wp(2),
  },
  countryCodeText: {
    fontSize: fp(1.5),
    color: colors.DARK_GREY,
  },
  hiddenCountryPicker: {
    display: 'none',
  },
  verifyButton: {
    position: 'absolute',
    right: wp(2),
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  verifyText: {
    color: colors.LIGHT_BLUE,
    fontWeight: '700',
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
    backgroundColor: colors.GREY, 
  },
  continueButtonText: {
    color: colors.WHITE, 
    fontSize: fp(1.8),
    fontWeight: 'bold',
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
  },
  signUpLink: {
    color: colors.BLUE, 
    fontSize: fp(2),
    fontWeight: 'bold',
  },
});
