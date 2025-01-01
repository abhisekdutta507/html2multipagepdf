declare module "@abhisek507/html2multipagepdf" {
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

  export class jsPDF {
    constructor(options?: jsPDFOptions);
    constructor(
      orientation?: "p" | "portrait" | "l" | "landscape",
      unit?: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc",
      format?: string | number[],
      compressPdf?: boolean
    );
    // jsPDF plugin: addImage
    addImage(
      imageData:
        | string
        | HTMLImageElement
        | HTMLCanvasElement
        | Uint8Array
        | RGBAData,
      format: string,
      x: number,
      y: number,
      w: number,
      h: number,
      alias?: string,
      compression?: ImageCompression,
      rotation?: number
    ): jsPDF;
    addImage(
      imageData:
        | string
        | HTMLImageElement
        | HTMLCanvasElement
        | Uint8Array
        | RGBAData,
      x: number,
      y: number,
      w: number,
      h: number,
      alias?: string,
      compression?: ImageCompression,
      rotation?: number
    ): jsPDF;
    addImage(options: ImageOptions): jsPDF;
    addPage(
      format?: string | number[],
      orientation?: "p" | "portrait" | "l" | "landscape"
    ): jsPDF;
    deletePage(targetPage: number): jsPDF;
    output(): string;
    output(type: "arraybuffer"): ArrayBuffer;
    output(type: "blob"): Blob;
    output(type: "bloburi" | "bloburl"): URL;
    output(
      type: "datauristring" | "dataurlstring",
      options?: { filename?: string }
    ): string;
    getCurrentPageInfo(): PageInfo;
    save(filename: string, options: { returnPromise: true }): Promise<void>;
    save(filename?: string): jsPDF;
  }

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

  interface PageConfig {
    quality: number;
    alignCenter: boolean;
  }

  export function generatePDF(
    pageSelectors: string[],
    pageOptions: PageOptions,
    elementSelector: string,
    pageConfig: PageConfig
  ): Promise<jsPDF>;
}
