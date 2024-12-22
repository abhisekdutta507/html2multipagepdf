import {
  PageMargin,
  PageQuality,
  OutputType,
  PageGenerator,
  PageOptions,
} from "./types";

export const RegularPageSelector: string;
export const PageWithMaxPossibleWidthSelector: string;
export const PageElementSelector: string;
export const HiddenElementSelector: string;

export const JSPDFOutputType: OutputType;

export const Generator: PageGenerator;
export const Quality: PageQuality;

export const A4: PageOptions;
export const Legal: PageOptions;
export const Letter: PageOptions;

export type {
  PageOptions,
};

declare module "@abhisek507/html2multipagepdf/constants" {
  export const RegularPageSelector: string;
  export const PageWithMaxPossibleWidthSelector: string;
  export const PageElementSelector: string;
  export const HiddenElementSelector: string;

  export const JSPDFOutputType: OutputType;

  export const Generator: PageGenerator;
  export const Quality: PageQuality;

  export const A4: PageOptions;
  export const Legal: PageOptions;
  export const Letter: PageOptions;
}
