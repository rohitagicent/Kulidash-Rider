import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Tick from "../Assets/tick.svg";
import { colors } from '../utils/colors';
import { fp, hp, wp } from '../utils/dimensions';
import { typography } from '../../assets/fonts/typography';

interface PhoneVerifyProps {
  onVerifyOtp: () => void; 
}

const PhoneVerify: React.FC<PhoneVerifyProps> = ({ onVerifyOtp }) => {
  const [otp, setOtp] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [isOtpIncorrect, setIsOtpIncorrect] = useState<boolean>(false); // New state for OTP error
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (otp.every(digit => digit !== 0)) {
      handleVerifyOtp();
    }
  }, [otp]);

  const handleOtpChange = (value: string, index: number): void => {
    const numericValue = parseInt(value, 10);

    if (value === '') {
      // Handle backspace
      const newOtp = [...otp];
      newOtp[index] = 0;
      setOtp(newOtp);

      // Focus on the previous input if there's a backspace
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 9) {
      // Update OTP array only if the value is valid
      const newOtp = [...otp];
      newOtp[index] = numericValue;
      setOtp(newOtp);

      // Focus on the next input if a valid value is entered
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleVerifyOtp = () => {
    // OTP verification logic here
    if (otp.join('') === '123456') { 
      onVerifyOtp(); // Close modal on success
      setIsOtpIncorrect(false); // Reset error state
    } else {
      setIsOtpIncorrect(true); // Set error state on failure
    }
  };

  return (
    <View style={styles.modalContent}>
      <Tick width={100} height={100} />
      <View style={styles.heading}>
        <Text style={styles.VerifyText}>Verify Your Contact Info</Text>
        <Text style={styles.subText}>Enter Your 6 Digit Verification Code Sent To ********687</Text>
      </View>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={[styles.otpInput, digit !== 0 ? { borderColor: colors.BLUE } : {}]}
            maxLength={1}
            keyboardType="numeric"
            value={digit !== 0 ? digit.toString() : ''}
            onChangeText={(value: string) => handleOtpChange(value, index)}
            textAlign="center"
            ref={(ref) => { inputRefs.current[index] = ref; }}
          />
        ))}
      </View>

      {isOtpIncorrect && (
        <Text style={styles.errorText}>Wrong OTP</Text> 
      )}

      <View style={styles.resendView}>
        <Text style={styles.codeText}>Didn't receive a code? </Text>
        <Text style={[styles.codeText, styles.resendText]}>Resend</Text>
      </View>
      <View>
        <Text style={styles.sent}>Resend in 2 min</Text>
      </View>
    </View>
  );
};

export default PhoneVerify;

const styles = StyleSheet.create({
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    padding: wp(8),
    borderRadius: 10,
  },
  heading: {
    alignItems: 'center',
  },
  VerifyText: {
    fontSize: fp(2.5),
    fontFamily:typography.DMSans_Bold_700,
    marginTop: hp(2),
    color: colors.BLACK,
  },
  subText: {
    paddingHorizontal:wp(4),
    marginTop:wp(1),
    textAlign:"center",
    fontSize: fp(1.4),
    fontFamily: typography.Manrope_regular_400,
    color:'#777777'
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: hp(2),
    width: wp(90),
  },
  otpInput: {
    width: wp(12),
    height: wp(12),
    backgroundColor: '#5151511A',
    borderRadius: 8,
    fontSize: fp(2),
    color: colors.BLACK,
    textAlign: 'center',
    marginHorizontal: wp(1),
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resendView: {
    flexDirection: 'row',
    marginTop: hp(1.5),
  },
  codeText: {
    fontSize: fp(1.4),
    color: colors.HEADING,
    fontFamily:typography.Manrope_medium_500,
  },
  resendText: {
    color: colors.BLUE,
    fontSize: fp(1.4),
    fontFamily:typography.Manrope_medium_500,
  },
  sent: {
    fontSize: fp(1.4),
    color: '#51515199',
    fontFamily:typography.DMSans_Regular_400,
  },
  errorText: {
    fontSize: fp(1.4),
    color: colors.RED, 
    marginTop: hp(1),
  },
});
