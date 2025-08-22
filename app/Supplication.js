import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useGlobalSearchParams } from 'expo-router';
import { matsuratData } from '../data/matsurat';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const DISPLAY_MODES = {
  ARABIC: 'arabic',
  TRANSLATION: 'translation',
  TRANSLITERATION: 'transliteration'
};

const Supplication = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODES.ARABIC);
  const [counter, setCounter] = useState(0);
  const params = useLocalSearchParams();
  const globalParams = useGlobalSearchParams();

  useEffect(() => {
    if (params.toggleMode) {
      toggleDisplayMode();
    }
  }, [params]);

  useEffect(() => {
  }, [globalParams]);

  const [loaded, error] = useFonts({
    'DigitalKhatt': require('../assets/fonts/digitalkhatt.otf'),
    'Uthmanic': require('../assets/fonts/uthmanic-script.otf'),
    'Madina': require('../assets/fonts/madina.otf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  const handleNext = () => {
    if (counter < 2) {
      // Increase counter until it reaches 3
      setCounter(counter + 1);
    } else {
      // When counter reaches 3, go to next prayer and reset counter
      if (currentIndex < matsuratData.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setCounter(0);
      }
    }
  };

  const handlePrevious = () => {
    if (counter > 0) {
      // Decrease counter until it reaches 0
      setCounter(counter - 1);
    } else {
      // When counter reaches 0, go to previous prayer and set counter to 2
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setCounter(2);
      }
    }
  };

  const toggleDisplayMode = () => {
    switch (displayMode) {
      case DISPLAY_MODES.ARABIC:
        setDisplayMode(DISPLAY_MODES.TRANSLATION);
        break;
      case DISPLAY_MODES.TRANSLATION:
        setDisplayMode(DISPLAY_MODES.TRANSLITERATION);
        break;
      case DISPLAY_MODES.TRANSLITERATION:
        setDisplayMode(DISPLAY_MODES.ARABIC);
        break; 
    }
  };

  // Calculate overall progress
  const totalPrayers = matsuratData.length;
  const stepsPerPrayer = matsuratData.repeat;
  const totalSteps = totalPrayers * stepsPerPrayer;
  const currentStep = (currentIndex * stepsPerPrayer) + counter + 1;
  const progressPercentage = (currentStep / totalSteps) * 100;

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Left touchable area - Previous */}
        <TouchableOpacity 
          style={styles.touchableLeft}
          onPress={handlePrevious}
          disabled={currentIndex === 0 && counter === 0}
        >
          <View style={styles.touchableOverlay} />
        </TouchableOpacity>

        {/* Content in the middle */}
        <View style={styles.textContainer}>
          <Text style={[
            styles.text,
            displayMode === DISPLAY_MODES.ARABIC && styles.arabicText,
            { fontFamily: 'Uthmanic', fontSize: 30 }
          ]}>
            {matsuratData[currentIndex][displayMode]}
          </Text>
        </View>

        {/* Right touchable area - Next */}
        <TouchableOpacity 
          style={styles.touchableRight}
          onPress={handleNext}
          disabled={currentIndex === matsuratData.length - 1 && counter === 2}
        >
          <View style={styles.touchableOverlay} />
        </TouchableOpacity>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, currentIndex === 0 && counter === 0 && styles.buttonDisabled]}
          onPress={handlePrevious}
          disabled={currentIndex === 0 && counter === 0}
        >
          <Text style={styles.buttonText}>&lt;</Text>
        </TouchableOpacity>

        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>{counter + 1}/3</Text>
        </View>

        <TouchableOpacity 
          style={[styles.button, currentIndex === matsuratData.length - 1 && counter === 2 && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={currentIndex === matsuratData.length - 1 && counter === 2}
        >
          <Text style={styles.buttonText}>&gt;</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row', // Horizontal layout for left and right sides
    position: 'relative',
  },
  touchableLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '50%', // Left half of the screen
    height: '100%',
    zIndex: 1,
  },
  touchableRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '50%', // Right half of the screen
    height: '100%',
    zIndex: 1,
  },
  touchableOverlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent', // Invisible overlay
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 0, // Below the touchable areas
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    color: '#444',
  },
  arabicText: {
    fontSize: 36,
    fontFamily: 'LPMQ IsepMisbah 2',
  },
  progressBarContainer: {
    padding: 10,
    paddingHorizontal: 20,
    marginBottom: 2,
    position: 'relative',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    width: '100%',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    position: 'relative',
    zIndex: 1,
  },
  progressText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    width: '40%',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  counterContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default Supplication; 
