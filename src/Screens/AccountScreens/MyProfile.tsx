import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import {fp, hp, wp} from '../../utils/dimensions';
import {colors} from '../../utils/colors';
import User from '../../Assets/user.svg';
import {typography} from '../../../assets/fonts/typography';
import Background from '../../Assets/background.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';


const MyProfile: React.FC = () => {
   const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header Gradient */}
      <LinearGradient colors={['#18378B', '#2A60F1']} style={styles.gradient}>
        <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color={colors.WHITE} />
        </TouchableOpacity>

        <View style={styles.userImageContainer}>
          <Background style={styles.background} />
          <View style={styles.imageView}>
            <User width={160} height={160} style={styles.userimage} />
          </View>
          <Icon
            name="camera"
            size={30}
            color={colors.BLUE}
            style={styles.cameraIcon}
          />
        </View>
      </LinearGradient>

      {/* Form Content */}
      <View style={styles.formWrapper}>
        {/* Full Name */}
        <Text style={styles.label}>Full Name</Text>
        <View style={styles.inputContainer}>
          <Icon name="person" size={20} color={colors.BLUE} style={styles.labelIcon}/>
          <Text style={styles.inputText}>Name ipsum</Text>
          <Icon2
            name="edit"
            size={24}
            color={colors.SUBHEADING}
            style={styles.editIcon}
          />
        </View>

        {/* Phone Number */}
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.inputContainer}>
          <Icon name="phone-portrait" size={20} color={colors.BLUE} style={styles.labelIcon} />
          <Text style={styles.inputText}>9873623923</Text>
          <Icon3 name='check-decagram' size={26} color='#1DD3B0' style={styles.checkIcon}/>
          <Text style={styles.changeText}>Change</Text>
        </View>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <View style={[styles.inputContainer]}>
          <Icon name="mail" size={20} color={colors.BLUE} style={styles.labelIcon}/>
          <Text style={styles.inputText}>Example@mail.com</Text>
        </View>

        {/* Update Profile Button */}
        <TouchableOpacity style={styles.updateBtn}>
          <Text style={styles.updateText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  gradient: {
    height: hp(26),
    justifyContent: 'flex-start',
    paddingTop: hp(4),
    paddingLeft: wp(4),
  },
  userImageContainer: {
    alignItems: 'center',
  },
  background: {
    top: hp(2.2),
    position: 'absolute',
  },
  imageView: {
    top: hp(3.5),
    width: wp(40),      
    height: wp(40),
    borderRadius: wp(20),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userimage: {
    width: '100%',              
    height: '100%',
    borderRadius: wp(20),     
  },
  
  cameraIcon: {
    backgroundColor: colors.WHITE,
    padding: wp(2),
    borderRadius: wp(6),
    left: wp(16),
    top: wp(-1.5),
  },
  iconWrapper: {
    backgroundColor: '#B7B1F2',
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    paddingHorizontal: wp(5),
    marginTop: hp(12),
  },
  label: {
    fontFamily: typography.DMSans_Medium_500,
    fontSize: fp(1.6),
    color: colors.BUTTON_COLOR,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: wp(2),
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    marginVertical: hp(1),
    marginBottom: hp(3),
    borderWidth: wp(0.4),
    borderColor: '#E6EAF5',
  },

  inputText: {
    flex: 1,
    marginLeft: wp(2),
    color: colors.SUBHEADING,
    fontSize: fp(1.8),
    fontFamily: typography.DMSans_Medium_500,
  },
  editIcon: {
    marginLeft: wp(2),
  },
  checkIcon:{
    left:wp(-27)
  },
  labelIcon:{
    backgroundColor:colors.LIGHT_GREY,
    padding:wp(1),
    borderRadius:wp(2)
  },
  changeText: {
    color: colors.BLUE,
    marginLeft: wp(2),
    fontSize: hp(1.8),
  },
  updateBtn: {
    backgroundColor: colors.BLUE,
    borderRadius: wp(3),
    paddingVertical: hp(2.2),
    alignItems: 'center',
    marginTop: hp(8),
  },
  updateText: {
    color: colors.WHITE,
    fontFamily: typography.DMSans_Semibold_600,
    fontSize: fp(2.2),
  },
});
