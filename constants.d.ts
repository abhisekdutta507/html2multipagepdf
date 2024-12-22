import { jsPDFOptions } from "jspdf";

interface Margin {
  narrow: number;
  normal: number;
}

export interface PageOptions extends jsPDFOptions {
  orientation: "p" | "portrait" | "l" | "landscape";
  unit: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc";
  format: number[];
  compress: boolean;
  margin: Margin;
}
