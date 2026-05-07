import React, { useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform,
  TouchableOpacity,
  StatusBar,
  ViewToken,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { matsuratData } from '../data/matsurat';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Haptics from 'expo-haptics';

SplashScreen.preventAutoHideAsync();

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type Slide = {
  slideId: string;
  prayerName: string;
  arabic: string;
  translation?: string;
  transliteration?: string;
  repeatIndex: number;
  repeatTotal: number;
};

function buildSlides(): Slide[] {
  const slides: Slide[] = [];
  matsuratData.forEach((prayer, idx) => {
    for (let i = 0; i < prayer.repeat; i++) {
      slides.push({
        slideId: `${idx}-${i}`,
        prayerName: prayer.name,
        arabic: prayer.arabic,
        translation: prayer.translation,
        transliteration: prayer.transliteration,
        repeatIndex: i,
        repeatTotal: prayer.repeat,
      });
    }
  });
  return slides;
}

const SLIDES = buildSlides();

interface SlideProps {
  slide: Slide;
  slideIndex: number;
  totalSlides: number;
  insetsTop: number;
  insetsBottom: number;
}

const SupplicationSlide = React.memo(function SupplicationSlide({
  slide,
  slideIndex,
  totalSlides,
  insetsTop,
  insetsBottom,
}: SlideProps) {
  return (
    <View style={styles.slide}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Dark background */}
      <LinearGradient
        colors={['#060A08', '#0E150C', '#060A08']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Warm radial glow in the center */}
      <LinearGradient
        colors={['transparent', 'rgba(150, 100, 15, 0.14)', 'transparent']}
        style={styles.centerGlow}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insetsTop + 16 }]}>
        <View style={styles.headerSide} />
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>MORNING ADHKAR</Text>
          <Text style={styles.headerSubtitle}>{slideIndex + 1} of {totalSlides}</Text>
        </View>
        <TouchableOpacity style={[styles.headerSide, styles.headerSideRight]} activeOpacity={0.7}>
          <Ionicons name="ellipsis-horizontal" size={20} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>
      </View>

      {/* Arabic text */}
      <View style={styles.arabicContainer}>
        <Text style={styles.arabicText}>{slide.arabic}</Text>
        <Text style={styles.prayerNameLabel}>{slide.prayerName}</Text>
      </View>

      {/* Bottom panel fade */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.75)', 'rgba(0,0,0,0.97)']}
        style={[styles.bottomPanel, { paddingBottom: insetsBottom + 12 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        pointerEvents="box-none"
      >
        {/* Transliteration section */}
        {slide.transliteration ? (
          <>
            <Text style={styles.sectionLabel}>TRANSLITERATION</Text>
            <Text style={styles.transliterationText} numberOfLines={3}>
              {slide.transliteration}
            </Text>
          </>
        ) : null}

        {/* Translation */}
        {slide.translation ? (
          <Text style={styles.translationText} numberOfLines={3}>
            {slide.translation}
          </Text>
        ) : null}

        {/* Repeat indicator */}
        {slide.repeatTotal > 1 && (
          <View style={styles.repeatRow}>
            {Array.from({ length: slide.repeatTotal }, (_, i) => (
              <View
                key={i}
                style={[styles.dot, i === slide.repeatIndex && styles.dotActive]}
              />
            ))}
          </View>
        )}

        {/* Swipe hint */}
        {slideIndex < totalSlides - 1 && (
          <View style={styles.nextHintRow}>
            <Ionicons name="chevron-up" size={13} color="rgba(255,255,255,0.35)" />
            <Text style={styles.nextHintText}>NEXT ADHKAR</Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );
});

export default function Supplication() {
  const insets = useSafeAreaInsets();

  const [fontsLoaded, fontError] = useFonts({
    DigitalKhatt: require('../assets/fonts/digitalkhatt.otf'),
    Uthmanic: require('../assets/fonts/uthmanic.otf'),
    Madina: require('../assets/fonts/madina.otf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 });

  const onViewableItemsChangedRef = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        if (Platform.OS !== 'web') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      }
    }
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Slide; index: number }) => (
      <SupplicationSlide
        slide={item}
        slideIndex={index}
        totalSlides={SLIDES.length}
        insetsTop={insets.top}
        insetsBottom={insets.bottom}
      />
    ),
    [insets.top, insets.bottom]
  );

  const getItemLayout = useCallback(
    (_: ArrayLike<Slide> | null | undefined, index: number) => ({
      length: SCREEN_HEIGHT,
      offset: SCREEN_HEIGHT * index,
      index,
    }),
    []
  );

  if (!fontsLoaded && !fontError) return null;

  return (
    <FlatList
      data={SLIDES}
      keyExtractor={item => item.slideId}
      renderItem={renderItem}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      getItemLayout={getItemLayout}
      onViewableItemsChanged={onViewableItemsChangedRef.current}
      viewabilityConfig={viewabilityConfig.current}
      scrollEventThrottle={16}
      decelerationRate="fast"
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },

  centerGlow: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.12,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.55,
  },

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    zIndex: 10,
  },

  headerSide: {
    width: 36,
  },

  headerSideRight: {
    alignItems: 'flex-end',
    paddingTop: 2,
  },

  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2.5,
  },

  headerSubtitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    letterSpacing: 0.5,
    marginTop: 3,
  },

  arabicContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingBottom: SCREEN_HEIGHT * 0.38,
    paddingTop: 80,
  },

  arabicText: {
    fontFamily: 'Uthmanic',
    fontSize: 40,
    lineHeight: 72,
    color: '#FFFFFF',
    textAlign: 'center',
    writingDirection: 'rtl',
    textShadowColor: 'rgba(190, 140, 20, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 24,
  },

  prayerNameLabel: {
    color: 'rgba(195, 155, 50, 0.85)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    marginTop: 28,
  },

  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 56,
    paddingHorizontal: 24,
  },

  sectionLabel: {
    color: 'rgba(200, 158, 55, 0.9)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.5,
    marginBottom: 8,
  },

  transliterationText: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 15,
    fontStyle: 'italic',
    lineHeight: 25,
    marginBottom: 10,
  },

  translationText: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 13,
    lineHeight: 21,
    marginBottom: 16,
  },

  repeatRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 14,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },

  dotActive: {
    width: 18,
    backgroundColor: 'rgba(200, 158, 55, 0.9)',
  },

  nextHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingBottom: 2,
  },

  nextHintText: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.5,
  },
});
