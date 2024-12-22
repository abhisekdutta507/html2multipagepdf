import { jsPDF } from "jspdf";
import { PageOptions } from "./constants";

declare module "@abhisek507/html2multipagepdf" {
  export function generatePDF (
    pageSelectors: string[],
    pageOptions: PageOptions,
    elementSelector: string,
    quality: number,
  ): Promise<jsPDF>;

  export default generatePDF;
}
