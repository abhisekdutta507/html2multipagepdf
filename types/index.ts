import { jsPDFOptions, jsPDF } from "jspdf";

export interface Margin {
  narrow: number;
  normal: number;
}

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

export interface JSPDFOutputType {
  arraybuffer: string;
  blob: string;
  bloburi: string;
  datauristring: string;
}

export interface Generator {
  withMaxPossibleWidth: string;
  withRegularWidth: string;
}

export {
  jsPDF,
  jsPDFOptions,
};
