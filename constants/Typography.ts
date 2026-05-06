/**
 * Typography system for Pagi Petang app
 * Responsive font sizes and styles for Arabic text, translations, and UI
 */

import { Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Responsive scaling based on screen width
const scale = width / 375; // Base on iPhone X width
const normalize = (size: number) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(newSize);
  } else if (Platform.OS === 'android') {
    return Math.round(newSize) - 2;
  } else {
    return Math.round(newSize);
  }
};

export const FontSizes = {
  // Arabic text sizes
  arabicLarge: normalize(38),
  arabicMedium: normalize(32),
  arabicSmall: normalize(28),

  // Translation/Transliteration
  translationLarge: normalize(20),
  translationMedium: normalize(18),
  translationSmall: normalize(16),

  // UI text
  title: normalize(24),
  subtitle: normalize(20),
  body: normalize(16),
  caption: normalize(14),
  small: normalize(12),

  // Headers
  h1: normalize(32),
  h2: normalize(28),
  h3: normalize(24),
  h4: normalize(20),

  // Buttons
  button: normalize(16),
  buttonLarge: normalize(18),
};

export const LineHeights = {
  // Arabic - needs extra space for diacritics
  arabic: normalize(60),
  arabicMedium: normalize(52),
  arabicSmall: normalize(44),

  // Standard line heights
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,

  // Specific use cases
  translation: normalize(32),
  transliteration: normalize(28),
  body: normalize(24),
};

export const FontWeights = {
  thin: '100' as const,
  extraLight: '200' as const,
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,
  black: '900' as const,
};

export const FontFamilies = {
  // Arabic fonts (loaded in _layout.tsx)
  arabicUthmanic: 'Uthmanic',
  arabicMadina: 'Madina',
  arabicDigital: 'DigitalKhatt',

  // System fonts for translation/UI
  system: Platform.select({
    ios: 'System',
    android: 'Roboto',
    web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    default: 'System',
  }),
};

// Pre-defined text styles
export const TextStyles = {
  // Arabic prayer text
  arabicPrayer: {
    fontFamily: FontFamilies.arabicUthmanic,
    fontSize: FontSizes.arabicMedium,
    lineHeight: LineHeights.arabicMedium,
    textAlign: 'right' as const,
    writingDirection: 'rtl' as const,
  },

  arabicPrayerLarge: {
    fontFamily: FontFamilies.arabicUthmanic,
    fontSize: FontSizes.arabicLarge,
    lineHeight: LineHeights.arabic,
    textAlign: 'right' as const,
    writingDirection: 'rtl' as const,
  },

  // Translation text
  translation: {
    fontFamily: FontFamilies.system,
    fontSize: FontSizes.translationMedium,
    lineHeight: LineHeights.translation,
    textAlign: 'center' as const,
    fontWeight: FontWeights.regular,
  },

  translationLarge: {
    fontFamily: FontFamilies.system,
    fontSize: FontSizes.translationLarge,
    lineHeight: LineHeights.translation,
    textAlign: 'center' as const,
    fontWeight: FontWeights.regular,
  },

  // Transliteration text
  transliteration: {
    fontFamily: FontFamilies.system,
    fontSize: FontSizes.translationMedium,
    lineHeight: LineHeights.transliteration,
    textAlign: 'center' as const,
    fontWeight: FontWeights.light,
    fontStyle: 'italic' as const,
  },

  // Prayer name/title
  prayerName: {
    fontFamily: FontFamilies.system,
    fontSize: FontSizes.title,
    lineHeight: LineHeights.normal * FontSizes.title,
    fontWeight: FontWeights.semiBold,
    textAlign: 'center' as const,
  },

  // Headers
  h1: {
    fontFamily: FontFamilies.system,
    fontSize: FontSizes.h1,
    lineHeight: LineHeights.tight * FontSizes.h1,
    fontWeight: FontWeights.bold,
  },

  h2: {
    fontFamily: FontFamilies.system,
    fontSize: FontSizes.h2,
    lineHeight: LineHeights.tight * FontSizes.h2,
    fontWeight: FontWeights.semiBold,
  },

  h3: {
    fontFamily: FontFamilies.system,
    fontSize: FontSizes.h3,
    lineHeight: LineHeights.normal * FontSizes.h3,
    fontWeight: FontWeights.semiBold,
  },

  // Body text
  body: {
    fontFamily: FontFamilies.system,
    fontSize: FontSizes.body,
    lineHeight: LineHeights.body,
    fontWeight: FontWeights.regular,
  },

  bodyBold: {
    fontFamily: FontFamilies.system,
    fontSize: FontSizes.body,
    lineHeight: LineHeights.body,
    fontWeight: FontWeights.semiBold,
  },

  // Caption text
  caption: {
    fontFamily: FontFamilies.system,
    fontSize: FontSizes.caption,
    lineHeight: LineHeights.normal * FontSizes.caption,
    fontWeight: FontWeights.regular,
  },

  captionBold: {
    fontFamily: FontFamilies.system,
    fontSize: FontSizes.caption,
    lineHeight: LineHeights.normal * FontSizes.caption,
    fontWeight: FontWeights.semiBold,
  },

  // Button text
  button: {
    fontFamily: FontFamilies.system,
    fontSize: FontSizes.button,
    fontWeight: FontWeights.semiBold,
    textAlign: 'center' as const,
  },

  buttonLarge: {
    fontFamily: FontFamilies.system,
    fontSize: FontSizes.buttonLarge,
    fontWeight: FontWeights.bold,
    textAlign: 'center' as const,
  },

  // Counter/progress text
  counter: {
    fontFamily: FontFamilies.system,
    fontSize: FontSizes.body,
    fontWeight: FontWeights.medium,
  },

  // Prayer number indicator
  prayerNumber: {
    fontFamily: FontFamilies.system,
    fontSize: FontSizes.caption,
    fontWeight: FontWeights.medium,
    letterSpacing: 0.5,
  },
};

export const Typography = {
  FontSizes,
  LineHeights,
  FontWeights,
  FontFamilies,
  TextStyles,
  normalize,
};
