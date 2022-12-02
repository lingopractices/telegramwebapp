import { useEffect, useState } from 'react';

import axios from 'axios';
import { CountryService } from 'services/countries-service';

export interface ICoutnry {
  id: string;
  name: string;
}

export function useCountries() {
  const [countries, setCountries] = useState<ICoutnry[]>(new CountryService().countries || []);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    (async () => {
      if (!countries.length) {
        setIsLoad(true);
        try {
          const loadedCountriesResponse = await axios.get(`/countries.json`);
          setCountries(loadedCountriesResponse.data);
          setIsLoad(false);

          const countriesService = new CountryService();
          countriesService.initializeOrUpdate(loadedCountriesResponse.data);
        } catch {
          setIsLoad(false);
          // console.log()
        }
      }
    })();
  }, [countries.length, setIsLoad]);

  return { countries, isLoad };
}
