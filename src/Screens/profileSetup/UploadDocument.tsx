import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../utils/colors';
import { fp, hp, wp } from '../../utils/dimensions';
import { typography } from '../../../assets/fonts/typography';
// import DocumentPicker, { DocumentPickerResult } from '@react-native-documents/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type DocumentType = 'license' | 'utility' | 'inspection';

type RootStackParamList = {
  VehicleImage: undefined;
};

const UploadDocument: React.FC = () => {
  // Commented out state for documents
  // const [driverLicense, setDriverLicense] = useState<DocumentPickerResult[0] | null>(null);
  // const [utilityBill, setUtilityBill] = useState<DocumentPickerResult[0] | null>(null);
  // const [inspectionDoc, setInspectionDoc] = useState<DocumentPickerResult[0] | null>(null);
  
  // For UI demonstration only - will show uploaded state
  const [driverLicense, setDriverLicense] = useState<any>(null);
  const [utilityBill, setUtilityBill] = useState<any>(null);
  const [inspectionDoc, setInspectionDoc] = useState<any>(null);
  
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Commented out document selection functionality
  /*
  const selectFile = async (type: DocumentType) => {
    try {
      const response = await DocumentPicker.pick({
        fileTypes: ['pdf', 'image'],
        allowMultiSelection: false,
      });

      const file = response[0];

      if (file.size && file.size > 2 * 1024 * 1024) {
        Alert.alert('Error', 'File size should be less than 2MB');
        return;
      }

      const validTypes = ['image/jpeg', 'image/jpg', 'application/pdf'];
      if (file.mimeType && !validTypes.includes(file.mimeType)) {
        Alert.alert('Error', 'Only JPG, JPEG, and PDF files are allowed');
        return;
      }

      switch (type) {
        case 'license':
          setDriverLicense(file);
          break;
        case 'utility':
          setUtilityBill(file);
          break;
        case 'inspection':
          setInspectionDoc(file);
          break;
      }
    } catch (err: any) {
      if (err.message === 'cancelled') {
        console.log('User cancelled document picker');
      } else {
        console.error('Document picker error:', err);
        Alert.alert('Error', 'Failed to select document');
      }
    }
  };
  */

  const renderUploadButton = (type: DocumentType, document: any | null) => {
    const titles = {
      license: "Driver's License",
      utility: 'Utility Bill',
      inspection: 'Vehicle Inspection Document',
    };

    return (
      <View style={styles.uploadContainer}>
        <Text style={styles.uploadTitle}>{titles[type]}</Text>
        <TouchableOpacity 
          style={styles.uploadButton}
          // onPress={() => selectFile(type)} // Commented out functionality
        >
          <Icon name="upload-file" size={30} color={colors.BLUE} style={styles.uploadIcon} />
          {document ? (
            <View style={styles.uploadedFile}>
              <Icon name="check-circle" size={24} color={colors.GREEN} />
              <Text style={styles.uploadedText} numberOfLines={1} ellipsizeMode="middle">
                {document.name || "document.pdf"} {/* Fallback for UI demo */}
              </Text>
            </View>
          ) : (
            <Text style={styles.uploadButtonText}>Click to Upload</Text>
          )}
          <Text style={styles.maxSizeText}>(Max Size: 2mb)</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleContinue = () => {
    // Commented out validation
    /*
    if (!driverLicense || !utilityBill || !inspectionDoc) {
      Alert.alert('Error', 'Please upload all required documents');
      return;
    }
    */
    navigation.navigate('VehicleImage');
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#18378B', '#2A60F1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.5 }}
        style={styles.gradient}
      >
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: 'https://picsum.photos/200/300?grayscale' }} style={styles.image} />
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

      <View style={styles.uploadInfoContainer}>
        <Text style={styles.uploadText}>Upload Documents</Text>
        <View style={styles.blueline}></View>
        <Text style={styles.uploadDescriptionText}>
          We need to check that you're really you. It helps us fight fraud and keep the business secure.
        </Text>
        <Text style={styles.uploadSupportedFormatsText}>(Supported Formats: JPG, PDF, JPEG)</Text>
      </View>

      {renderUploadButton('license', driverLicense)}
      {renderUploadButton('utility', utilityBill)}
      {renderUploadButton('inspection', inspectionDoc)}

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles remain exactly the same as in your original code
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.WHITE,
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
    backgroundColor: colors.WHITE,
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
  uploadInfoContainer: {
    marginTop: hp(2),
    paddingHorizontal: wp(4),
    alignItems: 'center',
  },
  uploadText: {
    fontSize: fp(2.5),
    fontFamily: typography.DMSans_Bold_700,
  },
  blueline: {
    width: wp(18),
    height: hp(0.5),
    backgroundColor: colors.BLUE,
    marginRight: hp(14),
    borderRadius: wp(12),
    marginBottom: hp(1),
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
  uploadContainer: {
    marginTop: hp(3),
    paddingHorizontal: wp(6),
  },
  uploadTitle: {
    fontSize: fp(1.6),
    fontFamily: typography.DMSans_Medium_500,
    color: colors.BLACK,
    marginBottom: hp(1),
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: colors.GREY,
    borderRadius: wp(2),
    borderStyle: 'dotted',
    paddingVertical: hp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    color: colors.BLUE,
    fontFamily: typography.DMSans_Medium_500,
  },
  uploadIcon: {
    marginBottom: hp(1),
  },
  maxSizeText: {
    fontSize: fp(1.2),
    color: colors.BLACK,
    fontFamily: typography.DMSans_Medium_500,
    marginTop: hp(0.5),
  },
  uploadedFile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(2),
  },
  uploadedText: {
    marginLeft: wp(2),
    color: colors.GREEN,
    fontFamily: typography.DMSans_Medium_500,
    maxWidth: '80%',
  },
  continueButton: {
    backgroundColor: colors.BLUE,
    paddingVertical: hp(2),
    borderRadius: wp(2),
    marginHorizontal: wp(6),
    marginTop: hp(4),
    marginBottom: hp(2),
    alignItems: 'center',
  },
  continueButtonText: {
    color: colors.WHITE,
    fontFamily: typography.DMSans_Bold_700,
    fontSize: fp(2),
  },
});

export default UploadDocument;