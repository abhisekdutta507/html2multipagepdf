import {
  Margin,
  Quality,
  PageOptions,
  JSPDFOutputType,
  Generator,
} from "./types";

declare module "@abhisek507/html2multipagepdf/constants" {
  export const RegularPageSelector: string;
  export const PageWithMaxPossibleWidthSelector: string;
  export const PageElementSelector: string;

  export const JSPDFOutputType: JSPDFOutputType;

  export const A4: PageOptions;
  export const Legal: PageOptions;
  export const Letter: PageOptions;

  export const Generator: Generator;

  export {
    Margin,
    Quality,
    PageOptions,
  };
}
