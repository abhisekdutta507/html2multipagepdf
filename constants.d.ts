import {
  Margin,
  jsPDFOptions,
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

  export interface Quality {
    100: number;
    90: number;
    80: number;
    70: number;
    60: number;
    50: number;
    40: number;
    30: number;
    20: number;
    10: number;
  }
  
  export interface PageOptions extends jsPDFOptions {
    orientation: "p" | "portrait" | "l" | "landscape";
    unit: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc";
    format: number[];
    compress: boolean;
    margin: Margin;
  }
}
