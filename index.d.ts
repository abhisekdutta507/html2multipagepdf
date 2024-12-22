import { PageOptions, jsPDF } from "./types";

declare module "@abhisek507/html2multipagepdf" {
  export function generatePDF (
    pageSelectors: string[],
    pageOptions: PageOptions,
    elementSelector: string,
    quality: number,
  ): Promise<jsPDF>;
}

export function generatePDF (
  pageSelectors: string[],
  pageOptions: PageOptions,
  elementSelector: string,
  quality: number,
): Promise<jsPDF>;
