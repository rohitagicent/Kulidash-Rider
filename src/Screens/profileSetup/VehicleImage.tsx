import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../utils/colors';
import {fp, hp, wp} from '../../utils/dimensions';
import {typography} from '../../../assets/fonts/typography';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  AllsetScreen: undefined;
};

const VehicleImage: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [frontImage, setFrontImage] = useState<string>('');
  const [backImage, setBackImage] = useState<string>('');
  const [leftImage, setLeftImage] = useState<string>('');
  const [rightImage, setRightImage] = useState<string>('');

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <LinearGradient
        colors={['#18378B', '#2A60F1']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.5}}
        style={styles.gradient}>
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: 'https://picsum.photos/200/300?grayscale'}}
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

      {/* Scrollable Upload Section */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.uploadInfoContainer}>
          <Text style={styles.uploadText}>Vehicle Images</Text>
          <View style={styles.blueline}></View>
          <Text style={styles.uploadDescriptionText}>
            Please upload the front, back, and both sides of your vehicle.
          </Text>
          <Text style={styles.uploadSupportedFormatsText}>
            (Supported Formats: JPG, PDF, JPEG)
          </Text>
        </View>

        {/* Upload Image Boxes */}
        <View style={styles.imageUploadContainer}>
          <ImageUploadBox label="Front Side" onPress={() => {}} />
          <ImageUploadBox label="Back Side" onPress={() => {}} />
          <ImageUploadBox label="Left Side" onPress={() => {}} />
          <ImageUploadBox label="Right Side" onPress={() => {}} />
        </View>
      </ScrollView>

      {/* Fixed Button */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('AllsetScreen')}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ImageUploadBox: React.FC<{label: string; onPress: () => void}> = ({
  label,
  onPress,
}) => {
  return (
    <View>
      <Text style={styles.labelText}>{label}</Text>
      <TouchableOpacity
        style={styles.uploadBox}
        onPress={onPress}
        activeOpacity={0.8}>
        <View style={styles.icon}>
          <Ionicons name="camera-outline" size={28} color={colors.BLUE} />
        </View>
        <Text style={styles.uploadBoxText}>Click to Upload</Text>
        <Text style={styles.sizeText}>(Max Size: 2MB)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VehicleImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  gradient: {
    width: '100%',
    height: hp(28),
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
    backgroundColor: colors.WHITE,
    height: hp(0.8),
    width: wp(16),
    borderRadius: wp(12),
  },
  third: {
    backgroundColor: colors.WHITE,
    height: hp(0.8),
    width: wp(16),
    borderRadius: wp(12),
  },

  scrollContainer: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(12), // space for the button
  },
  uploadInfoContainer: {
    marginTop: hp(2),
    alignItems: 'center',
    borderStyle: 'dotted',
  },
  uploadText: {
    fontSize: fp(2.5),
    fontFamily: typography.DMSans_Bold_700,
  },
  blueline: {
    width: wp(16),
    height: hp(0.5),
    backgroundColor: colors.BLUE,
    borderRadius: wp(12),
    marginBottom: hp(1),
    marginRight:wp(21)
  },
  uploadDescriptionText: {
    fontSize: fp(1.5),
    color: colors.DARK_GREY,
    marginBottom: hp(0.4),
    fontFamily: typography.DMSans_Medium_500,
    textAlign: 'center',
  },
  uploadSupportedFormatsText: {
    fontSize: fp(1.2),
    color: colors.YELLOW,
    fontFamily: typography.DMSans_Medium_500,
    textAlign: 'center',
  },
  imageUploadContainer: {
    marginTop: hp(3),
  },
  uploadBox: {
    borderWidth: wp(0.5),
    borderColor: colors.GREY,
    borderStyle: 'dotted',
    marginRight: wp(2),
    marginLeft: wp(2),
    paddingVertical: hp(2),
    marginBottom: hp(1.5),
    borderRadius: wp(2),
    alignItems: 'center',
  },
  labelText: {
    fontSize: fp(1.6),
    fontFamily: typography.DMSans_Medium_500,
    color: colors.BLACK,
    textAlign: 'left',
    marginLeft: wp(4),
    marginBottom: hp(0.5),
  },
  icon: {
    marginBottom: hp(0.3),
  },
  uploadBoxText: {
    fontSize: fp(1.6),
    fontFamily: typography.DMSans_Medium_500,
    color: colors.BLUE,
    textAlign: 'left',
  },
  sizeText: {
    fontSize: fp(1.2),
    fontFamily: typography.DMSans_Medium_500,
    color: colors.BLACK,
    textAlign: 'left',
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: hp(2),
    width: '100%',
    paddingHorizontal: wp(6),
  },
  continueButton: {
    backgroundColor: colors.BLUE,
    paddingVertical: hp(2),
    borderRadius: wp(2),
    alignItems: 'center',
  },
  continueButtonText: {
    color: colors.WHITE,
    fontFamily: typography.DMSans_Bold_700,
    fontSize: fp(2),
  },
});
