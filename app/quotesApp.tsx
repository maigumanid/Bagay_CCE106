import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
} from 'react-native';

const theme = {
  colors: {
    background: '#0B0C10',
    card: '#161822',
    cardBorder: '#26293B',
    primary: '#8B5CF6',
    primaryMuted: 'rgba(139, 92, 246, 0.15)',
    primaryDisabled: '#4C1D95',
    textPrimary: '#F9FAFB',
    textSecondary: '#9CA3AF',
    accent: '#C4B5FD',
    error: '#F87171',
    errorBg: 'rgba(248, 113, 113, 0.12)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 20,
    xl: 28,
  },
  radii: {
    sm: 8,
    md: 16,
    lg: 24,
    pill: 9999,
  },
};

const API_URL = 'https://dummyjson.com/quotes/random';

export default function App() {
  const { width } = useWindowDimensions();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isSmallDevice = width < 360;

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Server status ${response.status}`);
      }

      const data = await response.json();

      if (!data || !data.quote) {
        throw new Error('Received an empty quote payload.');
      }

      setQuote(data);
    } catch (err) {
      setError(err.message || 'Unable to connect to quote server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.mainLayout}>
        <View style={styles.headerContainer}>
          <View style={styles.pillBadge}>
            <Text style={styles.pillText}>DAILY MOTIVATION</Text>
          </View>
          <Text style={[styles.appTitle, { fontSize: isSmallDevice ? 24 : 28 }]}>
            Quotes
          </Text>
        </View>

        <View style={styles.centerStack}>
          <View style={styles.quoteCard}>
            {loading ? (
              <View style={styles.stateWrapper}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.loadingText}>Fetching quote...</Text>
              </View>
            ) : error ? (
              <View style={styles.stateWrapper}>
                <View style={styles.errorBadge}>
                  <Text style={styles.errorBadgeText}>CONNECTION ISSUES</Text>
                </View>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={fetchQuote}
                  activeOpacity={0.7}
                >
                  <Text style={styles.retryButtonText}>Tap to Retry</Text>
                </TouchableOpacity>
              </View>
            ) : quote ? (
              <View style={styles.quoteBodyWrapper}>
                <Text style={styles.quoteIcon}>“</Text>
                <Text style={[styles.quoteText, { fontSize: isSmallDevice ? 17 : 20 }]}>
                  {quote.quote}
                </Text>
                <View style={styles.authorRow}>
                  <View style={styles.accentBar} />
                  <Text style={styles.authorText}>{quote.author}</Text>
                </View>
              </View>
            ) : (
              <View style={styles.stateWrapper}>
                <Text style={styles.emptyText}>No quote available right now.</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.primaryButton,
              loading && { backgroundColor: theme.colors.primaryDisabled },
            ]}
            onPress={fetchQuote}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? 'SYNCING...' : 'NEW QUOTE'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  mainLayout: {
    flex: 1,
    paddingHorizontal: '6%',
    paddingVertical: theme.spacing.md,
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  pillBadge: {
    backgroundColor: theme.colors.primaryMuted,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    marginBottom: theme.spacing.xs,
  },
  pillText: {
    color: theme.colors.accent,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  appTitle: {
    color: theme.colors.textPrimary,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  centerStack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  quoteCard: {
    width: '100%',
    padding: '7%',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    justifyContent: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
    marginBottom: theme.spacing.lg,
  },
  stateWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.lg,
  },
  loadingText: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
    fontSize: 14,
    fontWeight: '500',
  },
  errorBadge: {
    backgroundColor: theme.colors.errorBg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radii.pill,
    marginBottom: theme.spacing.sm,
  },
  errorBadgeText: {
    color: theme.colors.error,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  errorText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  retryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radii.sm,
  },
  retryButtonText: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  quoteBodyWrapper: {
    width: '100%',
  },
  quoteIcon: {
    color: theme.colors.primary,
    fontSize: 44,
    fontWeight: '900',
    lineHeight: 36,
    marginBottom: -8,
  },
  quoteText: {
    color: theme.colors.textPrimary,
    fontWeight: '600',
    lineHeight: 28,
    marginBottom: theme.spacing.lg,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accentBar: {
    width: 20,
    height: 3,
    backgroundColor: theme.colors.primary,
    marginRight: theme.spacing.sm,
    borderRadius: theme.radii.pill,
  },
  authorText: {
    color: theme.colors.accent,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radii.md,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
  },
});