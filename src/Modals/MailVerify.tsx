import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Tick from "../Assets/tick.svg";
import { colors } from '../utils/colors';
import { fp, hp, wp } from '../utils/dimensions';
import { typography } from '../../assets/fonts/typography';

interface MailVerifyProps {
  onVerifyOtp: () => void; 
}

const mailVerify: React.FC<MailVerifyProps> = ({ onVerifyOtp }) => {
  const [otp, setOtp] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
  const [isOtpIncorrect, setIsOtpIncorrect] = useState<boolean>(false); 
  
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (otp.every(digit => digit !== 0)) {
      handleEmailOtpVerified();
    }
  }, [otp]);

  const handleOtpChange = (value: string, index: number): void => {
    const numericValue = parseInt(value, 10);

    if (value === '') {

      const newOtp = [...otp];
      newOtp[index] = 0;
      setOtp(newOtp);

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 9) {
      const newOtp = [...otp];
      newOtp[index] = numericValue;
      setOtp(newOtp);

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
      setIsOtpIncorrect(true); 
    }
  };

  return (
    <View style={styles.modalContent}>
      <Tick width={97} height={97} />

      <View style={styles.heading}>
        <Text style={styles.VerifyText}>Verify your Contact Info</Text>
        <Text style={styles.subText}>Enter Your 6 Digit Verification Code Sent To *****@gmail.com</Text>
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
            { color: isOtpVerified ? colors.GREY : colors.BLUE } 
          ]}
          onPress={isOtpVerified ? () => {} : handleEmailOtpVerified} 
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
