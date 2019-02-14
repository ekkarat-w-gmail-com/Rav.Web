// @flow

export const CURRENCIES_CODES = {
  sv: 'SEK',
  en: 'USD',
  en_US: 'USD',
  en_GB: 'GBP'
};

export const getCurrencyCode = (locale: string) => CURRENCIES_CODES[locale];
