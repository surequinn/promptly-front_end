export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12, // Often used for smaller gaps
  lg: 16, // Common for padding around elements
  xl: 20,
  xxl: 24, // Common for larger gaps or section padding
  xxxl: 32,
  xxxxl: 40,
  xxxxxl: 48,
  // Specific layout values from Figma can be added if needed, e.g.:
  // borderRadiusSmall: 16,
  // borderRadiusLarge: 30,
  // inputHeight: 50, // Example from Next button
  // cardHeight: 158, // Example from Result Card
};

export type SpacingTheme = typeof spacing;
