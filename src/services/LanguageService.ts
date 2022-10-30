import { BrowserStorage } from '@utils/BrowserStorage';
import { ILanguage } from 'lingopractices-models';

export class LanguageService {
  private static readonly languagesKey = 'languages';

  private static browserStorage = new BrowserStorage(LanguageService.languagesKey);

  private static currentLanguages: ILanguage[] = LanguageService.browserStorage.getObject<
    ILanguage[]
  >(LanguageService.languagesKey);

  public static get languages(): ILanguage[] {
    return this.currentLanguages;
  }

  public static initializeOrUpdate(languages: ILanguage[]) {
    this.browserStorage.setObject<ILanguage[]>(this.languagesKey, languages);
    this.currentLanguages = languages;
  }

  public static clear() {
    LanguageService.browserStorage.clear();
  }
}
