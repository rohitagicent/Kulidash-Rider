import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../utils/colors';
import {fp, hp, wp} from '../../utils/dimensions';
import {typography} from '../../../assets/fonts/typography';

const DocumentScreen: React.FC = () => {
  const [verified, setVerified] = useState(false);

  // Toggle states between verified and default
  const toggleVerification = () => {
    setVerified(prev => !prev);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon
          name="chevron-back"
          size={24}
          color={colors.HEADING}
          style={styles.backIcon}
        />
        <Text style={styles.headerText}>Documents</Text>
      </View>

      {/* Info Message */}
      <View style={styles.messageContainer}>
        {verified ? (
          <Icon2 name="check-decagram" size={24} color="#0DBA67" />
        ) : (
          <Icon name="bulb" size={24} color={colors.YELLOW} />
        )}
        <View style={styles.textWrapper}>
          <Text style={styles.messageText}>
            {verified
              ? 'Congratulations! Your account has been successfully verified.'
              : 'Your account is currently being verified to ensure the security and integrity of our platform.'}
          </Text>
        </View>
        <TouchableOpacity onPress={toggleVerification}>
          <Icon name="close" size={24} color={colors.HEADING} />
        </TouchableOpacity>
      </View>

      {/* Document List */}
      <View style={styles.fileContainer}>
        {[
          {label: "Driver's License", file: 'Driverlicense.jpg'},
          {label: 'Utility Bill', file: 'Utilitybill.jpg'},
          {
            label: 'Vehicle Inspection Document',
            file: 'Vehicleinspection.pdf',
          },
        ].map((doc, idx) => (
          <View key={idx}>
            <Text style={styles.labelText}>{doc.label}</Text>
            <View style={styles.documentCard}>
              <Icon name="document-text-outline" size={40} color="#8C8C8C" />
              <View style={styles.fileInfo}>
                <Text style={styles.fileName}>{doc.file}</Text>
                <Text style={styles.fileSize}>300 KB</Text>
                {verified ? (
                  <View style={styles.verifiedContainer}>
                    <Icon2 name="check-decagram" size={16} color="#0DBA67" />
                    <Text style={styles.VerifiedText}>Verified</Text>
                  </View>
                ) : (
                  <View style={styles.statusContainer}>
                    <Icon2 name="progress-clock" size={16} color="#F5A623" />
                    <Text style={styles.statusText}>Pending</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default DocumentScreen;

// Same styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND || '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(3),
    paddingHorizontal: wp(4),
    backgroundColor: colors.WHITE,
    elevation: wp(0.5),
  },
  backIcon: {
    backgroundColor: '#6A6A6A26',
    padding: wp(1.5),
    borderRadius: wp(2),
  },
  headerText: {
    marginLeft: wp(4),
    fontSize: fp(2.2),
    color: colors.BLACK,
    fontFamily: typography.DMSans_Medium_500,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    backgroundColor: '#2A60F112',
    margin: wp(3),
    borderRadius: wp(4),
    borderWidth: wp(0.2),
    borderColor: colors.LIGHT_BODY_TEXT,
  },
  textWrapper: {
    flex: 1,
    marginHorizontal: wp(2),
  },
  messageText: {
    fontSize: fp(1.5),
    fontFamily: typography.DMSans_Regular_400,
    color: colors.HEADING,
  },
  labelText: {
    fontFamily: typography.DMSans_Medium_500,
    fontSize: fp(1.8),
    fontWeight: '700',
    color: colors.DARK_HEADING,
  },
  fileContainer: {
    paddingHorizontal: wp(4),
    gap: hp(1.5),
    paddingBottom: hp(4),
  },
  documentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    padding: wp(4),
    borderRadius: wp(3),
    gap: wp(3),
    marginBottom: hp(2),
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontFamily: typography.DMSans_Medium_500,
    fontSize: fp(1.6),
    color: colors.HEADING,
  },
  fileSize: {
    fontFamily: typography.DMSans_Medium_500,
    fontSize: fp(1.4),
    color: colors.BODY_TEXT,
    marginTop: hp(0.5),
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.8),
    borderRadius: wp(5),
    width: wp(26),
    marginTop: wp(3),
  },
  statusText: {
    fontFamily: typography.DMSans_Medium_500,
    fontSize: fp(1.5),
    color: '#F5A623',
    marginLeft: wp(1),
  },
  verifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0DBA671A',
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.8),
    borderRadius: wp(5),
    width: wp(26),
    marginTop: wp(3),
  },
  VerifiedText: {
    fontFamily: typography.DMSans_Medium_500,
    fontSize: fp(1.6),
    color: '#0DBA67',
    marginLeft: wp(1),
  },
});
