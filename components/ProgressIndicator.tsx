/**
 * ProgressIndicator component - Beautiful gradient progress bar with counter
 * Shows overall progress through prayers with Islamic aesthetic
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { TextStyles } from '@/constants/Typography';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { useColorScheme } from '@/hooks/useColorScheme';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  counter: number;
  maxCounter: number;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  counter,
  maxCounter
}: ProgressIndicatorProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Animated value for smooth progress transitions
  const progressAnim = useRef(new Animated.Value(0)).current;

  const progressPercentage = Math.min((currentStep / totalSteps) * 100, 100);

  useEffect(() => {
    Animated.spring(progressAnim, {
      toValue: progressPercentage,
      useNativeDriver: false,
      tension: 50,
      friction: 7,
    }).start();
  }, [progressPercentage]);

  const animatedWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Counter text */}
      <View style={styles.counterContainer}>
        <Text style={[styles.counterText, { color: colors.textSecondary }]}>
          {counter + 1} / {maxCounter}
        </Text>
        <Text style={[styles.progressText, { color: colors.textTertiary }]}>
          {Math.round(progressPercentage)}% complete
        </Text>
      </View>

      {/* Progress bar container */}
      <View style={[styles.progressBarContainer, { backgroundColor: colors.progressBackground }]}>
        {/* Animated gradient progress */}
        <Animated.View style={[styles.progressBarAnimated, { width: animatedWidth }]}>
          <LinearGradient
            colors={[colors.progressGradientStart, colors.progressGradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          />
        </Animated.View>

        {/* Shimmer effect for active progress */}
        {progressPercentage > 0 && progressPercentage < 100 && (
          <View style={styles.shimmerContainer}>
            <View style={[styles.shimmer, { backgroundColor: colors.surface }]} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: Spacing.md,
  },

  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  counterText: {
    ...TextStyles.counter,
    fontSize: 16,
  },

  progressText: {
    ...TextStyles.caption,
    fontSize: 12,
  },

  progressBarContainer: {
    height: 8,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    position: 'relative',
  },

  progressBarAnimated: {
    height: '100%',
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },

  gradient: {
    flex: 1,
    height: '100%',
  },

  shimmerContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },

  shimmer: {
    position: 'absolute',
    right: 0,
    width: 40,
    height: '100%',
    opacity: 0.3,
  },
});
