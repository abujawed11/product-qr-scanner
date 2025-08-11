// Centralized theme system for consistent UI
export const THEME = {
  colors: {
    // Primary brand colors
    primary: '#FAD90E',        // Main yellow
    primaryLight: '#FACC15',   // Lighter yellow variant
    primaryDark: '#E5C100',    // Darker yellow variant
    
    // System colors
    black: '#000000',
    white: '#ffffff',
    transparent: 'transparent',
    
    // Gray scale
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    
    // Status colors
    error: '#ef4444',      // red-500
    success: '#10b981',    // emerald-500
    warning: '#f59e0b',    // amber-500
    info: '#3b82f6',       // blue-500
    
    // Specific app colors
    background: '#FAD90E',
    surface: '#ffffff',
    border: '#cccccc',
    placeholder: '#cccccc',
    
    // Navigation
    navigationBar: '#0a0a0a',
    drawerBackground: '#000000',
    headerBackground: '#facc15',
    
    // Text colors
    text: {
      primary: '#000000',
      secondary: '#374151',
      disabled: '#9ca3af',
      inverse: '#ffffff',
      onPrimary: '#000000',
      error: '#dc2626',
    },
    
    // Icons
    icon: {
      primary: '#facc15',
      secondary: '#6b7280',
      disabled: '#d1d5db',
      inverse: '#ffffff',
    },
  },
  
  typography: {
    fontSizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
    },
    
    fontWeights: {
      normal: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
      extrabold: '800' as const,
    },
    
    lineHeights: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },
  
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
  },
  
  borderRadius: {
    none: 0,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    '2xl': 16,
    full: 9999,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 12,
    },
  },
  
  // Common component styles
  components: {
    button: {
      primary: {
        backgroundColor: '#000000',
        color: '#FAD90E',
        borderRadius: 10,
        paddingVertical: 14,
        fontSize: 16,
        fontWeight: 'bold',
      },
      secondary: {
        backgroundColor: '#FAD90E',
        color: '#000000',
        borderRadius: 10,
        paddingVertical: 14,
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    
    input: {
      default: {
        backgroundColor: '#ffffff',
        borderColor: '#d1d5db',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 16,
        color: '#000000',
      },
    },
    
    header: {
      height: 100,
      backgroundColor: '#facc15',
      paddingTop: 45,
      paddingHorizontal: 16,
    },
  },
};

// Convenience exports for commonly used values
export const COLORS = THEME.colors;
export const TYPOGRAPHY = THEME.typography;
export const SPACING = THEME.spacing;
export const SHADOWS = THEME.shadows;

// Legacy support - keeping old exports but mark as deprecated
/** @deprecated Use THEME.colors.primary instead */
export const BACKGROUND_COLOR = THEME.colors.primary;
