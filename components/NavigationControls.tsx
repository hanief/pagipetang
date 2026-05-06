/**
 * NavigationControls component - Beautiful navigation buttons for prayer navigation
 * with haptic feedback and smooth animations
 */

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/Colors';
import { TextStyles } from '@/constants/Typography';
import { Spacing, BorderRadius, Shadows } from '@/constants/Spacing';
import { useColorScheme } from '@/hooks/useColorScheme';

interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export function NavigationControls({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext
}: NavigationControlsProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handlePress = (callback: () => void, enabled: boolean) => {
    if (!enabled) return;

    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    callback();
  };

  const getButtonStyle = (enabled: boolean) => [
    styles.button,
    {
      backgroundColor: enabled ? colors.buttonPrimary : colors.buttonDisabled,
      ...Platform.select({
        ios: enabled ? Shadows.small : {},
        android: enabled ? Shadows.small : {},
        web: enabled ? {
          boxShadow: `0px 2px 8px ${colors.cardShadow}`,
        } : {},
      }),
    },
    !enabled && styles.buttonDisabled,
  ];

  return (
    <View style={styles.container}>
      {/* Previous button */}
      <TouchableOpacity
        style={getButtonStyle(canGoPrevious)}
        onPress={() => handlePress(onPrevious, canGoPrevious)}
        disabled={!canGoPrevious}
        activeOpacity={0.7}
        accessibilityLabel="Previous prayer"
        accessibilityRole="button"
        accessibilityState={{ disabled: !canGoPrevious }}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color={canGoPrevious ? colors.buttonText : colors.buttonTextDisabled}
        />
        <Text style={[
          styles.buttonText,
          { color: canGoPrevious ? colors.buttonText : colors.buttonTextDisabled }
        ]}>
          Previous
        </Text>
      </TouchableOpacity>

      {/* Next button */}
      <TouchableOpacity
        style={getButtonStyle(canGoNext)}
        onPress={() => handlePress(onNext, canGoNext)}
        disabled={!canGoNext}
        activeOpacity={0.7}
        accessibilityLabel="Next prayer"
        accessibilityRole="button"
        accessibilityState={{ disabled: !canGoNext }}
      >
        <Text style={[
          styles.buttonText,
          { color: canGoNext ? colors.buttonText : colors.buttonTextDisabled }
        ]}>
          Next
        </Text>
        <Ionicons
          name="chevron-forward"
          size={24}
          color={canGoNext ? colors.buttonText : colors.buttonTextDisabled}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },

  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.buttonPaddingVertical,
    paddingHorizontal: Spacing.buttonPaddingHorizontal,
    borderRadius: BorderRadius.button,
    gap: Spacing.xs,
    minHeight: 48, // Accessibility - min touch target
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    ...TextStyles.button,
    fontSize: 16,
  },
});
