import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Tick from "../Assets/tick.svg";
import { colors } from '../utils/colors';
import { fp, hp, wp } from '../utils/dimensions';

interface MailVerifyProps {
  onVerifyOtp: () => void;  // Function to close the modal after OTP verification
}

const mailVerify: React.FC<MailVerifyProps> = ({ onVerifyOtp }) => {
  const [otp, setOtp] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
  const [isOtpIncorrect, setIsOtpIncorrect] = useState<boolean>(false); // Track incorrect OTP
  
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (otp.every(digit => digit !== 0)) {
      handleEmailOtpVerified();
    }
  }, [otp]);

  const handleOtpChange = (value: string, index: number): void => {
    const numericValue = parseInt(value, 10);

    if (value === '') {
      // Handle backspace: reset the OTP digit and focus on the previous input field
      const newOtp = [...otp];
      newOtp[index] = 0;
      setOtp(newOtp);

      // Move focus to the previous input if backspace is pressed
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 9) {
      // Update OTP array only if the value is valid
      const newOtp = [...otp];
      newOtp[index] = numericValue;
      setOtp(newOtp);

      // Move focus to the next input field if a valid digit is entered
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleEmailOtpVerified = () => {
    if (otp.join('') === '123456') { 
      setIsOtpVerified(true);
      setIsOtpIncorrect(false);
      onVerifyOtp(); 
    } else {
      setIsOtpVerified(false);
      setIsOtpIncorrect(true); // Set error state on failure
    }
  };

  return (
    <View style={styles.modalContent}>
      <Tick width={97} height={97} />

      <View style={styles.heading}>
        <Text style={styles.VerifyText}>Verify your Contact Info</Text>
        <Text style={styles.subText}>Enter Your 6 digit verification code sent to *****@gmail.com</Text>
      </View>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={[
              styles.otpInput, 
              digit !== 0 ? { borderColor: colors.BLUE } : {}
            ]}
            maxLength={1}
            keyboardType="numeric"
            value={digit !== 0 ? digit.toString() : ''}
            onChangeText={(value: string) => handleOtpChange(value, index)}
            textAlign="center"
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
          />
        ))}
      </View>

      {isOtpIncorrect && (
        <Text style={styles.errorText}>Incorrect OTP. Please try again.</Text>
      )}

      <View style={styles.resendView}>
        <Text style={styles.codeText}>Didn't receive a code? </Text>
        <Text 
          style={[
            styles.codeText, 
            styles.resendText, 
            { color: isOtpVerified ? colors.GREY : colors.BLUE } // Change color when OTP is verified
          ]}
          onPress={isOtpVerified ? () => {} : handleEmailOtpVerified} // Only allow resend if OTP is not verified
        >
          {isOtpVerified ? 'Resent' : 'Resend'}
        </Text>
      </View>

      <View>
        <Text style={styles.sent}>Resent in 2 min</Text>
      </View>
    </View>
  );
};

export default mailVerify;

const styles = StyleSheet.create({
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    padding: wp(4),
    borderRadius: 10,
  },
  heading: {
    alignItems: 'center',
  },
  VerifyText: {
    fontSize: fp(2.3),
    fontWeight: '800',
    marginTop: hp(2),
    color: colors.BLACK,
  },
  subText: {
    fontSize: fp(1.2),
    fontWeight: '400',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(2),
    width: wp(75),
  },
  otpInput: {
    width: wp(10),
    height: wp(10),
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
    color: colors.GREY,
  },
  resendText: {
    fontSize: fp(1.4),
  },
  sent: {
    fontSize: fp(1.4),
    color: colors.GREY,
  },
  errorText: {
    fontSize: fp(1.4),
    color: colors.LIGHT_BLUE,
    marginTop: hp(1),
  },
});
