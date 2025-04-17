import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../utils/colors';
import {hp, wp} from '../../utils/dimensions';

const MyProfile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LinearGradient colors={['#18378B', '#2A60F1']} style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Icon name="arrow-left" size={24} color={colors.WHITE} />
          </TouchableOpacity>

          <View style={styles.profileImageWrapper}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1614285750897-36f083ff6d94',
              }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.cameraIcon}>
              <Icon name="camera" size={16} color={colors.WHITE} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Full Name */}
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputRow}>
            <View style={styles.iconWrapper}>
              <Icon name="account" size={20} color="#2A60F1" />
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Name ipsum"
              placeholderTextColor={colors.GREY}
            />
            <TouchableOpacity>
              <Icon name="pencil" size={18} color={colors.GREY} />
            </TouchableOpacity>
          </View>

          {/* Phone Number */}
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputRow}>
            <View style={styles.iconWrapper}>
              <Icon name="phone" size={20} color="#2A60F1" />
            </View>
            <Text style={styles.phoneText}>9873623923</Text>
            <Icon name="check-decagram" size={20} color="#00C851" />
            <TouchableOpacity>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputRow}>
            <View style={styles.iconWrapper}>
              <Icon name="email" size={20} color="#2A60F1" />
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Example@mail.com"
              placeholderTextColor={colors.GREY}
            />
          </View>

          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.updateText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    height: hp(25),
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: hp(6),
    position: 'relative',
    borderBottomLeftRadius: wp(5),
    borderBottomRightRadius: wp(5),
  },
  backButton: {
    position: 'absolute',
    top: hp(2.5),
    left: wp(5),
    zIndex: 2,
  },
  profileImageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: wp(26),
    height: wp(26),
    borderRadius: wp(13),
    borderWidth: 3,
    borderColor: colors.WHITE,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: wp(4),
    backgroundColor: '#2A60F1',
    borderRadius: 20,
    padding: 6,
    borderWidth: 2,
    borderColor: colors.WHITE,
  },
  content: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(5),
  },
  label: {
    fontSize: 14,
    color: colors.BLACK,
    marginTop: hp(2),
    marginBottom: hp(0.7),
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    paddingVertical: wp(2.5),
    marginBottom: hp(1.5),
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  iconWrapper: {
    backgroundColor: '#E8ECF4',
    padding: 6,
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    color: colors.BLACK,
    paddingLeft: wp(2),
  },
  phoneText: {
    flex: 1,
    color: colors.BLACK,
  },
  changeText: {
    color: '#2A60F1',
    fontWeight: '600',
    marginLeft: wp(2),
  },
  updateButton: {
    backgroundColor: '#2A60F1',
    borderRadius: 10,
    paddingVertical: hp(1.6),
    alignItems: 'center',
    marginTop: hp(4),
  },
  updateText: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
