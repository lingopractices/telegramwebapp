import { IUser } from 'lingopractices-models';

export type GetLocationResponseType = Pick<IUser, 'countryName' | 'city' | 'timeZoneId'>;

export interface IAbstractResponse {
  ip_address: string;
  city: string;
  city_geoname_id: string;
  region: string;
  region_iso_code: string;
  region_geoname_id: string;
  postal_code: string;
  country: string;
  country_code: string;
  country_geoname_id: string;
  country_is_eu: boolean;
  continent: string;
  continent_code: string;
  continent_geoname_id: string;
  longitude: number;
  latitude: number;

  security: {
    is_vpn: boolean;
  };

  timezone: TimeZoneType;
  flag: FlagType;
  currency: CurrencyType;
  connection: ConnectionType;
}

export type TimeZoneType = {
  name: string;
  abbreviation: string;
  gmt_offset: number;
  current_time: string;
  is_dst: boolean;
};

export type FlagType = {
  emoji: string;
  unicode: string;
  png: string;
  svg: string;
};

export type CurrencyType = {
  currency_name: string;
  currency_code: string;
};

export type ConnectionType = {
  autonomous_system_number: number;
  autonomous_system_organization: string;
  connection_type: string;
  isp_name: string;
  organization_name: string;
};
