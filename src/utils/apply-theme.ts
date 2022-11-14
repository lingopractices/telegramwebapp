import { Theme } from '@store/profile/features/models/theme';

type ThemeType = {
  [key: string]: string;
};

function applyTheme(theme: Theme) {
  const lightTheme: ThemeType = {
    '--base-bg-color': '#FFFFFF',
    '--secondary-bg-color': '#F7F9FB',
    '--base-color': '#000000',
    '--secondary-color': '#728A96',
    '--grey-bg': '#F7F9FB',
    '--dt-blueDark-wt-blueLight': '#0088CC',
    '--dt-blueDark-wt-white': '#F3F8FC',
  };

  const darkTheme: ThemeType = {
    '--base-bg-color': '#313034',
    '--secondary-bg-color': 'rgba(255, 255, 255, 0.08)',
    '--base-color': '#FFFFFF',
    '--secondary-color': '#969696',
    '--grey-bg': 'rgba(118, 118, 128, 0.12)',
    '--dt-blueDark-wt-blueLight': '#07A0EC',
    '--dt-blueDark-wt-white': '#FFFFFF',
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
