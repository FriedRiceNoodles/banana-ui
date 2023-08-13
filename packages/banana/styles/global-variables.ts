export const Colors = {
  /* Gray */
  Gray0: '250, 250, 250',
  Gray1: '229, 231, 233',
  Gray2: '208, 211, 212',
  Gray3: '179, 182, 183',
  Gray4: '151, 154, 154',
  Gray5: '123, 125, 125',
  Gray6: '98, 101, 103',
  Gray7: '77, 76, 76',
  Gray8: '46, 50, 56',
  Gray9: '28, 31, 35',

  /* Blue */
  Blue0: '235, 245, 255',
  Blue1: '200, 230, 250',
  Blue2: '152, 205, 253',
  Blue3: '101, 178, 252',
  Blue4: '50, 149, 251',
  Blue5: '0, 99, 240',
  Blue6: '0, 90, 224',
  Blue7: '0, 79, 179',
  Blue8: '0, 61, 133',
  Blue9: '0, 44, 107',

  /* Green */
  Green0: '236, 247, 236',
  Green1: '208, 240, 209',
  Green2: '164, 224, 167',
  Green3: '125, 209, 130',
  Green4: '90, 194, 98',
  Green5: '59, 179, 70',
  Green6: '42, 134, 54',
  Green7: '37, 117, 47',
  Green8: '31, 101, 41',
  Green9: '17, 60, 24',

  /* Orange */
  Orange0: '255, 248, 234',
  Orange1: '254, 238, 204',
  Orange2: '254, 217, 152',
  Orange3: '253, 193, 101',
  Orange4: '253, 166, 51',
  Orange5: '252, 136, 0',
  Orange6: '210, 103, 0',
  Orange7: '168, 74, 0',
  Orange8: '126, 49, 0',
  Orange9: '84, 29, 0',

  /* Red */
  Red0: '254, 242, 237',
  Red1: '254, 221, 210',
  Red2: '253, 183, 165',
  Red3: '251, 144, 120',
  Red4: '250, 102, 76',
  Red5: '230, 38, 5',
  Red6: '213, 37, 5',
  Red7: '178, 20, 2',
  Red8: '142, 8, 2',
  Red9: '106, 1, 2',
} as const;

export const Fonts = {
  /* Font sizes */
  FontSize2XS: '10px',
  FontSizeXS: '12px',
  FontSizeSmall: '14px',
  FontSizeMedium: '16px',
  FontSizeLarge: '20px',
  FontSizeXL: '24px',
  FontSize2XL: '36px',
  FontSize3XL: '48px',
  FontSize4XL: '64px',
  FontSize5XL: '72px',

  /* Font weights */
  FontWeightLight: '300',
  FontWeightNormal: '400',
  FontWeightSemibold: '600',
  FontWeightBold: '700',
} as const;

export const Spacings = {
  Spacing4XS: '2px',
  Spacing3XS: '4px',
  Spacing2XS: '6px',
  SpacingXS: '8px',
  SpacingSmall: '12px',
  SpacingMedium: '16px',
  SpacingLarge: '20px',
  SpacingXL: '28px',
  Spacing2XL: '36px',
  Spacing3XL: '48px',
  Spacing4XL: '64px',
  Spacing5XL: '72px',
};

export const Variables = {
  /* Buttons */
  ButtonFontSizeSmall: Fonts.FontSizeXS,
  ButtonPaddingSmall: `${Spacings.Spacing4XS} ${Spacings.SpacingSmall}`,
  ButtonHeightSmall: '24px',

  ButtonFontSizeMedium: Fonts.FontSizeSmall,
  ButtonPaddingMedium: `${Spacings.Spacing2XS} ${Spacings.SpacingSmall}`,
  ButtonHeightMedium: '32px',

  ButtonFontSizeLarge: Fonts.FontSizeMedium,
  ButtonPaddingLarge: `10px ${Spacings.SpacingSmall}`,
  ButtonHeightLarge: '40px',

  /* Panels */
  PanelBackgroundColor: '#fff',
  PanelBorderColor: `rgba(${Colors.Gray1}, 1)`,
  PanelBorderWidth: '1px',

  /* Inputs */
  InputBorderWidth: '1px',
  InputFontFamily:
    'Inter, AppleSystem, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sansSerif',

  /* Countdown */
  CountdownFontSize: Fonts.FontSizeXL,
  CountdownFontWeight: Fonts.FontWeightNormal,
  CountdownColor: `rgba(${Colors.Gray8}, 1)`,

  /* Transitions */
  TransitionVerySlow: '1000ms',
  TransitionSlow: '500ms',
  TransitionNormal: '250ms',
  TransitionFast: '150ms',
  TransitionVeryFast: '50ms',

  /* Line heights */
  LineHeightDenser: '1',
  LineHeightDense: '1.4',
  LineHeightNormal: '1.8',
  LineHeightLoose: '2,2',
  LineHeightLooser: '2.6',

  /**
   * Tokens
   */

  /* Primary */
  ColorPrimary: `rgba(${Colors.Blue6}, 1)`,
  ColorPrimaryHover: `rgba(${Colors.Blue7}, 1)`,
  ColorPrimaryActive: `rgba(${Colors.Blue8}, 1)`,
  ColorPrimaryDisabled: `rgba(${Colors.Blue2}, 1)`,

  /* Success */
  ColorSuccess: `rgba(${Colors.Green6}, 1)`,
  ColorSuccessHover: `rgba(${Colors.Green7}, 1)`,
  ColorSuccessActive: `rgba(${Colors.Green8}, 1)`,
  ColorSuccessDisabled: `rgba(${Colors.Green2}, 1)`,

  /* Warning */
  ColorWarning: `rgba(${Colors.Orange6}, 1)`,
  ColorWarningHover: `rgba(${Colors.Orange7}, 1)`,
  ColorWarningActive: `rgba(${Colors.Orange8}, 1)`,
  ColorWarningDisabled: `rgba(${Colors.Orange2}, 1)`,

  /* Danger */
  ColorDanger: `rgba(${Colors.Red5}, 1)`,
  ColorDangerHover: `rgba(${Colors.Red6}, 1)`,
  ColorDangerActive: `rgba(${Colors.Red7}, 1)`,
  ColorDangerDisabled: `rgba(${Colors.Red2}, 1)`,

  /* Border Radius */
  BorderRadiusSmall: '3px',
  BorderRadiusMedium: '6px',
  BorderRadiusLarge: '12px',
  BorderRadiusCircle: '50%',
} as const;
