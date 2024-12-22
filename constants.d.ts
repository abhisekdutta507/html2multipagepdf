declare module "@abhisek507/html2multipagepdf/constants" {
  type ImageCompression = "NONE" | "FAST" | "MEDIUM" | "SLOW";

  type ImageFormat =
    | "RGBA"
    | "UNKNOWN"
    | "PNG"
    | "TIFF"
    | "JPG"
    | "JPEG"
    | "JPEG2000"
    | "GIF87a"
    | "GIF89a"
    | "WEBP"
    | "BMP";

  interface EncryptionOptions {
    userPassword?: string;
    ownerPassword?: string;
    userPermissions?: ("print" | "modify" | "copy" | "annot-forms")[];
  }

  interface jsPDFOptions {
    orientation?: "p" | "portrait" | "l" | "landscape";
    unit?: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc";
    format?: string | number[];
    compress?: boolean;
    precision?: number;
    filters?: string[];
    userUnit?: number;
    encryption?: EncryptionOptions;
    putOnlyUsedFonts?: boolean;
    hotfixes?: string[];
    floatPrecision?: number | "smart";
  }

  interface RGBAData {
    data: Uint8ClampedArray;
    width: number;
    height: number;
  }

  interface ImageOptions {
    imageData:
    | string
    | HTMLImageElement
    | HTMLCanvasElement
    | Uint8Array
    | RGBAData;
    x: number;
    y: number;
    width: number;
    height: number;
    alias?: string;
    compression?: ImageCompression;
    rotation?: number;
    format?: ImageFormat;
  }

  export interface PageMargin {
    narrow: number;
    normal: number;
  }

  export interface PageQuality {
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
    margin: PageMargin;
  }

  export interface OutputType {
    arraybuffer: string;
    blob: string;
    bloburi: string;
    datauristring: string;
  }

  export interface PageGenerator {
    withMaxPossibleWidth: string;
    withRegularWidth: string;
  }

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
