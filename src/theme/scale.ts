import {moderateScale, rfs, rs} from '../utils/responsive';

export const S = {
  space: {
    xs: rs(4),
    sm: rs(8),
    md: rs(12),
    lg: rs(16),
    xl: rs(20),
    '2xl': rs(24),
    '3xl': rs(28),
    '4xl': rs(32),
    '5xl': rs(40),
    '6xl': rs(48),
    '7xl': rs(64),
    '8xl': rs(80),
    marginScreen: rs(16),
    gutter: rs(24),
  },

  fs: {
    xxl: rfs(32),
    xl: rfs(24),
    lg: rfs(20),
    md_h: rfs(18),

    md: rfs(16),
    sm: rfs(14),
    xs: rfs(12),
    xxs: rfs(11),
    tiny: rfs(10),

    labelLg: rfs(14),
    labelMd: rfs(13),
    labelSm: rfs(11),
    tab: rfs(13),
  },

  radius: {
    DEFAULT: moderateScale(5),
    sm: moderateScale(8),
    md: moderateScale(10),
    lg: moderateScale(12),
    xl: moderateScale(16),
    full: 9999,
  },

  icon: {
    xs: moderateScale(10),
    sm: moderateScale(16),
    md: moderateScale(20),
    lg: moderateScale(24),
    xl: moderateScale(32),
  },

  size: {
    docPreview: moderateScale(200),
    avatarSm: moderateScale(32),
    avatarMd: moderateScale(48),
    avatarLg: moderateScale(64),
  },
} as const;
