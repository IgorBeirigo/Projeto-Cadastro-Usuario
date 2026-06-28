// ============================================================================
// DESIGN TOKENS - Constantes reutilizáveis para componentes React
// ============================================================================

export const COLORS = {
  // Primária
  PRIMARY: '#2563eb',
  PRIMARY_HOVER: '#1d4ed8',
  PRIMARY_LIGHT: '#eff6ff',
  PRIMARY_LIGHTER: '#dbeafe',
  
  // Secundária
  SECONDARY: '#0891b2',
  SECONDARY_HOVER: '#0e7490',
  SECONDARY_LIGHT: '#ecf9fb',
  
  // Sucesso
  SUCCESS: '#16a34a',
  SUCCESS_HOVER: '#15803d',
  SUCCESS_LIGHT: '#f0fdf4',
  SUCCESS_BG: '#dcfce7',
  
  // Aviso
  WARNING: '#ea580c',
  WARNING_HOVER: '#c2410c',
  WARNING_LIGHT: '#fef3c7',
  WARNING_BG: '#fef08a',
  
  // Erro
  ERROR: '#dc2626',
  ERROR_HOVER: '#b91c1c',
  ERROR_LIGHT: '#fee2e2',
  ERROR_BG: '#fecaca',
  
  // Informação
  INFO: '#0284c7',
  INFO_HOVER: '#0369a1',
  INFO_LIGHT: '#e0f2fe',
  
  // Neutras
  GRAY_50: '#f9fafb',
  GRAY_100: '#f3f4f6',
  GRAY_200: '#e5e7eb',
  GRAY_300: '#d1d5db',
  GRAY_400: '#9ca3af',
  GRAY_500: '#6b7280',
  GRAY_600: '#4b5563',
  GRAY_700: '#374151',
  GRAY_800: '#1f2937',
  GRAY_900: '#111827',
};

export const TYPOGRAPHY = {
  FONT_FAMILY: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
  FONT_FAMILY_MONO: `'Monaco', 'Menlo', 'Ubuntu Mono', 'Courier New', monospace`,
  
  FONT_SIZE: {
    XS: '12px',
    SM: '14px',
    BASE: '16px',
    LG: '18px',
    XL: '20px',
    '2XL': '24px',
    '3XL': '30px',
    '4XL': '36px',
    '5XL': '48px',
  },
  
  FONT_WEIGHT: {
    LIGHT: 300,
    NORMAL: 400,
    MEDIUM: 500,
    SEMIBOLD: 600,
    BOLD: 700,
    EXTRABOLD: 800,
  },
  
  LINE_HEIGHT: {
    TIGHT: 1.2,
    SNUG: 1.375,
    NORMAL: 1.5,
    RELAXED: 1.625,
    LOOSE: 2,
  },
};

export const SPACING = {
  XS: '4px',
  SM: '8px',
  MD: '12px',
  LG: '16px',
  XL: '24px',
  '2XL': '32px',
  '3XL': '48px',
  '4XL': '64px',
};

export const BORDER_RADIUS = {
  NONE: '0',
  SM: '4px',
  MD: '8px',
  LG: '12px',
  XL: '16px',
  '2XL': '24px',
  FULL: '9999px',
};

export const SHADOWS = {
  NONE: '0 0 0 rgba(0, 0, 0, 0)',
  XS: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  SM: '0 1px 2px 0 rgba(0, 0, 0, 0.08)',
  MD: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  LG: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  XL: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2XL': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  INSET: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

export const TRANSITIONS = {
  FAST: '150ms',
  BASE: '250ms',
  SLOW: '350ms',
  SLOWER: '500ms',
  TIMING: 'cubic-bezier(0.4, 0, 0.2, 1)',
  TIMING_IN: 'cubic-bezier(0.4, 0, 1, 1)',
  TIMING_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
};

export const LAYOUT = {
  HEADER_HEIGHT: '70px',
  SIDEBAR_WIDTH: '280px',
  SIDEBAR_WIDTH_COLLAPSED: '80px',
  FOOTER_HEIGHT: '60px',
  MAIN_GUTTER: '24px',
};

export const BREAKPOINTS = {
  XS: '0px',
  SM: '576px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
  '3XL': '1920px',
  '4K': '2560px',
};

export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
};

export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  GHOST: 'ghost',
  OUTLINE: 'outline',
};

export const BUTTON_SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
};

export const ICON_SIZES = {
  XS: '16px',
  SM: '20px',
  MD: '24px',
  LG: '32px',
  XL: '40px',
  '2XL': '48px',
};

// Funções utilitárias
export const getStatusColor = (status) => {
  const statusMap = {
    'success': COLORS.SUCCESS,
    'pending': COLORS.WARNING,
    'error': COLORS.ERROR,
    'info': COLORS.INFO,
    'active': COLORS.PRIMARY,
    'inactive': COLORS.GRAY_400,
  };
  return statusMap[status] || COLORS.GRAY_400;
};

export const getStatusBgColor = (status) => {
  const statusMap = {
    'success': COLORS.SUCCESS_BG,
    'pending': COLORS.WARNING_BG,
    'error': COLORS.ERROR_BG,
    'info': COLORS.INFO_LIGHT,
    'active': COLORS.PRIMARY_LIGHT,
    'inactive': COLORS.GRAY_100,
  };
  return statusMap[status] || COLORS.GRAY_100;
};

// Media query helpers para uso em JavaScript
export const MEDIA_QUERIES = {
  MOBILE: `(max-width: 768px)`,
  TABLET: `(min-width: 769px) and (max-width: 1023px)`,
  DESKTOP: `(min-width: 1024px)`,
  DESKTOP_LG: `(min-width: 1280px)`,
  DESKTOP_XL: `(min-width: 1536px)`,
  DESKTOP_2XL: `(min-width: 1920px)`,
  DESKTOP_4K: `(min-width: 2560px)`,
};
