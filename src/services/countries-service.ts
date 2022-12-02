import { ICoutnry } from '@hooks/use-countries';
import { BrowserStorage } from '@utils/BrowserStorage';

export class CountryService {
  private readonly countriesKey = 'countries';

  private browserStorage = new BrowserStorage(this.countriesKey);

  private currentCountries: ICoutnry[] = this.browserStorage.getObject<ICoutnry[]>(
    this.countriesKey,
  );

  public get countries(): ICoutnry[] {
    return this.currentCountries;
  }

  public initializeOrUpdate(countries: ICoutnry[]) {
    this.browserStorage.setObject<ICoutnry[]>(this.countriesKey, countries);
    this.currentCountries = countries;
  }

  public clear() {
    this.browserStorage.clear();
  }
}
