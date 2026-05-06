/**
 * Spacing and layout constants for Pagi Petang app
 * Consistent spacing scale for margins, padding, and layout
 */

export const Spacing = {
  // Base spacing scale (8px grid system)
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,

  // Specific use cases
  cardPadding: 20,
  cardPaddingLarge: 24,
  screenPadding: 20,
  screenPaddingLarge: 24,

  // Component spacing
  buttonPadding: 16,
  buttonPaddingVertical: 12,
  buttonPaddingHorizontal: 24,

  iconSize: 24,
  iconSizeLarge: 32,
  iconSizeSmall: 20,

  // Progress bar
  progressBarHeight: 6,
  progressBarRadius: 3,

  // Prayer card
  prayerCardGap: 16,
  prayerCardMargin: 20,
};

export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,

  // Specific components
  card: 16,
  button: 12,
  input: 8,
  modal: 20,
};

export const Shadows = {
  // iOS-style shadows
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4, // Android
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8, // Android
  },

  // Islamic-themed shadow (subtle, with teal tint)
  islamic: {
    shadowColor: '#2D5F5D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4, // Android
  },

  islamicLarge: {
    shadowColor: '#2D5F5D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8, // Android
  },
};

export const Layout = {
  // Max width for web/tablet
  maxWidth: 600,
  maxWidthNarrow: 450,
  maxWidthWide: 800,

  // Min touch target size (accessibility)
  minTouchTarget: 44,

  // Header heights
  headerHeight: 60,
  headerHeightLarge: 80,

  // Tab bar
  tabBarHeight: 60,

  // Content spacing
  contentMaxWidth: 600,
  contentPadding: 20,
};

export const Animations = {
  // Duration in milliseconds
  fast: 150,
  normal: 250,
  slow: 350,
  verySlow: 500,

  // Easing curves
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  linear: 'linear',
};

export const Opacity = {
  disabled: 0.5,
  subtle: 0.7,
  semiTransparent: 0.8,
  almostOpaque: 0.9,
  opaque: 1,
};

// Utility function to create consistent spacing
export const spacing = (...args: (keyof typeof Spacing)[]) => {
  return args.map(key => Spacing[key]).join(' ');
};

// Export everything as a single object
export const LayoutConstants = {
  Spacing,
  BorderRadius,
  Shadows,
  Layout,
  Animations,
  Opacity,
  spacing,
};
