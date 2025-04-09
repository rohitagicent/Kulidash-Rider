import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../utils/colors';
import { hp, wp, fp } from '../../utils/dimensions';
import ProfileIcon from "../../Assets/profile.svg";
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { StackNavigationProp } from '@react-navigation/stack';

const UploadImageScreen: React.FC = () => {
  
  const [imageUri, setImageUri] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); 
  

  type RootStackParamList = {
    UserDetailScreen: undefined; 
  };

  // Function to handle photo upload options
  const handleUpload = () => {
    Alert.alert(
      "Select Option",
      "Choose a photo source",
      [
        {
          text: "Camera",
          onPress: () => openCamera(),
        },
        {
          text: "Gallery",
          onPress: () => openGallery(),
        },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  // Function to open Camera with cropping options
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
    }).then(image => {
      setImageUri(image.path);
    }).catch(error => {
      if (error.code !== 'E_PICKER_CANCELLED') {
        console.log('Camera Error: ', error);
      }
    });
  };

  // Function to open Image Gallery with cropping options
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
    }).then(image => {
      setImageUri(image.path);
    }).catch(error => {
      if (error.code !== 'E_PICKER_CANCELLED') {
        console.log('Gallery Error: ', error);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Icon name="arrow-back-ios" size={22} color={'#6A6A6A'} />
      </TouchableOpacity>

      <View style={styles.imageSection}>
        <View style={styles.uploadImageContainer}>
          {imageUri ? (
            <Image 
              source={{ uri: imageUri }} 
              style={styles.profileImage}
              resizeMode="cover"
            />
          ) : (
            <ProfileIcon />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Upload Your Profile Picture</Text>
          <Text style={styles.subText}>
            Help restaurants and customers recognize you by uploading a clear picture of yourself.
          </Text>
        </View>
      </View>

      <View style={styles.instructionsContainer}>
        <View style={styles.headingText}>
          <Text style={styles.instructionsTitle}>Instructions</Text>
          <View style={styles.titleLine}></View>
        </View>
        <View style={styles.instructionsList}>
          <View style={styles.instructionItem}>
            <Icon name="circle" size={10} color={colors.BLACK} />
            <Text style={styles.instructionsText}>Make sure your face is clearly visible.</Text>
          </View>
          <View style={styles.instructionItem}>
            <Icon name="circle" size={10} color={colors.BLACK} />
            <Text style={styles.instructionsText}>Avoid using filter or group photos.</Text>
          </View>
          <View style={styles.instructionItem}>
            <Icon name="circle" size={10} color={colors.BLACK} />
            <Text style={styles.instructionsText}>Use a well-lit and professional-looking image.</Text>
          </View>
        </View>
      </View>

      <View style={styles.uploadButtonContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Text style={styles.uploadButtonText}>Upload Photo</Text>
        </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate('UserDetailScreen')}>
            <Text>SKIP</Text>
          </TouchableOpacity>
          
      </View>
    </View>
  );
};

export default UploadImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: hp(2),
  },
  backButton: {
    position: 'absolute',
    top: hp(5.5),
    left: hp(2.4),
    backgroundColor: colors.GREY,
    alignItems: 'center',
    justifyContent: 'center',
    padding: hp(1),
    borderRadius: 10,
  },
  imageSection: {
    alignItems: 'center',
    marginVertical: hp(4),
    marginTop: hp(16),
  },
  uploadImageContainer: {
    width: hp(25),
    height: hp(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: hp(12.5), // Makes the image circular
  },
  textContainer: {
    marginTop: hp(3),
    alignItems: 'center',
  },
  headerText: {
    fontSize: fp(2.8),
    fontWeight: '700',
    color: colors.BLACK,
  },
  subText: {
    fontSize: fp(2.0),
    textAlign: 'center',
    color: colors.DARK_GREY,
    marginTop: hp(2),
  },
  instructionsContainer: {
    marginHorizontal: hp(1),
    backgroundColor: colors.LIGHT_GREEN,
    padding: hp(2),
    borderRadius: 8,
  },
  headingText: {
    alignItems: 'center',
    marginBottom: hp(1.3),
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.GREEN,
    marginBottom: hp(1),
  },
  titleLine: {
    width: wp(28),
    height: 3,
    backgroundColor: colors.GREEN,
    marginBottom: hp(1),
  },
  instructionsList: {
    marginTop: hp(1),
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  instructionsText: {
    fontSize: fp(1.8),
    color: colors.DARK_GREY,
    marginLeft: hp(1),
  },
  uploadButtonContainer: {
    alignItems: 'center',
    marginTop: hp(8),
  },
  uploadButton: {
    backgroundColor: colors.BLUE,
    width: wp(85),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(1.5),
  },
  uploadButtonText: {
    color: colors.WHITE,
    fontSize: fp(2.6),
    fontWeight: 'bold',
  },
});