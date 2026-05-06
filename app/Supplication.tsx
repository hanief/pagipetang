/**
 * Supplication - Main prayer interface with beautiful Islamic design
 * Completely redesigned with fixed counter logic, proper progress tracking,
 * and Islamic aesthetic
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { matsuratData } from '../data/matsurat';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { useColorScheme } from '@/hooks/useColorScheme';
import { PrayerCard } from '@/components/PrayerCard';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { NavigationControls } from '@/components/NavigationControls';
import { SupplicationHeader } from '@/components/SupplicationHeader';

SplashScreen.preventAutoHideAsync();

type DisplayMode = 'arabic' | 'translation' | 'transliteration';

const DISPLAY_MODES: { [key: string]: DisplayMode } = {
  ARABIC: 'arabic',
  TRANSLATION: 'translation',
  TRANSLITERATION: 'transliteration'
};

const Supplication = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(DISPLAY_MODES.ARABIC);
  const [counter, setCounter] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Load Arabic fonts
  const [loaded, error] = useFonts({
    'DigitalKhatt': require('../assets/fonts/digitalkhatt.otf'),
    'Uthmanic': require('../assets/fonts/uthmanic.otf'),
    'Madina': require('../assets/fonts/madina.otf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Handle mode toggle from params
  useEffect(() => {
    if (params.toggleMode) {
      toggleDisplayMode();
    }
  }, [params.toggleMode]);

  // Get current prayer data
  const currentPrayer = matsuratData[currentIndex];
  const maxCounter = currentPrayer?.repeat || 1;

  // Calculate overall progress with proper logic
  const { totalSteps, currentStep, progressPercentage } = useMemo(() => {
    const total = matsuratData.reduce((acc, prayer) => acc + prayer.repeat, 0);
    const current = matsuratData
      .slice(0, currentIndex)
      .reduce((acc, prayer) => acc + prayer.repeat, 0) + counter + 1;
    const percentage = (current / total) * 100;

    return {
      totalSteps: total,
      currentStep: current,
      progressPercentage: Math.min(percentage, 100),
    };
  }, [currentIndex, counter]);

  // Fade animation for content transitions
  const animateTransition = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Execute callback in the middle of animation
    setTimeout(callback, 150);
  };

  const handleNext = () => {
    animateTransition(() => {
      if (counter < maxCounter - 1) {
        // Increase counter based on current prayer's repeat value
        setCounter(counter + 1);
      } else {
        // When counter completes, go to next prayer and reset counter
        if (currentIndex < matsuratData.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setCounter(0);
        }
      }
    });
  };

  const handlePrevious = () => {
    animateTransition(() => {
      if (counter > 0) {
        // Decrease counter
        setCounter(counter - 1);
      } else {
        // When counter is 0, go to previous prayer
        if (currentIndex > 0) {
          const prevIndex = currentIndex - 1;
          const prevPrayer = matsuratData[prevIndex];
          setCurrentIndex(prevIndex);
          setCounter(prevPrayer.repeat - 1);
        }
      }
    });
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

  // Check navigation bounds
  const canGoPrevious = !(currentIndex === 0 && counter === 0);
  const canGoNext = !(currentIndex === matsuratData.length - 1 && counter === maxCounter - 1);

  // Side tap handlers
  const handleLeftTap = () => {
    if (canGoPrevious) handlePrevious();
  };

  const handleRightTap = () => {
    if (canGoNext) handleNext();
  };

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Subtle background gradient */}
      <LinearGradient
        colors={[colors.background, colors.surfaceVariant]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      {/* Header with prayer name and mode toggle */}
      <SupplicationHeader
        prayerName={currentPrayer?.name || ''}
        currentNumber={currentIndex + 1}
        totalNumber={matsuratData.length}
        displayMode={displayMode}
        onToggleMode={toggleDisplayMode}
      />

      {/* Main content area */}
      <View style={styles.contentContainer}>
        {/* Left touchable area - Previous */}
        <TouchableOpacity
          style={styles.touchableLeft}
          onPress={handleLeftTap}
          disabled={!canGoPrevious}
          activeOpacity={1}
        >
          <View style={styles.touchableOverlay} />
        </TouchableOpacity>

        {/* Prayer content with animation */}
        <Animated.View style={[styles.cardContainer, { opacity: fadeAnim }]}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <PrayerCard
              arabic={currentPrayer?.arabic || ''}
              translation={currentPrayer?.translation}
              transliteration={currentPrayer?.transliteration}
              displayMode={displayMode}
            />
          </ScrollView>
        </Animated.View>

        {/* Right touchable area - Next */}
        <TouchableOpacity
          style={styles.touchableRight}
          onPress={handleRightTap}
          disabled={!canGoNext}
          activeOpacity={1}
        >
          <View style={styles.touchableOverlay} />
        </TouchableOpacity>
      </View>

      {/* Progress indicator */}
      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        counter={counter}
        maxCounter={maxCounter}
      />

      {/* Navigation controls */}
      <NavigationControls
        onPrevious={handlePrevious}
        onNext={handleNext}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },

  touchableLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '30%', // Reduced from 50% for better UX
    height: '100%',
    zIndex: 2,
  },

  touchableRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '30%', // Reduced from 50% for better UX
    height: '100%',
    zIndex: 2,
  },

  touchableOverlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },

  cardContainer: {
    flex: 1,
    zIndex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
  },
});

export default Supplication;
