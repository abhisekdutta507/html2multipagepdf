import {
  PageMargin,
  PageQuality,
  jsPDFOptions,
  OutputType,
  PageGenerator,
} from "./types";

declare module "@abhisek507/html2multipagepdf/constants" {
  export const RegularPageSelector: string;
  export const PageWithMaxPossibleWidthSelector: string;
  export const PageElementSelector: string;
  export const HiddenElementSelector: string;

  export const JSPDFOutputType: OutputType;

  export const Generator: PageGenerator;
  export const Quality: PageQuality;

  export interface PageOptions extends jsPDFOptions {
    orientation: "p" | "portrait" | "l" | "landscape";
    unit: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc";
    format: number[];
    compress: boolean;
    margin: PageMargin;
  }

  export const A4: PageOptions;
  export const Legal: PageOptions;
  export const Letter: PageOptions;
}
