import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import OnboardingImage1 from "../Assets/iPhone.svg";
import OnboardingImage2 from "../Assets/iPhone2.svg";
import OnboardingImage3 from "../Assets/iPhone3.svg";
import Group from "../Assets/Group.svg" 
import BottomVector from "../Assets/Vector1.svg"
import { hp, wp, fp } from '../utils/dimensions'; 


type RootStackParamList = {
  LoginScreen: undefined; 
};

interface OnboardingSlide {
  id: number;
  image: React.ReactNode; 
  text: string;
  text2: string;
  subText: string;
}

const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    image: <OnboardingImage1 width={wp(65)} height={hp(60)} />, 
    text: 'ACCEPT & DELIVER',
    text2: 'ORDERS!',
    subText: "Get new delivery requests, pick them up, and earn easily within your preferred location."
  },
  {
    id: 2,
    image: <OnboardingImage2 width={wp(65)} height={hp(60)} />, 
    text: 'GET PAID FAST &',
    text2: 'SECURELY!',
    subText: "Receive payments directly to your bank account after every successful delivery."
  },
  {
    id: 3,
    image: <OnboardingImage3 width={wp(65)} height={hp(60)} />,
    text: 'NAVIGATE WITH',
    text2: ' EASE!',
    subText: "Get real-time order updates and optimized delivery routes."
  },
];

const { width } = Dimensions.get('window');

const OnboardingCarousel: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const goToNextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleJoinNow = () => {
    navigation.navigate('LoginScreen');
  };

  const handleSkip = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.imageContainer}>
          {onboardingSlides[currentSlide].image}
        </View>
  
        <View style={styles.groupContainer}>
          <Group width={wp(50)} height={wp(50)} />
        </View>
      </View>

      <View style={styles.bottomSection}>
        <BottomVector 
          width={width} 
          height={hp(50)} 
          style={styles.vectorBackground}
        />
        
        <View style={styles.contentContainer}>
          <Text style={[styles.text, { fontSize: fp(3) }]}>
            {onboardingSlides[currentSlide].text}
            <Text style={styles.text2}> {onboardingSlides[currentSlide].text2}</Text>
          </Text>
          <Text style={[styles.subText, { fontSize: fp(1.8) }]}>
            {onboardingSlides[currentSlide].subText}
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={handleSkip}
          >
            <Text style={[styles.skipText, { fontSize: fp(2) }]}>Skip</Text>
          </TouchableOpacity>

          <View style={styles.indicators}>
            {onboardingSlides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentSlide === index && styles.activeIndicator,
                ]}
              />
            ))}
          </View>

          {currentSlide < onboardingSlides.length - 1 ? (
            <TouchableOpacity onPress={goToNextSlide} style={styles.nextButton}>
              <Svg width={wp(8)} height={wp(8)} viewBox="0 0 24 24" fill="none">
                <Circle cx="12" cy="12" r="12" fill="#2A60F1" />
                <Path
                  d="M10 8L14 12L10 16"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleJoinNow} style={styles.joinNowButton}>
              <Text style={[styles.joinNowText, { fontSize: fp(2) }]}>Join Now</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A60F1"
  },
  topSection: {
    flex: 0.6,
    justifyContent: 'flex-end',
  },
  bottomSection: {
    flex: 0.4,
    position: 'relative',
  },
  vectorBackground: {
    position: 'absolute',
    bottom: -5,
    left: 0,
    right: 0,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: -hp(10),
  },
  groupContainer: {
    position: 'absolute',
    top: hp(10), 
    left: wp(35), 
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: wp(8),
    paddingTop: hp(8),
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: hp(2),
  },
  text2: {
    fontWeight: 'bold',
    color: '#2A60F1',
  },
  subText: {
    color: 'gray',
    textAlign: 'center',
    marginTop: hp(0.8),
    lineHeight: hp(2.5),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(8),
    paddingBottom: hp(8),
  },
  skipButton: {
    flex: 1,
    alignItems: 'flex-start',
  },
  skipText: {
    color: 'gray',
  },
  indicators: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: '#D9D9D9',
    marginHorizontal: wp(1),
  },
  activeIndicator: {
    backgroundColor: '#2A60F1',
    width: wp(4),
  },
  nextButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
  joinNowButton: {
    backgroundColor: '#2A60F1',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(8),
    borderRadius: wp(6),
    alignItems: 'flex-end',
  },
  joinNowText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OnboardingCarousel;