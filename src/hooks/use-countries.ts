import { useEffect, useState } from 'react';

import axios from 'axios';
import { CountryService } from 'services/countries-service';

export interface ICoutnry {
  id: string;
  name: string;
}

export function useCountries() {
  const [countries, setCountries] = useState<ICoutnry[]>(new CountryService().countries || []);
  useEffect(() => {
    (async () => {
      if (!countries.length) {
        try {
          const loadedCountriesResponse = await axios.get(`/countries.json`);
          setCountries(loadedCountriesResponse.data);

          const countriesService = new CountryService();
          countriesService.initializeOrUpdate(loadedCountriesResponse.data);
        } catch {
          // console.log()
        }
      }
    })();
  }, [countries.length]);

  return { countries };
}
