import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import { hp, wp } from '../../utils/dimensions'; 
import { colors } from '../../utils/colors'; 
import { typography } from '../../../assets/fonts/typography';
import { useNavigation } from '@react-navigation/native';  
import { StackNavigationProp } from '@react-navigation/stack';
import BackButton from "../../Assets/back.svg"


const UserDetailScreen: React.FC = () => {

  const [name, setName] = useState<string>('John Doe');
  const [phoneNumber, setPhoneNumber] = useState<string>('1234567890');
  const [email, setEmail] = useState<string>('john.doe@example.com');
  const [preferredArea, setPreferredArea] = useState<string>('New York');

  const isButtonDisabled: boolean = !name.trim() || !phoneNumber.trim() || !email.trim() || !preferredArea.trim();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); 

    type RootStackParamList = {
        RiderVerificationScreen: undefined;
      };
    
  const handleSubmit = () => {
    navigation.navigate('RiderVerificationScreen')
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} 
        activeOpacity={0.7}
      >
        <BackButton/>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>JD</Text> 
        </View>

        <TouchableOpacity style={styles.changePhotoButton}>
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your Name</Text>
          <View style={styles.inputWrapper}>
          <View style={styles.inputIconContainer}>
              <Icon name="account" size={24} color={colors.BLUE} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIconContainer}>
              <Icon name="phone" size={24} color={colors.BLUE} />
            </View>
            <TextInput
              style={[styles.input, { flex: 2 }]}
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIconContainer}>
              <Icon name="email" size={24} color={colors.BLUE} />
            </View>
            <TextInput
              style={[styles.input, { flex: 2 }]}
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Preferred Working Area</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIconContainer}>
              <Icon2 name="location-sharp" size={24} color={colors.BLUE} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter Preferred Working Area"
              value={preferredArea}
              onChangeText={setPreferredArea}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.submitButton, isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled]}
          disabled={isButtonDisabled}
        >
          <Text style={[styles.submitButtonText, isButtonDisabled && { color: colors.LIGHT_GREY_TEXT }]}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: hp(2),
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: hp(5.5),
    left: hp(2.4),
    padding: hp(1),
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: hp(3), 
  },
  circle: {
    width: wp(40),  
    height: wp(40), 
    borderRadius: wp(25),
    backgroundColor: colors.LIGHT_GREY_BACKGROUND, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontSize: wp(8), 
    color: colors.DARK_GREY,
    fontWeight: 'bold',
  },
  changePhotoButton: {
    marginTop: hp(1), 
  },
  changePhotoText: {
    color: colors.BLUE, 
    fontSize: 16,
    fontFamily: typography.DMSans_Medium_500
  },
  formContainer: {
    marginTop: hp(2),
  },
  inputContainer: {
    marginBottom: hp(1.5), 
  },
  label: {
    fontSize: 16,
    color: colors.DARK_GREY,
    marginBottom: hp(0.5),
    fontFamily:typography.DMSans_Medium_500,
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
    borderRadius: wp(2),
    padding: wp(2),
    marginRight: wp(2),
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    color: colors.DARK_GREY, 
    backgroundColor: colors.WHITE,
  },
  submitButton: {
    borderRadius: wp(2),
    paddingVertical: hp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(2),
  },
  buttonEnabled: {
    backgroundColor: colors.BLUE,
  },
  buttonDisabled: {
    backgroundColor: colors.GREY,
  },
  submitButtonText: {
    color: colors.WHITE,
    fontSize: 18,
    fontFamily:typography.DMSans_Semibold_600,
  },
});
