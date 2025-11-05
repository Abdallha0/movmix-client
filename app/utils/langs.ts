const countryToLanguage: any = {
  // Arabic
  EG: "ar",
  SA: "ar",
  AE: "ar",
  DZ: "ar",
  MA: "ar",
  TN: "ar",
  LY: "ar",
  SD: "ar",
  IQ: "ar",
  JO: "ar",
  LB: "ar",
  SY: "ar",
  YE: "ar",
  OM: "ar",
  QA: "ar",
  KW: "ar",
  BH: "ar",
  PS: "ar",

  // English
  US: "en",
  GB: "en",
  CA: "en",
  AU: "en",
  NZ: "en",
  IE: "en",
  ZA: "en",
  NG: "en",
  GH: "en",
  In: "en",
  PH: "en",
  SG: "en",
  JM: "en",
  KE: "en",
  TZ: "en",

  // Spanish
  ES: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  CL: "es",
  PE: "es",
  VE: "es",
  EC: "es",
  GT: "es",
  CU: "es",
  DO: "es",
  HN: "es",
  PY: "es",
  NI: "es",
  BO: "es",
  SV: "es",
  UY: "es",
  CR: "es",
  PA: "es",

  // French
  FR: "fr",
  BE: "fr",
  Ca: "fr",
  CH: "fr",
  LU: "fr",
  MC: "fr",
  CM: "fr",
  SN: "fr",
  CI: "fr",
  Tn: "fr",
  Ma: "fr",
  BF: "fr",
  NE: "fr",
  CD: "fr",
  BJ: "fr",
  ML: "fr",
  TD: "fr",
  GA: "fr",

  // Portuguese
  PT: "pt",
  BR: "pt",
  AO: "pt",
  MZ: "pt",
  CV: "pt",
  GW: "pt",
  ST: "pt",
  TL: "pt",

  // Russian
  RU: "ru",
  BY: "ru",
  UA: "ru",
  KZ: "ru",
  KG: "ru",

  // Chinese
  CN: "zh",
  TW: "zh",
  Sg: "zh",
  MY: "zh",

  // Hindi
  IN: "hi",
  FJ: "hi",
  MU: "hi",
  NP: "hi",
  PK: "hi",

  // German
  DE: "de",
  AT: "de",
  Lu: "de",
  LI: "de",

  // Italian
  IT: "it",
  Ch: "it",
  SM: "it",
  VA: "it",

  // Japanese
  JP: "ja",

  // Korean
  KR: "ko",
  KP: "ko",

  // Turkish
  TR: "tr",
  CY: "tr",
  AZ: "tr",

  // Persian (Farsi)
  IR: "fa",
  AF: "fa",
  TJ: "fa",

  // Malay
  My: "ms",
  ID: "ms",
  BN: "ms",

  // Swahili
  Tz: "sw",
  Ke: "sw",
  UG: "sw",
  Cd: "sw",
  RW: "sw",
  BI: "sw",

  // Dutch
  NL: "nl",
  Be: "nl",
  SR: "nl",
  AW: "nl",
  CW: "nl",

  // Greek
  GR: "el",
  Cy: "el",
};

function lang(code: string){
return countryToLanguage[code] || ""
}

export default lang
