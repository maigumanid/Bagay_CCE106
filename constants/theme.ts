import { Platform } from 'react-native';

export const COLORS = {
  background: '#0D0D0D',
  surface: '#181818',
  surfaceSecondary: '#242424',

  primary: '#E10600',

  textPrimary: '#FFFFFF',
  textSecondary: '#999999',
  textMuted: '#6F6F6F',

  border: '#292929',
} as const;

export const TYPOGRAPHY = {
  brand: {
    fontSize: 11,
    fontWeight: '800' as const,
    letterSpacing: 2,
  },

  screenTitle: {
    fontSize: 28,
    fontWeight: '800' as const,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700' as const,
  },

  metricValue: {
    fontSize: 28,
    fontWeight: '800' as const,
  },

  metricLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    letterSpacing: 0.8,
  },

  body: {
    fontSize: 14,
    fontWeight: '700' as const,
  },

  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
  },

  action: {
    fontSize: 11,
    fontWeight: '600' as const,
  },

  footer: {
    fontSize: 9,
    fontWeight: '600' as const,
    letterSpacing: 1.5,
  },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  xxxl: 30,
} as const;

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 14,
  xl: 16,
  round: 999,
} as const;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
