export const countryToTimezone: Record<string, string> = {
  FR: 'Europe/Paris',
  BE: 'Europe/Brussels',
  CH: 'Europe/Zurich',
  CA: 'America/Toronto',
  US: 'America/New_York',
  GB: 'Europe/London',
  DE: 'Europe/Berlin',
  ES: 'Europe/Madrid',
  IT: 'Europe/Rome',
  PT: 'Europe/Lisbon',
  NL: 'Europe/Amsterdam',
  LU: 'Europe/Luxembourg',
  AT: 'Europe/Vienna',
  IE: 'Europe/Dublin',
  SE: 'Europe/Stockholm',
  NO: 'Europe/Oslo',
  DK: 'Europe/Copenhagen',
  FI: 'Europe/Helsinki',
  PL: 'Europe/Warsaw',
  CZ: 'Europe/Prague',
  GR: 'Europe/Athens',
  RO: 'Europe/Bucharest',
  HU: 'Europe/Budapest',
  JP: 'Asia/Tokyo',
  CN: 'Asia/Shanghai',
  AU: 'Australia/Sydney',
  NZ: 'Pacific/Auckland',
  BR: 'America/Sao_Paulo',
  AR: 'America/Argentina/Buenos_Aires',
  MX: 'America/Mexico_City',
  IN: 'Asia/Kolkata',
  RU: 'Europe/Moscow',
  ZA: 'Africa/Johannesburg',
  EG: 'Africa/Cairo',
  MA: 'Africa/Casablanca',
  TN: 'Africa/Tunis',
  SN: 'Africa/Dakar',
  CI: 'Africa/Abidjan',
};

export function getTimezoneForCountry(countryCode?: string | null): string {
  if (!countryCode) {
    return 'Europe/Paris';
  }

  const timezone = countryToTimezone[countryCode.toUpperCase()];
  return timezone || 'Europe/Paris';
}
