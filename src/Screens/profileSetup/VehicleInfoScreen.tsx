import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { fp, hp, wp } from '../../utils/dimensions';
import { typography } from '../../../assets/fonts/typography';
import { colors } from '../../utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  UploadDocument: undefined;
};

const vehicleTypes = [
  { id: '1', name: 'Car' },
  { id: '2', name: 'Bike' },
  { id: '3', name: 'Scooter' },
  { id: '4', name: 'Auto' },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

const VehicleInfoScreen: React.FC = () => {
  const [vehicleType, setVehicleType] = useState<string>('');
  const [make, setMake] = useState<string>('');
  const [year, setYear] = useState<number | undefined>(undefined);
  const [milege, setMilege] = useState<number | undefined>(undefined);
  const [showVehicleTypeDropdown, setShowVehicleTypeDropdown] = useState<boolean>(false);
  const [showYearDropdown, setShowYearDropdown] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSelectVehicleType = (type: string) => {
    setVehicleType(type);
    setShowVehicleTypeDropdown(false);
  };

  const handleSelectYear = (selectedYear: number) => {
    setYear(selectedYear);
    setShowYearDropdown(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <LinearGradient
              colors={['#18378B', '#2A60F1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 0.5 }}
              style={styles.gradient}
            >
              <View style={styles.row}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: 'https://picsum.photos/200/300?grayscale' }}
                    style={styles.image}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Hii John, Complete Your Profile!</Text>
                </View>
              </View>

              <View style={styles.caraousal}>
                <View style={styles.first}></View>
                <View style={styles.second}></View>
                <View style={styles.third}></View>
              </View>
            </LinearGradient>

            <View style={styles.heading}>
              <Text style={styles.headingText}>Vehicle Information</Text>
            </View>
            <View style={styles.line}></View>

            <View style={styles.formContainer}>
              {/* Vehicle Type */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Vehicle Type</Text>
                <TouchableOpacity
                  style={styles.inputWrapper}
                  onPress={() => setShowVehicleTypeDropdown(prev => !prev)}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Select Vehicle Type"
                    placeholderTextColor={colors.BODY_TEXT}
                    value={vehicleType}
                    editable={false}
                    pointerEvents="none"
                  />
                  <AntDesign
                    name={showVehicleTypeDropdown ? 'up' : 'down'}
                    size={20}
                    color={colors.GREY}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                {showVehicleTypeDropdown && (
                  <ScrollView style={styles.dropdown}>
                    {vehicleTypes.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.dropdownItem}
                        onPress={() => handleSelectVehicleType(item.name)}
                      >
                        <Text style={styles.dropdownItemText}>{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}
              </View>

              {/* Make */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Make & Modal</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter make and modal"
                    placeholderTextColor={colors.BODY_TEXT}
                    value={make}
                    onChangeText={setMake}
                  />
                </View>
              </View>

              {/* Year */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Year</Text>
                <TouchableOpacity
                  style={styles.inputWrapper}
                  onPress={() => setShowYearDropdown(prev => !prev)}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Select"
                    placeholderTextColor={colors.BODY_TEXT}
                    value={year ? year.toString() : ''}
                    editable={false}
                    pointerEvents="none"
                  />
                  <AntDesign
                    name={showYearDropdown ? 'up' : 'down'}
                    size={20}
                    color={colors.GREY}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                {showYearDropdown && (
                  <ScrollView style={styles.dropdown}>
                    {years.map((item) => (
                      <TouchableOpacity
                        key={item.toString()}
                        style={styles.dropdownItem}
                        onPress={() => handleSelectYear(item)}
                      >
                        <Text style={styles.dropdownItemText}>{item}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}
              </View>

              {/* Milege */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Milege</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Milege"
                    placeholderTextColor={colors.BODY_TEXT}
                    value={milege?.toString()}
                    onChangeText={(text) => setMilege(Number(text))}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('UploadDocument')}
              style={styles.continueButton}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default VehicleInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    width: '100%',
    height: hp(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: wp(4),
    borderBottomRightRadius: wp(4),
  },
  row: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginTop: hp(1),
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: fp(2.4),
    fontWeight: 'bold',
    marginTop: hp(1),
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
  caraousal: {
    marginTop: hp(1),
    flexDirection: 'row',
    gap: wp(1.5),
  },
  first: {
    backgroundColor: colors.WHITE,
    height: hp(0.8),
    width: wp(16),
    borderRadius: wp(12),
  },
  second: {
    backgroundColor: colors.LIGHT_BLUE,
    height: hp(0.8),
    width: wp(16),
    borderRadius: wp(12),
  },
  third: {
    backgroundColor: colors.LIGHT_BLUE,
    height: hp(0.8),
    width: wp(16),
    borderRadius: wp(12),
  },
  heading: {
    alignItems: "center",
    marginTop: hp(3),
  },
  headingText: {
    fontSize: fp(2.5),
    fontFamily: typography.DMSans_Bold_700,
  },
  line: {
    width: wp(12),
    height: hp(0.5),
    backgroundColor: colors.BLUE,
    marginLeft: wp(26),
    borderRadius: wp(12),
    marginBottom: hp(1)
  },
  formContainer: {
    marginTop: hp(1.5),
    paddingHorizontal: wp(4),
  },
  inputContainer: {
    marginBottom: hp(1),
  },
  label: {
    fontSize: 16,
    color: colors.DARK_GREY,
    marginBottom: hp(0.4),
    fontFamily: typography.DMSans_Medium_500,
    paddingHorizontal: wp(2.5),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: wp(2),
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2.5),
    backgroundColor: colors.WHITE,
  },
  input: {
    flex: 1,
    fontSize: fp(1.6),
    color: colors.DARK_GREY,
    backgroundColor: colors.WHITE,
  },
  icon: {
    marginLeft: wp(2),
  },
  continueButton: {
    borderRadius: wp(2),
    marginRight: wp(3),
    marginLeft: wp(3),
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
  dropdown: {
    marginTop: hp(0.5),
    maxHeight: hp(20),
    backgroundColor: colors.WHITE,
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: colors.LIGHT_GREY,
  },
  dropdownItem: {
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(4),
  },
  dropdownItemText: {
    fontSize: fp(1.8),
    color: colors.DARK_GREY,
    fontFamily: typography.DMSans_Regular_400,
  },
});
