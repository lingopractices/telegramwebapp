import { Theme } from '@store/profile/features/models/theme';
import { BrowserStorage } from '@utils/BrowserStorage';

export class ThemeService {
  private readonly themeKey = 'theme';

  private browserStorage = new BrowserStorage(this.themeKey);

  private currentTheme: Theme = this.browserStorage.getObject(this.themeKey);

  public get theme(): Theme {
    return this.currentTheme;
  }

  public initializeOrUpdate(theme: Theme) {
    this.browserStorage.setObject(this.themeKey, theme);
    this.currentTheme = theme;
  }

  public clear() {
    this.browserStorage.clear();
  }
}
