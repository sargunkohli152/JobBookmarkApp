import { scaleHeight, scaleWidth } from "../utils/Responsive"

export const horizontalSpacing = {
  xxs: scaleWidth(4),
  xs: scaleWidth(8),
  s: scaleWidth(16),
  m: scaleWidth(20),
  l: scaleWidth(24),
  xl: scaleWidth(30),
  xxl: scaleWidth(36),
  xxxl: scaleWidth(48),
};

export const verticalSpacing = {
  xxxs: scaleHeight(2),
  xxs: scaleHeight(4),
  xs: scaleHeight(8),
  s: scaleHeight(16),
  m: scaleHeight(20),
  l: scaleHeight(24),
  xl: scaleHeight(30),
  xxl: scaleHeight(36),
  xxxl: scaleHeight(40),
  xxxxl: scaleHeight(48),
};
