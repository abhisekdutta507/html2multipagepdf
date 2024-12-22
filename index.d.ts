import { jsPDF, jsPDFOptions } from "jspdf";

declare module "@abhisek507/html2multipagepdf" {
  interface PageMargin {
    narrow: number;
    normal: number;
  }

  interface PageOptions extends jsPDFOptions {
    orientation: "p" | "portrait" | "l" | "landscape";
    unit: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc";
    format: number[];
    compress: boolean;
    margin: PageMargin;
  }

  export function generatePDF (
    pageSelectors: string[],
    pageOptions: PageOptions,
    elementSelector: string,
    quality: number,
  ): Promise<jsPDF>;
}

export function generatePDF (
  pageSelectors: string[],
  pageOptions: jsPDFOptions,
  elementSelector: string,
  quality: number,
): Promise<jsPDF>;
