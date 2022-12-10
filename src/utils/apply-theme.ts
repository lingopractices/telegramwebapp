import { Theme } from '@store/profile/features/models/theme';

type ThemeType = {
  [key: string]: string;
};

function applyTheme(theme: Theme) {
  const lightTheme: ThemeType = {
    '--base-bg-color': '#FFFFFF',
    '--secondary-bg-color': '#F7F9FB',
    '--secondary-bg-color-without-alpha': '#F7F9FB',
    '--base-color': '#000000',
    '--secondary-color': '#728A96',
    '--grey-bg': '#F7F9FB',
    '--dt-blue-dark-wt-blue-light': '#0088CC',
    '--dt-blue-dark-wt-white': '#F3F8FC',
    '--dt-grey-opacity-wt-white-opaity': '#F3F8FC',
    '--change-theme': '#07A0EC',
    '--selected-item-bg': 'none',
    '--dt-white-wt-black': '#000000',
    '--dt-black-wt-white': '#FFFFFF',
    '--dt-grey-color-wt-grey-light-color': '#728A96',
    '--info-close-bg': '#969696',
    '--submit-button-bg': 'rgba(249, 249, 249, 0.94)',
    '--dt -dark-grey-wt-light-grey': '#728A96',
    '--calendar-day': '#728A96',
    '--radio-line': '#DFDFDF',
    '--dt-white-wt-grey': '#728A96',
    '--dt-secondary-bg-wt-white': '#FFFFFF',
    '--select-next': '#F7F9FB;',
  };

  const darkTheme: ThemeType = {
    '--base-bg-color': '#313034',
    '--secondary-bg-color': 'rgba(255, 255, 255, 0.08)',
    '--secondary-bg-color-without-alpha': 'rgb(65,64,68)',
    '--base-color': '#FFFFFF',
    '--secondary-color': '#969696',
    '--grey-bg': 'rgba(118, 118, 128, 0.12)',
    '--dt-blue-dark-wt-blue-light': '#07A0EC',
    '--dt-blue-dark-wt-white': '#FFFFFF',
    '--dt-grey-opacity-wt-white-opaity': '#39393C',
    '--change-theme': '#07A0EC',
    '--selected-item-bg': 'transparent',
    '--dt-white-wt-black': '#FFFFFF',
    '--dt-grey-color-wt-grey-light-color': '#CBCBCB',
    '--info-close-bg': 'rgba(255, 255, 255, 0.08)',
    '--submit-button-bg': '#2B2B2B',
    '--dt-dark-grey-wt-light-grey': '#515151',
    '--calendar-day': '#728A96',
    '--radio-line': '#555555',
    '--dt-white-wt-grey': '#FFFFFF',
    '--dt-black-wt-white': '#000000',
    '--dt-secondary-bg-wt-white': 'rgba(255, 255, 255, 0.08)',
    '--select-next': '#414144',
  };

  const root = document.documentElement;

  if (theme === Theme.LIGHT) {
    Object.keys(lightTheme).forEach((color) => {
      root.style.setProperty(color, lightTheme[color]);
    });
  } else {
    Object.keys(darkTheme).forEach((color) => {
      root.style.setProperty(color, darkTheme[color]);
    });
  }
}

export default applyTheme;
