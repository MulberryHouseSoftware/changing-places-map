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
    disabled: false,
  },
  {
    code: "GB",
    text: "United Kingdom",
    disabled: false,
  },
] as { code: Country; text: string; disabled: boolean }[];
