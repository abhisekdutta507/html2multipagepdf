import {
  Quality,
  PageOptions,
  JSPDFOutputType,
  Generator,
} from "./types";

/**
 * @type {Quality}
 */
export const Quality = {
  100: 1,
  90: 0.9,
  80: 0.8,
  70: 0.7,
  60: 0.6,
  50: 0.5,
  30: 0.3,
  20: 0.2,
  10: 0.1,
};

export const RegularPageSelector = "html2multipagepdf-regular-page";

export const PageWithMaxPossibleWidthSelector =
  "html2multipagepdf-page-max-possible-width";

export const PageElementSelector = "html2multipagepdf-page-element";

/**
 * @type {JSPDFOutputType}
 */
export const JSPDFOutputType = {
  arraybuffer: "arraybuffer",
  blob: "blob",
  bloburi: "bloburi",
  datauristring: "datauristring",
};

/**
 * @description A4 page is 20.99 cm x 29.7 cm
 * or 446.2 px x 631.4 px
 * @type {PageOptions}
 */
export const A4 = {
  orientation: "portrait",
  unit: "px",
  format: [446.2, 631.4],
  compress: false,
  margin: {
    narrow: 16,
    normal: 32,
  },
};

/**
 * @description Legal page is 21.59 cm x 35.56 cm
 * or 459 px x 756 px
 * @type {PageOptions}
 */
export const Legal = {
  orientation: "portrait",
  unit: "px",
  format: [459, 756],
  compress: false,
  margin: {
    narrow: 16,
    normal: 32,
  },
};

/**
 * @description Letter page is 21.59 cm x 27.94 cm
 * or 459 px x 594 px
 * @type {PageOptions}
 */
export const Letter = {
  orientation: "portrait",
  unit: "px",
  format: [459, 594],
  compress: false,
  margin: {
    narrow: 16,
    normal: 32,
  },
};

/**
 * @type {Generator}
 */
export const Generator = {
  withMaxPossibleWidth: "withMaxPossibleWidth",
  withRegularWidth: "withRegularWidth",
};
