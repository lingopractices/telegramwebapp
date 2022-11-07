import { BrowserStorage } from '@utils/BrowserStorage';
import { ILanguage } from 'lingopractices-models';

export class LanguageService {
  private readonly languagesKey = 'languages';

  private browserStorage = new BrowserStorage(this.languagesKey);

  private currentLanguages: ILanguage[] = this.browserStorage.getObject<ILanguage[]>(
    this.languagesKey,
  );

  public get languages(): ILanguage[] {
    return this.currentLanguages;
  }

  public initializeOrUpdate(languages: ILanguage[]) {
    this.browserStorage.setObject<ILanguage[]>(this.languagesKey, languages);
    this.currentLanguages = languages;
  }

  public clear() {
    this.browserStorage.clear();
  }
}
