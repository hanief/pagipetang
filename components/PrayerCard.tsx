/**
 * PrayerCard component - Beautiful elevated card for displaying prayer content
 * with Islamic aesthetic design
 */

import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { TextStyles, FontFamilies } from '@/constants/Typography';
import { Spacing, BorderRadius, Shadows } from '@/constants/Spacing';
import { useColorScheme } from '@/hooks/useColorScheme';

type DisplayMode = 'arabic' | 'translation' | 'transliteration';

interface PrayerCardProps {
  arabic: string;
  translation?: string;
  transliteration?: string;
  displayMode: DisplayMode;
}

export function PrayerCard({
  arabic,
  translation,
  transliteration,
  displayMode
}: PrayerCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getContent = () => {
    switch (displayMode) {
      case 'arabic':
        return {
          text: arabic,
          style: styles.arabicText,
          color: colors.arabic,
        };
      case 'translation':
        return {
          text: translation || arabic,
          style: styles.translationText,
          color: colors.translation,
        };
      case 'transliteration':
        return {
          text: transliteration || arabic,
          style: styles.transliterationText,
          color: colors.transliteration,
        };
      default:
        return {
          text: arabic,
          style: styles.arabicText,
          color: colors.arabic,
        };
    }
  };

  const content = getContent();

  return (
    <View style={[
      styles.card,
      {
        backgroundColor: colors.cardBackground,
        ...Platform.select({
          ios: Shadows.islamic,
          android: Shadows.islamic,
          web: {
            boxShadow: `0px 4px 12px ${colors.cardShadow}`,
          } as object,
        }),
      }
    ]}>
      {/* Decorative top border with gradient feel */}
      <View style={[styles.decorativeBorder, { backgroundColor: colors.primary }]} />

      {/* Prayer content */}
      <View style={styles.contentContainer}>
        <Text
          style={[
            content.style,
            { color: content.color }
          ]}
          selectable
        >
          {content.text}
        </Text>
      </View>

      {/* Subtle bottom accent */}
      <View style={[styles.bottomAccent, { backgroundColor: colors.secondary, opacity: 0.15 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.card,
    marginHorizontal: Spacing.prayerCardMargin,
    overflow: 'hidden',
    minHeight: 200,
    justifyContent: 'center',
  },

  decorativeBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },

  bottomAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
  },

  contentContainer: {
    padding: Spacing.cardPaddingLarge,
    paddingVertical: Spacing.xl,
  },

  arabicText: {
    ...TextStyles.arabicPrayer,
    fontFamily: FontFamilies.arabicUthmanic,
    textAlign: 'right',
    writingDirection: 'rtl',
  },

  translationText: {
    ...TextStyles.translation,
    textAlign: 'center',
  },

  transliterationText: {
    ...TextStyles.transliteration,
    textAlign: 'center',
  },
});
