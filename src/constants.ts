import { Country } from "./Country";

export const COUNTRIES_LABEL = [
  {
    code: "AU",
    text: "Australia",
    disabled: false,
  },
  {
    code: "DE",
    text: "Germany",
    disabled: true,
  },
  {
    code: "GB",
    text: "United Kingdom",
    disabled: false,
  },
  {
    code: "US",
    text: "United States of America",
    disabled: true,
  },
] as { code: Country; text: string; disabled: boolean }[];
