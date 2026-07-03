// Central design tokens — like CSS variables in a web project.

export const colors = {
  primary: "#0EA371",
  primaryDark: "#0B8A60",
  canopy: "#07503B",
  canopyLight: "#0A6B4E",
  bg: "#F7FAF8",
  card: "#FFFFFF",
  surface: "#EFF4F1",
  ink: "#0F172A",
  body: "#64748B",
  line: "#E2E8F0",
  amber: "#F59E0B",
  white: "#FFFFFF",
  mint: "#D9F3E8",
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };
export const radius = { sm: 10, md: 16, lg: 20, xl: 28 };
export const font = { xs: 12, sm: 14, md: 16, lg: 17, xl: 22, display: 34 };

export const shadow = {
  shadowColor: "#0F172A",
  shadowOpacity: 0.08,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
  elevation: 3,
} as const;
