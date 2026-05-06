/**
 * SupplicationHeader component - Beautiful header showing prayer name and mode toggle
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { TextStyles, FontSizes } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { useColorScheme } from '@/hooks/useColorScheme';

type DisplayMode = 'arabic' | 'translation' | 'transliteration';

interface SupplicationHeaderProps {
  prayerName: string;
  currentNumber: number;
  totalNumber: number;
  displayMode: DisplayMode;
  onToggleMode: () => void;
}

export function SupplicationHeader({
  prayerName,
  currentNumber,
  totalNumber,
  displayMode,
  onToggleMode
}: SupplicationHeaderProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getModeLabel = () => {
    switch (displayMode) {
      case 'arabic':
        return 'العربية';
      case 'translation':
        return 'Terjemahan';
      case 'transliteration':
        return 'Latin';
      default:
        return 'العربية';
    }
  };

  const getModeIcon = () => {
    switch (displayMode) {
      case 'arabic':
        return 'book';
      case 'translation':
        return 'language';
      case 'transliteration':
        return 'text';
      default:
        return 'book';
    }
  };

  return (
    <View style={[styles.container, { borderBottomColor: colors.divider }]}>
      {/* Prayer name and number */}
      <View style={styles.titleContainer}>
        <Text style={[styles.prayerName, { color: colors.text }]} numberOfLines={1}>
          {prayerName}
        </Text>
        <Text style={[styles.prayerNumber, { color: colors.textSecondary }]}>
          {currentNumber} / {totalNumber}
        </Text>
      </View>

      {/* Mode toggle button */}
      <TouchableOpacity
        style={[styles.modeButton, { backgroundColor: colors.surfaceVariant }]}
        onPress={onToggleMode}
        activeOpacity={0.7}
        accessibilityLabel={`Current mode: ${getModeLabel()}. Tap to change`}
        accessibilityRole="button"
      >
        <Ionicons
          name={getModeIcon() as any}
          size={18}
          color={colors.primary}
        />
        <Text style={[styles.modeText, { color: colors.primary }]}>
          {getModeLabel()}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },

  titleContainer: {
    flex: 1,
    marginRight: Spacing.md,
  },

  prayerName: {
    ...TextStyles.h3,
    fontSize: FontSizes.h4,
    marginBottom: 2,
  },

  prayerNumber: {
    ...TextStyles.caption,
    fontSize: 12,
    letterSpacing: 0.5,
  },

  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    gap: Spacing.xs,
  },

  modeText: {
    ...TextStyles.caption,
    fontSize: 13,
    fontWeight: '600',
  },
});
