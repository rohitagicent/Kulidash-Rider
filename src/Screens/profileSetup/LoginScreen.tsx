import { Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { hp, wp, fp } from '../../utils/dimensions';
import { colors } from '../../utils/colors'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginFrame from "../../Assets/loginFrame.svg";
import Logo from "../../Assets/Logo.svg";
import { useNavigation } from '@react-navigation/native';  
import { StackNavigationProp } from '@react-navigation/stack';
import { typography } from '../../../assets/fonts/typography';

const LoginScreen: React.FC = () => {
  const { width } = Dimensions.get('window');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); 

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isButtonDisabled = !email.trim() || !password.trim();

  type RootStackParamList = {
    SingupScreen: undefined;
    RiderNavigator: undefined;
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
        <Text style={styles.welcomeText}>Welcome to Kulidash!</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.signInText}>Sign In To Your Account</Text>
        <View style={styles.signInUnderline} />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIconContainer}>
              <Icon 
                name="account" 
                size={24} 
                color={colors.BLUE} 
              />
            </View>
            <TextInput
              style={styles.input}
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
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIconContainer}>
              <Icon 
                name="lock" 
                size={24} 
                color={colors.BLUE} 
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="**********"
              placeholderTextColor={colors.GREY} 
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={styles.passwordIcon}
            >
              <Icon 
                name={showPassword ? "eye-off" : "eye"} 
                size={20} 
                color={colors.GREY} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
        onPress={()=>navigation.navigate('RiderNavigator')}
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
          <TouchableOpacity onPress={() => navigation.navigate('SingupScreen')}>
            <Text style={styles.signUpLink}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
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
    fontFamily:typography.DMSans_Bold_700,
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
    fontFamily:typography.DMSans_Bold_700,
    color: colors.BLACK, 
    textAlign: 'center',
    marginBottom: hp(0.5),
    fontWeight:'700',
  },
  signInUnderline: {
    height: hp(0.5),
    width: wp(12),
    borderRadius:wp(12),
    backgroundColor: colors.BLUE,
    alignSelf: 'flex-start',
    marginBottom: hp(3),
    marginLeft: hp(8.5),
  },
  inputContainer: {
    marginBottom: hp(3),
  },
  label: {
    fontSize: fp(1.6),
    fontFamily:typography.DMSans_Medium_500,
    color: colors.DARK_GREY, 
    marginBottom: hp(1),
    marginLeft:wp(3)
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: hp(2),
    padding: wp(2),
    backgroundColor: colors.WHITE,
  },
  inputIconContainer: {
    backgroundColor: colors.LIGHT_GREY_BACKGROUND, 
    borderRadius: wp(3),
    padding: wp(2),
    marginRight: wp(3),
  },
  input: {
    flex: 1,
    fontSize: fp(1.8),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(2),
    color: colors.DARK_GREY, 
    backgroundColor: colors.WHITE,
  },
  passwordIcon: {
    padding: wp(1),
  },
  continueButton: {
    borderRadius: wp(2),
    paddingVertical: hp(1.8),
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
    fontFamily:typography.DMSans_Semibold_600,
    fontSize: fp(1.8),
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
  },
  signUpText: {
    color: colors.LIGHT_GREY_TEXT, 
    fontFamily:typography.DMSans_Medium_500,
    fontSize: fp(2),
  },
  signUpLink: {
    color: colors.BLUE, 
    fontSize: fp(2),
    fontFamily:typography.DMSans_Medium_500,
  },
});