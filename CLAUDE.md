# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Pagi Petang" - an Islamic supplication (matsurat) mobile app built with Expo and React Native. The app displays Arabic prayers with translations and transliterations, designed for morning and evening recitations.

## Development Commands

- **Start development server**: `npx expo start` or `npm start`
- **Run on Android**: `npm run android`
- **Run on iOS**: `npm run ios`
- **Run on web**: `npm run web`
- **Run tests**: `npm test`
- **Lint code**: `npm run lint`

## Architecture

- **Framework**: Expo Router with file-based routing
- **Main entry**: `app/_layout.tsx` (root layout with navigation)
- **Home screen**: `app/index.tsx` (renders the Supplication component)
- **Core component**: `app/Supplication.js` (main prayer interface)
- **Data source**: `data/matsurat.js` (contains prayer texts in Arabic, translation, and transliteration)

### Key Features

1. **Prayer Navigation**: Swipe or button navigation through 12 prayers
2. **Display Modes**: Toggle between Arabic, Indonesian translation, and transliteration
3. **Progress Tracking**: Visual progress bar showing current prayer and step
4. **Arabic Fonts**: Uses custom Arabic fonts (LPMQ IsepMisbah 2, KFGQPC Uthmanic Script HAFS)

### Component Structure

- `components/`: Reusable UI components with theming support
  - `ThemedText.tsx` and `ThemedView.tsx`: Theme-aware components
  - `navigation/TabBarIcon.tsx`: Navigation icons
- `hooks/`: Custom React hooks for theming
- `constants/`: App constants including colors

### Build Configuration

- **TypeScript**: Strict mode enabled with path aliases (`@/*` maps to root)
- **EAS Build**: Configured for development, preview, and production builds
- **Platform Support**: iOS, Android, and web
- **Bundle ID**: `com.haniefutama.pagipetang`

### Testing

- **Framework**: Jest with jest-expo preset
- **Test files**: Located in `components/__tests__/`
- **Snapshots**: Stored in `__snapshots__/` directories

When modifying the app, maintain the Islamic content respectfully and ensure Arabic text displays correctly with proper fonts.