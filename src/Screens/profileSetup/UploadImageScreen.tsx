import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../utils/colors';
import { hp, wp, fp } from '../../utils/dimensions';
import ProfileIcon from "../../Assets/profile.svg";
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { StackNavigationProp } from '@react-navigation/stack';
import BackButton from "../../Assets/back.svg"

const UploadImageScreen: React.FC = () => {
  
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false); 
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); 
  
  type RootStackParamList = {
    UserDetailScreen: undefined; 
  };

  const handleUpload = () => {
    setIsVisible(true); 
  };

  const onClose = () => {
    setIsVisible(false); 
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
    }).then(image => {
      setImageUri(image.path);
      onClose();
    }).catch(error => {
      if (error.code !== 'E_PICKER_CANCELLED') {
        console.log('Camera Error: ', error);
      }
    });
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
    }).then(image => {
      setImageUri(image.path);
      onClose();
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
        <BackButton/>
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

        <TouchableOpacity onPress={() => navigation.navigate('UserDetailScreen')}>
          <Text>SKIP</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent visible={isVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={onClose}
            >
              <Icon name="x" size={24} color={colors.BLUE} />
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>Profile picture</Text>
            <View style={styles.optionsContainer}>
              <View style={styles.optionColumn}>
                <TouchableOpacity style={styles.optionButton} onPress={openCamera}>
                  <Icon name="camera" size={fp(2.5)} color="#007AFF" />
                </TouchableOpacity>
                <Text style={styles.optionText}>Camera</Text>
              </View>
              <View style={styles.optionColumn}>
                <TouchableOpacity style={styles.optionButton} onPress={openGallery}>
                  <Icon name="image" size={fp(2.5)} color="#007AFF" />
                </TouchableOpacity>
                <Text style={styles.optionText}>Gallery</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
    top: hp(3),
    left: hp(2),
    padding: hp(0.8),
  },
  imageSection: {
    alignItems: 'center',
    marginVertical: hp(4),
    marginTop: hp(14),
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
    borderRadius: hp(12.5), 
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
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.GREEN,
    marginBottom: hp(1),
  },
  titleLine: {
    width: wp(28),
    height: 2,
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
    marginTop: hp(10),
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 30,
    paddingBottom: 40,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: -20,
    alignSelf: 'center',
    backgroundColor: colors.WHITE,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:wp(1),
    borderColor:colors.LIGHT_GREY
  },
  modalTitle: {
    fontSize: fp(2.2),
    fontWeight: '500',
    color: colors.BLACK,
    marginBottom: hp(3),
    marginTop: hp(1),
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: wp(10),
  },
  optionColumn: {
    alignItems: 'center',
  },
  optionButton: {
    padding: 5,
    borderRadius: wp(10),
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(16),
    height: wp(16),

  },
  optionText: {
    fontSize: fp(1.8),
    color: colors.BLACK,
  },
});